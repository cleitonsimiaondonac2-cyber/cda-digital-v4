/* Assistente CDA — atendente flutuante (botão canto inferior + caixa de diálogo).
   Consulta a API local (RAG site + documentos via Ollama Cloud) com fallback
   offline por pesquisa local sobre data/documentos.json. Carregado em todas as páginas. */
(function () {
  "use strict";

  var IA_API = window.CDA_IA_API || window.CDA_API_BASE || "http://127.0.0.1:8765";
  var HIST_MAX = 8;
  var BOAS_VINDAS =
    "Olá! Sou o Assistente CDA. Posso esclarecer dúvidas sobre a Câmara dos " +
    "Despachantes Aduaneiros de Moçambique, a profissão de despachante, " +
    "contactos, delegações e documentos oficiais. Como posso ajudar?";

  var historico = [];
  var docFoco = null;
  var aberto = false;
  var docsPromessa = null;

  var normaliza = function (s) {
    s = String(s == null ? "" : s).toLowerCase();
    if (typeof s.normalize === "function") s = s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return s;
  };

  function carregarDocs() {
    if (!docsCache) {
      docsCache = fetch("data/documentos.json")
        .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
        .then(function (d) { return Array.isArray(d) ? d : []; })
        .catch(function () { return []; });
    }
    return docsCache;
  }
  var docsCache = null;

  function criar() {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "assist-btn";
    btn.id = "assist-btn";
    btn.setAttribute("aria-label", "Abrir o Assistente CDA");
    btn.innerHTML =
      '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" ' +
      'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>' +
      '<span>Assistente CDA</span>';
    document.body.appendChild(btn);

    var box = document.createElement("div");
    box.className = "assist-box";
    box.id = "assist-box";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-label", "Assistente CDA");
    box.innerHTML =
      '<div class="assist-topo">' +
      '<h4>Assistente CDA</h4>' +
      '<div class="assist-topo-acoes">' +
      '<button type="button" class="assist-novo" title="Nova conversa">Novo</button>' +
      '<button type="button" class="assist-fechar" aria-label="Fechar">&#10005;</button>' +
      "</div></div>" +
      '<div class="assist-msgs" id="assist-msgs"></div>' +
      '<div class="assist-entrada">' +
      '<input id="assist-input" type="text" placeholder="Escreva a sua dúvida…" autocomplete="off" aria-label="Escreva a sua dúvida">' +
      '<button type="button" id="assist-enviar">Enviar</button>' +
      "</div>";
    document.body.appendChild(box);

    var msgs = box.querySelector("#assist-msgs");
    var input = box.querySelector("#assist-input");
    var enviar = box.querySelector("#assist-enviar");
    var novo = box.querySelector(".assist-novo");
    var fechar = box.querySelector(".assist-fechar");
    var aberto = false;

    function abrir() {
      box.classList.add("aberta");
      btn.style.display = "none";
      aberto = true;
      if (msgs.children.length === 0) {
        mostrarBot(BOAS_VINDAS, null);
        historico = [];
      }
      setTimeout(function () { input.focus(); }, 50);
    }

    function fecharBox() {
      box.classList.remove("aberta");
      btn.style.display = "";
      aberto = false;
    }

    btn.addEventListener("click", abrir);
    fechar.addEventListener("click", fecharBox);
    novo.addEventListener("click", function () {
      msgs.innerHTML = "";
      historico = [];
      docFoco = null;
      abrir();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && aberto) fecharBox();
    });

    function esc(s) {
      return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
        return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
      });
    }

    function mostrarBot(mensagem, fontes, modo) {
      var bot = document.createElement("div");
      bot.className = "assist-msg bot";
      bot.textContent = mensagem;
      if (fontes && fontes.length) {
        var f = document.createElement("div");
        f.className = "assist-fontes";
        var links = fontes.map(function (x) {
          var url = String(x.url || "");
          if (!url || url.indexOf("javascript:") === 0) return "";
          var rotulo = x.titulo + (x.ano ? " (" + x.ano + ")" : (x.tipo ? " · " + x.tipo : ""));
          return '<a href="' + esc(url) + '" target="_blank" rel="noopener">' + esc(rotulo) + "</a>";
        }).filter(Boolean).join(" · ");
        if (links) {
          f.innerHTML = "<strong>Fontes:</strong> " + links;
          bot.appendChild(f);
        }
      }
      if (modo === "local") {
        var n = document.createElement("div");
        n.className = "assist-status";
        n.textContent = "Nota: assistente em modo de pesquisa local (sem modelo de linguagem).";
        bot.appendChild(n);
      }
      msgs.appendChild(bot);
      msgs.scrollTop = msgs.scrollHeight;
    }

    function mostrarUsuario(texto) {
      var u = document.createElement("div");
      u.className = "assist-msg usr";
      u.textContent = texto;
      msgs.appendChild(u);
      msgs.scrollTop = msgs.scrollHeight;
    }

    function iaRespondeLocal(pergunta) {
      var termos = normalizar(pergunta).split(/\s+/).filter(function (t) { return t.length > 2; });
      return carregarDocs().then(function (docs) {
        var pont = (docs || []).map(function (d) {
          var tags = Array.isArray(d.tags) ? d.tags.join(" ") : "";
          var ent = d.entidade || d.emissor || d.categoria || "";
          var alvo = normalizar(d.titulo + " " + ent + " " + (d.tipo || "") + " " + (d.ano || "") + " " + tags);
          var score = 0;
          termos.forEach(function (t) {
            if (alvo.indexOf(t) !== -1) score++;
            if (normalizar(d.tipo || "").indexOf(t) !== -1) score += 2;
            if (normalizar(ent).indexOf(t) !== -1) score += 1.5;
          });
          return { d: d, ent: ent, score: score };
        }).filter(function (x) { return x.score > 0; })
          .sort(function (a, b) { return b.score - a.score; })
          .slice(0, 3);

        if (!pont.length) {
          return {
            txt: "Não encontrei informação suficiente no site e nos documentos oficiais disponíveis para responder com segurança. Contacte a CDA (tel. +258 21 305 504 / 305 506) ou consulte o Centro Documental.",
            fontes: []
          };
        }
        var txt = "Com base nas informações disponíveis (site e documentos oficiais da CDA), encontrei os seguintes documentos relacionados com a sua pergunta:\n\n";
        pont.forEach(function (p) { txt += "• " + p.d.titulo + " — " + (p.ent || "CDA") + (p.d.ano ? ", " + p.d.ano : "") + "\n"; });
        txt += "\nNota: resposta gerada por pesquisa local (sem modelo de linguagem). Abra as fontes para a informação completa.";
        return {
          txt: txt,
          fontes: pont.map(function (p) {
            return {
              titulo: p.d.titulo, ano: p.d.ano, tipo: p.d.tipo,
              url: p.d.url || ("documentacao.html?q=" + encodeURIComponent(p.d.titulo))
            };
          })
        };
      });
    }

    function enviarMensagem(texto) {
      texto = (texto || "").trim();
      if (!texto) return;
      mostrarUsuario(texto);
      input.value = "";
      var ind = document.createElement("div");
      ind.className = "assist-msg bot";
      ind.textContent = "A pesquisar no site e na base documental…";
      msgs.appendChild(ind);
      msgs.scrollTop = msgs.scrollHeight;

      var corpo = { pergunta: texto, ficheiro: docFoco, historico: historico.slice(-HIST_MAX) };
      var ctl = new AbortController();
      var t = setTimeout(function () { ctl.abort(); }, 30000);
      fetch(IA_API + "/ia/perguntar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(corpo),
        signal: ctl.signal
      }).then(function (r) {
        clearTimeout(t);
        if (!r.ok) throw new Error("http " + r.status);
        return r.json();
      }).then(function (d) {
        ind.remove();
        mostrarBot(d.resposta, d.fontes, d.modo);
        historico.push({ papel: "user", conteudo: texto });
        historico.push({ papel: "assistant", conteudo: d.resposta });
      }).catch(function () {
        clearTimeout(t);
        ind.remove();
        return iaRespondeLocal(texto).then(function (local) {
          mostrarBot(local.txt, local.fontes, "local");
          historico.push({ papel: "user", conteudo: texto });
          historico.push({ papel: "assistant", conteudo: local.txt });
        });
      }).then(function () {
        if (historico.length > HIST_MAX * 2) historico = historico.slice(-HIST_MAX * 2);
        docFoco = null;
      });
    }

    enviar.addEventListener("click", function () { enviarMensagem(input.value); });
    input.addEventListener("keydown", function (e) { if (e.key === "Enter") enviarMensagem(input.value); });

    window.CDA_IA = {
      abrir: function (ficheiro, titulo) {
        docFoco = ficheiro || null;
        abrir();
        if (titulo) {
          var b = document.createElement("div");
          b.className = "assist-docfoco";
          b.textContent = "A responder sobre: " + titulo;
          msgs.insertAdjacentElement("afterend", b);
          setTimeout(function () { b.remove(); }, 12000);
          input.value = "Sobre o documento «" + titulo + "»: ";
        }
      },
      perguntar: function (texto) {
        var q = (texto || "").trim();
        abrir();
        if (q) { input.value = ""; enviarMensagem(q); }
      },
      fechar: fecharBox
    };
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", criar);
  else criar();
})();

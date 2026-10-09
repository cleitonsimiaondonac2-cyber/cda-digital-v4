/* CDA Digital V4 — Busca global (dialog nativo, autocontido).
   Injeta um botão-gatilho na .header-search e um <dialog> no <body>.
   Pesquisa nos documentos (data/documentos.json) e nas páginas internas.
   Sem dependências externas; nunca injeta HTML de resultados (usa textContent). */
(function () {
  "use strict";

  var PAGINAS = [
    { titulo: "Início", desc: "Portal CDA Digital — actualidade, documentos e serviços", url: "index.html" },
    { titulo: "A Instituição", desc: "A CDA: história, missão, órgãos e delegações", url: "instituicao.html" },
    { titulo: "Liderança", desc: "Corpos dirigentes da Câmara dos Despachantes Aduaneiros", url: "lideranca.html" },
    { titulo: "Órgãos Sociais", desc: "Assembleia Geral, Conselho Directivo e Conselho Fiscal", url: "orgaos.html" },
    { titulo: "História", desc: "Percurso e marcos da CDA", url: "historia.html" },
    { titulo: "Estatutos", desc: "Normas e estatutos da Câmara", url: "estatutos.html" },
    { titulo: "Presidente", desc: "Mensagem e perfil do Presidente da CDA", url: "presidente-single.html" },
    { titulo: "Despachantes Aduaneiros", desc: "Directório de membros e busca por nome ou empresa", url: "despachantes.html" },
    { titulo: "Centro Documental", desc: "Legislação, circulares, regulamentos e relatórios", url: "documentacao.html" },
    { titulo: "Notícias", desc: "Actualidade da CDA e do sector aduaneiro", url: "noticias.html" },
    { titulo: "Galeria", desc: "Fotografias da vida associativa", url: "galeria.html" },
    { titulo: "Parceiros e Links Relevantes", desc: "Instituições nacionais e internacionais", url: "parceiros.html" },
    { titulo: "Contacte-nos", desc: "Sede, telefones e formulário de contacto", url: "contactos.html" },
    { titulo: "Verificar Despachante", desc: "Confirme a idoneidade de um despachante aduaneiro", url: "verificar.html" },
    { titulo: "Denúncia", desc: "Canal de denúncia de irregularidades", url: "denunciar.html" },
    { titulo: "Perguntas Frequentes", desc: "Respostas às dúvidas mais comuns sobre a CDA", url: "pergunte.html" },
    { titulo: "Área do Membro", desc: "Portal reservado aos membros da CDA", url: "area-membro.html" }
  ];

  var LIMITE_DOCUMENTOS = 8;
  var LIMITE_PAGINAS = 6;
  var docsPromessa = null;

  function normalizar(s) {
    s = String(s == null ? "" : s).toLowerCase();
    if (typeof s.normalize === "function") s = s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return s;
  }

  function el(tag, classe, texto) {
    var n = document.createElement(tag);
    if (classe) n.className = classe;
    if (texto != null) n.textContent = texto;
    return n;
  }

  function carregarDocs() {
    if (!docsPromessa) {
      docsPromessa = fetch("data/documentos.json")
        .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
        .then(function (d) { return Array.isArray(d) ? d : []; })
        .catch(function () { return null; });
    }
    return docsPromessa;
  }

  function realcar(texto, termo) {
    var frag = document.createDocumentFragment();
    if (!termo) { frag.appendChild(document.createTextNode(texto)); return frag; }
    var alvo = normalizar(texto);
    var pos = 0, idx = alvo.indexOf(termo), achou = 0;
    while (idx !== -1 && achou < 40) {
      if (idx > pos) frag.appendChild(document.createTextNode(texto.slice(pos, idx)));
      var m = document.createElement("mark");
      m.textContent = texto.slice(idx, idx + termo.length);
      frag.appendChild(m);
      pos = idx + termo.length;
      idx = alvo.indexOf(termo, pos);
      achou++;
    }
    if (pos < texto.length) frag.appendChild(document.createTextNode(texto.slice(pos)));
    return frag;
  }

  function resultadoNo(r, termo) {
    var a = el("a", "search-result");
    a.href = r.url;
    a.appendChild(el("span", "search-result__type", r.tipo));
    var t = el("span", "search-result__title");
    t.appendChild(realcar(r.titulo, termo));
    a.appendChild(t);
    if (r.desc) a.appendChild(el("span", "search-result__desc", r.desc));
    return a;
  }

  function criar() {
    var alvo = document.querySelector(".header-search");
    var gatilho = document.createElement("button");
    gatilho.type = "button";
    gatilho.className = "gs-trigger";
    gatilho.id = "gs-trigger";
    gatilho.setAttribute("aria-haspopup", "dialog");
    gatilho.setAttribute("aria-controls", "gs-dialog");
    gatilho.setAttribute("aria-label", "Pesquisar no site");
    gatilho.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">' +
      '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>' +
      '<span class="gs-trigger__label">Pesquisar</span>' +
      '<span class="gs-trigger__key" aria-hidden="true">/</span>';
    if (alvo) alvo.appendChild(gatilho);
    else document.body.appendChild(gatilho);

    var dlg = document.createElement("dialog");
    dlg.className = "search-dialog";
    dlg.id = "gs-dialog";
    dlg.setAttribute("aria-label", "Pesquisa global");
    dlg.innerHTML =
      '<form class="search-dialog__form" id="gs-form" role="search">' +
      '<input class="search-dialog__input" id="gs-q" type="search" ' +
      'placeholder="Pesquisar documentos e páginas…" aria-label="Termo de pesquisa" ' +
      'autocomplete="off" spellcheck="false">' +
      '<button class="gs-submit" type="submit">Pesquisar</button>' +
      "</form>" +
      '<div class="search-dialog__results" id="gs-results" aria-live="polite"></div>' +
      '<div class="search-dialog__foot"><span><kbd>Esc</kbd> fecha · <kbd>Enter</kbd> ' +
      "resultados de <code>data/documentos.json</code> + páginas internas</span></div>";
    document.body.appendChild(dlg);

    var form = dlg.querySelector("#gs-form");
    var input = dlg.querySelector("#gs-q");
    var caixa = dlg.querySelector("#gs-results");
    var seq = 0;

    function dica() {
      caixa.textContent = "";
      caixa.appendChild(el("p", "search-empty",
        "Comece a escrever para pesquisar na base documental e nas páginas do site."));
    }

    function vazio(termo, semDocs) {
      caixa.textContent = "";
      var p = el("p", "search-empty");
      p.appendChild(document.createTextNode("Nenhum resultado para \u00AB" + termo + "\u00BB. Tente outro termo"));
      p.appendChild(document.createTextNode(semDocs ? " (o índice de documentos está indisponível)."
        : " ou consulte o Centro Documental."));
      caixa.appendChild(p);
    }

    function linkCompleto(termo) {
      var a = el("a", "search-result search-result--all");
      a.href = "documentacao.html?q=" + encodeURIComponent(termo);
      a.appendChild(el("span", "search-result__type", "Pesquisa completa"));
      a.appendChild(el("span", "search-result__title", "Ver tudo no Centro Documental \u2192"));
      return a;
    }

    function pesquisar(valor) {
      var termo = normalizar(valor).trim();
      if (!termo) { dica(); return; }
      var meu = ++seq;
      carregarDocs().then(function (docs) {
        if (meu !== seq) return;
        var semDocs = docs === null, lista = [], i;
        for (i = 0; i < PAGINAS.length && lista.length < LIMITE_PAGINAS; i++) {
          var p = PAGINAS[i];
          if (normalizar(p.titulo + " " + p.desc).indexOf(termo) === -1) continue;
          lista.push({ tipo: "Página", titulo: p.titulo, desc: p.desc, url: p.url });
        }
        if (!semDocs) {
          var contados = 0;
          for (i = 0; i < docs.length && contados < LIMITE_DOCUMENTOS; i++) {
            var d = docs[i];
            if (!d || !d.titulo) continue;
            var tags = Array.isArray(d.tags) ? d.tags.join(" ") : "";
            var alvo = normalizar(d.titulo + " " + (d.categoria || "") + " " + (d.tipo || "") + " " + (d.ano || "") + " " + (d.descricao || "") + " " + tags);
            if (alvo.indexOf(termo) === -1) continue;
            var tipo = "Documento";
            if (d.tipo) tipo += " \u00B7 " + d.tipo;
            if (d.ano) tipo += " \u00B7 " + d.ano;
            lista.push({ tipo: tipo, titulo: d.titulo, desc: d.descricao || "", url: "documentacao.html?q=" + encodeURIComponent(d.titulo) });
            contados++;
          }
        }
        caixa.textContent = "";
        if (!lista.length) { vazio(termo, semDocs); return; }
        for (i = 0; i < lista.length; i++) caixa.appendChild(resultadoNo(lista[i], termo));
        caixa.appendChild(linkCompleto(termo));
      });
    }

    function abrir() {
      if (typeof dlg.showModal === "function") { if (!dlg.open) dlg.showModal(); }
      else dlg.setAttribute("open", "");
      pesquisar(input.value);
      input.focus();
      input.select();
    }

    function fechar() {
      if (typeof dlg.close === "function" && dlg.open) dlg.close();
      else dlg.removeAttribute("open");
    }

    gatilho.addEventListener("click", abrir);
    dlg.addEventListener("click", function (e) { if (e.target === dlg) fechar(); });
    dlg.addEventListener("keydown", function (e) {
      if ((e.key === "Escape" || e.key === "Esc") && typeof dlg.showModal !== "function") fechar();
    });
    input.addEventListener("input", function () { pesquisar(input.value); });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var termo = normalizar(input.value).trim();
      if (!termo) return;
      var todos = caixa.querySelectorAll("a.search-result:not(.search-result--all)");
      if (todos.length === 1) window.location.href = todos[0].getAttribute("href");
      else window.location.href = "documentacao.html?q=" + encodeURIComponent(input.value.trim());
    });

    document.addEventListener("keydown", function (e) {
      if (e.key !== "/" || e.ctrlKey || e.metaKey || e.altKey) return;
      var t = e.target, tag = t && t.tagName ? t.tagName.toLowerCase() : "";
      if (tag === "input" || tag === "textarea" || tag === "select" || (t && t.isContentEditable)) return;
      if (dlg.open) return;
      e.preventDefault();
      abrir();
    });

    dica();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", criar);
  else criar();
})();

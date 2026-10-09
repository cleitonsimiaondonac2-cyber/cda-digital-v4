/* CDA Digital V4 — Actualidade dinâmica da página inicial.
   Renderiza o destaque + "Outras Notícias" a partir de
   window.CDA.Data.noticias (gerado de data/noticias.json por tools/build-data.js).
   O HTML estático da secção serve de fallback quando o JS não corre. */
(function () {
  "use strict";

  var MES = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];

  function formatarData(iso) {
    var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso || "");
    if (!m) return iso || "";
    return parseInt(m[3], 10) + " " + (MES[parseInt(m[2], 10) - 1] || m[2]) + " " + m[1];
  }

  function el(tag, cls, txt) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (txt != null) e.textContent = txt;
    return e;
  }

  function imagem(n) {
    var img = document.createElement("img");
    img.src = n.image || "img/placeholder-16x9.svg";
    img.alt = n.title || "";
    img.loading = "lazy";
    img.width = 400;
    img.height = 225;
    return img;
  }

  function render() {
    var grid = document.getElementById("home-news");
    if (!grid || !window.CDA || !CDA.Data || !CDA.Data.noticias || !CDA.Data.noticias.length) return;

    var noticias = CDA.Data.noticias.slice().sort(function (a, b) {
      return String(b.date).localeCompare(String(a.date));
    });

    var destaque = null;
    for (var i = 0; i < noticias.length; i++) {
      if (noticias[i].destaque) { destaque = noticias[i]; break; }
    }
    if (!destaque) destaque = noticias[0];

    grid.textContent = "";

    /* Destaque */
    var art = el("article", "noticia-card-featured");
    var media = el("div", "noticia-image");
    media.appendChild(imagem(destaque));
    media.appendChild(el("div", "noticia-category", destaque.category || "Actualidade"));
    art.appendChild(media);

    var corpo = el("div", "noticia-content");
    var meta = el("div", "noticia-meta");
    meta.appendChild(el("span", "noticia-date", formatarData(destaque.date)));
    meta.appendChild(el("span", "noticia-location", String(destaque.local || "").toUpperCase()));
    corpo.appendChild(meta);
    corpo.appendChild(el("h3", "noticia-title", destaque.title));
    corpo.appendChild(el("p", "noticia-excerpt", destaque.excerpt));
    var ler = el("a", "btn btn-outline", "Ler notícia");
    ler.href = "noticias.html";
    corpo.appendChild(ler);
    art.appendChild(corpo);
    grid.appendChild(art);

    /* Outras notícias */
    var lista = el("div", "noticias-list");
    lista.appendChild(el("h4", "noticias-list-title", "Outras Notícias"));

    noticias.filter(function (n) { return n !== destaque; }).slice(0, 4).forEach(function (n) {
      var item = el("article", "noticia-list-item");
      var lm = el("div", "noticia-list-meta");
      lm.appendChild(el("span", "noticia-list-date", formatarData(n.date)));
      lm.appendChild(el("span", "noticia-list-category", n.category || ""));
      item.appendChild(lm);
      item.appendChild(el("h5", "noticia-list-title", n.title));
      var ver = el("a", "noticia-list-link", "Ver mais");
      ver.href = "noticias.html";
      item.appendChild(ver);
      lista.appendChild(item);
    });

    grid.appendChild(lista);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();

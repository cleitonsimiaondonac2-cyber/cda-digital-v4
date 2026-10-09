/* CDA Digital V4 — configuração da API local do assistente.
   Define a base da API (RAG site + documentos). O assistente usa
   window.CDA_IA_API (ou window.CDA_API_BASE) e cai em pesquisa local
   quando a API não está disponível. */
(function () {
  "use strict";
  if (!window.CDA_API_BASE) window.CDA_API_BASE = "http://127.0.0.1:8765";
  if (!window.CDA_IA_API) window.CDA_IA_API = window.CDA_API_BASE;
})();

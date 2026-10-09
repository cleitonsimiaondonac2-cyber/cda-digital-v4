/* Gera js/dados-carregados.js a partir dos datasets canonicos em data/*.json.
   Uso: node tools/build-data.js
   Nao editar js/dados-carregados.js a mao. */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const read = (f) => JSON.parse(fs.readFileSync(path.join(root, f), 'utf8'));

const membros = read('data/membros.json').map((m, i) => ({
  id: m.nCarta || String(i + 1),
  name: m.nome || '',
  code: m.nCarta || '',
  cedula: m.cedula || '—',
  category: m.situacao || 'Despachante Aduaneiro',
  status: m.activo === false ? 'SUSPENSO' : 'ACTIVO',
  delegation: m.delegacao || '',
  empresa: m.empresa || '',
  provincia: m.provincia || ''
}));

const lideranca = read('data/presidentes.json').map((p) => ({
  id: p.id,
  name: p.nome || '',
  position: 'Presidente da CDA',
  mandate: (p.mandato || '').replace('—', '–'),
  bio: p.descricao || '',
  image: p.foto || '',
  achievements: Array.isArray(p.feitos) ? p.feitos : []
}));

const orgaos = read('data/orgaos.json');

const documentos = read('data/documentos.json').map((d) => ({
  id: d.id,
  title: d.titulo || '',
  description: d.descricao || '',
  category: d.categoria || '',
  date: d.ano ? String(d.ano) + '-01-01' : '',
  type: 'documento'
}));

const out =
`/* GERADO por tools/build-data.js a partir de data/*.json — nao editar a mao. */
(function () {
  var CDA = window.CDA = window.CDA || {};
  var Data = CDA.Data = CDA.Data || {};
  Data.membros = ${JSON.stringify(membros, null, 2)};
  Data.lideranca = ${JSON.stringify(lideranca, null, 2)};
  Data.orgaos = ${JSON.stringify(orgaos, null, 2)};
  Data.documentos = ${JSON.stringify(documentos, null, 2)};
  Data.eventos = Data.eventos || Data.actividades || [];

  CDA.Utils = CDA.Utils || {};
  if (typeof CDA.Utils.formatDate !== 'function') {
    CDA.Utils.formatDate = function (valor) {
      if (!valor) return '';
      var d = new Date(valor);
      if (isNaN(d.getTime())) return String(valor);
      var M = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
      return d.getDate() + ' ' + M[d.getMonth()] + ' ' + d.getFullYear();
    };
  }
})();
`;

fs.writeFileSync(path.join(root, 'js/dados-carregados.js'), out);
console.log('js/dados-carregados.js: ' + membros.length + ' membros, ' +
  lideranca.length + ' lideranca, ' + orgaos.length + ' orgaos, ' +
  documentos.length + ' documentos');

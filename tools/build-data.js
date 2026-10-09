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

/* Categoria canonica (slug) -> rotulo de apresentacao com acentuacao. */
const CAT_LABEL = {
  eventos: 'Eventos',
  cooperacao: 'Cooperação',
  institucional: 'Institucional',
  internacional: 'Internacional',
  representacao: 'Representação',
  facilitacao: 'Facilitação',
  formacao: 'Formação',
  conformidade: 'Conformidade',
  lusofonia: 'Lusofonia',
  'responsabilidade-social': 'Responsabilidade Social',
  entrevista: 'Entrevista',
  editorial: 'Editorial'
};

/* Fonte unica das noticias: data/noticias.json. Normalizado para os campos
   que os templates (home e noticias.html) consomem, ordenado por data desc. */
const noticias = read('data/noticias.json')
  .map((n) => ({
    id: n.id,
    title: n.titulo || '',
    excerpt: n.resumo || '',
    date: n.data || '',
    local: n.local || '',
    category: CAT_LABEL[n.categoria] ||
      (n.categoria ? n.categoria.charAt(0).toUpperCase() + n.categoria.slice(1).replace(/-/g, ' ') : 'Actualidade'),
    categoryKey: n.categoria || '',
    image: n.imagem || '',
    destaque: !!n.destaque,
    tags: Array.isArray(n.tags) ? n.tags : []
  }))
  .sort((a, b) => String(b.date).localeCompare(String(a.date)));

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
  Data.noticias = ${JSON.stringify(noticias, null, 2)};
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
  documentos.length + ' documentos, ' + noticias.length + ' noticias');

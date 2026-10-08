# 📁 Conteúdo Organizado — CDA Digital V4

> **Objectivo:** Facilitar o trabalho de agentes de IA e garantir consistência na gestão de conteúdo do portal CDA.

---

## Estrutura

```
content/
├── README.md                 ← Este ficheiro (visão geral)
├── CONTEUDO-GERAL.md         ← Dados institucionais CDA
├── VISIBILIDADE-MEDIATICA.md ← Análise mediática positiva
├── RESUMO-VISIBILIDADE-MEDIATICA.md ← Resumo executivo
├── noticias/                 ← 16 notícias individuais
│   ├── 001-dia-despachantes-2026.md
│   ├── 002-cooperacao-at-2026.md
│   ├── ...
│   └── 016-entrevista-sabito-romeu-2026.md
├── eventos/                  ← 6 eventos/actividades
│   ├── 001-dia-despachantes-2026.md
│   ├── 002-reuniao-at-2026.md
│   ├── ...
│   └── 006-actividades-q4-2024.md
├── documentos/               ← Índice de documentos PDF
│   └── index.md
├── paginas/                  ← Estrutura das páginas
│   └── index-homepage.md
└── imagens/                  ← Mapa completo de imagens
    ├── INDEX-IMAGENS.md
    ├── noticias/             ← 16 imagens de notícias
    ├── eventos/              ← 22 imagens de galeria
    ├── revista/              ← 48 páginas da revista
    ├── pessoas/              ← 2 fotos de dirigentes
    ├── parceiros/            ← 13 logos de parceiros
    └── logos/                ← 2 logos da CDA
```

---

## Notícias (17 ficheiros)

| ID | Ficheiro | Título | Data |
|----|----------|--------|------|
| 001 | `001-dia-despachantes-2026.md` | CTA participa na celebração do Dia dos Despachantes Aduaneiros | 2026-09-25 |
| 002 | `002-cooperacao-at-2026.md` | Despachantes aduaneiros e Autoridade Tributária reforçam cooperação | 2026-03-30 |
| 003 | `003-tribunal-sofala-2025.md` | Visita de cortesia do Tribunal Aduaneiro de Sofala à CDA Beira | 2025-10-27 |
| 004 | `004-asapra-femininas-2026.md` | Semana destacada para líderes femininas aduaneiras — ASAPRA | 2026-07-15 |
| 005 | `005-despachante-regressa-2026.md` | O Despachante regressa: Unidade, Modernização e Projecção Global | 2026-07-15 |
| 006 | `006-asapra-vice-presidencia-2026.md` | CDA assume Vice-Presidência da ASAPRA durante Fórum no Brasil | 2026-07-15 |
| 007 | `007-cta-ccm-2026.md` | Quadros da CDA assumem cargos de relevo na CTA e na CCM | 2026-07-15 |
| 008 | `008-facilitacao-comercio-2026.md` | CDA contribui para a facilitação do comércio e a competitividade | 2026-07-15 |
| 009 | `009-convenio-sao-paulo-2026.md` | CDA assina convénio com despachantes de São Paulo nos Emirados Árabes Unidos | 2026-07-15 |
| 010 | `010-formacao-regras-origem-2025.md` | Capacitação sobre Regras de Origem reforça competências à escala nacional | 2025-04-15 |
| 011 | `011-oma-emirados-2026.md` | CDA participa na Conferência e Feira de Tecnologias da OMA nos Emirados Árabes Unidos | 2026-07-15 |
| 012 | `012-workshop-conformidade-2026.md` | Workshop sobre branqueamento de capitais e financiamento do terrorismo | 2024-06-15 |
| 013 | `013-ifcba-japao-2026.md` | Na Cúpula Mundial dos Despachantes: CDA expande influência na IFCBA no Japão | 2026-07-15 |
| 014 | `014-lusofonia-2026.md` | Intercâmbio de experiências com as Alfândegas de São Tomé e Príncipe | 2026-07-15 |
| 015 | `015-solidariedade-marracuene-2026.md` | Solidariedade em Acção: CDA apoia vítimas das cheias em Marracuene | 2026-07-15 |
| 016 | `016-entrevista-sabito-romeu-2026.md` | Entrevista: Sábito Romeu — "Esta casa não é de quem a preside" | 2026-07-15 |
| 017 | `017-formacao-regras-origem-2025.md` | Formação Regras de Origem (Abril 2025) | 2025-04-15 |

---

## Eventos (6 ficheiros)

| ID | Ficheiro | Título | Data |
|----|----------|--------|------|
| 001 | `001-dia-despachantes-2026.md` | Celebração do Dia dos Despachantes Aduaneiros 2026 | 2026-09-14 |
| 002 | `002-reuniao-at-2026.md` | Reunião CDA e Autoridade Tributária — Cooperação institucional | 2026-03-30 |
| 003 | `003-tribunal-sofala-2025.md` | Visita do Tribunal Aduaneiro de Sofala à CDA Beira | 2025-10-27 |
| 004 | `004-ago-xxvi-2024.md` | XXVI.ª Sessão da Assembleia Geral Ordinária | 2024-11-17 |
| 005 | `005-tomada-posse-2024.md` | Tomada de posse dos órgãos sociais 2024–2026 | 2024-10-29 |
| 006 | `006-actividades-q4-2024.md` | Actividades e encontros institucionais Q4 2024 | 2024-12-16 |

---

## Imagens (105 ficheiros)

| Categoria | Quantidade | Pasta |
|-----------|-----------|-------|
| Notícias | 16 | `imagens/noticias/` |
| Eventos | 22 | `imagens/eventos/` |
| Revista | 48 | `imagens/revista/` |
| Pessoas | 2 | `imagens/pessoas/` |
| Parceiros | 13 | `imagens/parceiros/` |
| Logos | 2 | `imagens/logos/` |

---

## Formato das Notícias

Cada notícia segue este formato:

```markdown
---
id: noticia-XXX
titulo: "Título da notícia"
categoria: Categoria
data: YYYY-MM-DD
imagem: imagens/noticias/ficheiro.jpg
imagem_legenda: "Legenda da imagem"
fonte: fonte.url
---

# Título da notícia

## Resumo
Resumo breve da notícia.

## Conteúdo
Conteúdo detalhado.

## Imagem
- **Ficheiro:** `imagens/noticias/ficheiro.jpg`
- **Legenda:** Legenda da imagem

## Tags
`tag1` `tag2` `tag3`
```

---

## Formato dos Eventos

Cada evento segue este formato:

```markdown
---
id: evento-XXX
titulo: "Título do evento"
categoria: Categoria
data: YYYY-MM-DD
local: Local
imagens:
  - imagens/eventos/ficheiro1.jpg
  - imagens/eventos/ficheiro2.jpg
---

# Título do evento

## Resumo
Resumo breve do evento.

## Detalhes
- **Data:** Data do evento
- **Local:** Local do evento
- **Participantes:** Participantes

## Imagens
1. **Ficheiro:** `imagens/eventos/ficheiro1.jpg`
   **Legenda:** Legenda da imagem

## Tags
`tag1` `tag2` `tag3`
```

---

## Como Usar

1. **Para adicionar uma notícia:** Criar ficheiro em `noticias/` com o formato indicado
2. **Para adicionar um evento:** Criar ficheiro em `eventos/` com o formato indicado
3. **Para adicionar imagens:** Colocar em `imagens/` na pasta correcta
4. **Para actualizar dados:** Editar `js/dados.js` no site V4

---

## Notas Importantes

- ✅ Todo o conteúdo é positivo e institucional
- ✅ Focado nos benefícios da CDA e dos despachantes
- ✅ Sem referências negativas ou polémicas
- ✅ Imagens oficiais da CDA
- ✅ Formato consistente para fácil manutenção
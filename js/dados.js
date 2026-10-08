/**
 * CDA Digital V4 - Dados Dinâmicos
 * =================================
 * 
 * Este arquivo contém os dados dinâmicos do portal CDA Digital V4
 * Inclui: notícias, documentos, membros, eventos, etc.
 * Atualizado em: 2026-10-08
 */

// ============================================
// Notícias
// ============================================

const noticias = [
    {
        id: 1,
        title: 'CTA participa na celebração do Dia dos Despachantes Aduaneiros',
        excerpt: 'A CTA, representada pela Directora Executiva Teresa Muenda, participou no evento de celebração do Dia dos Despachantes Aduaneiros de Moçambique, efeméride assinalada a 14 de Setembro.',
        content: `<p>A CTA, representada pela Directora Executiva Teresa Muenda, participou no evento de celebração do Dia dos Despachantes Aduaneiros de Moçambique, efeméride assinalada a 14 de Setembro.</p>
        
        <p>A cerimónia foi dirigida pela Presidente da CDA, Salmate Chuaibo, e juntou membros da classe, representantes do sector privado e parceiros institucionais ligados à cadeia logística e aduaneira.</p>
        
        <p>Salmate Chuaibo destacou o papel estratégico dos despachantes aduaneiros na facilitação do comércio, na melhoria do ambiente de negócios e na competitividade das empresas.</p>`,
        date: '2026-09-25',
        category: 'Institucional',
        author: 'CDA Comunicação',
        image: 'img/noticias/cooperacao-at.jpg',
        tags: ['CTA', 'dia-despachantes', '2026', 'institucional']
    },
    {
        id: 2,
        title: 'Despachantes aduaneiros e Autoridade Tributária reforçam cooperação',
        excerpt: 'A Autoridade Tributária e a Câmara dos Despachantes Aduaneiros reforçaram a cooperação para modernizar o sistema alfandegário e garantir maior eficiência na arrecadação de receitas.',
        content: `<p>A Autoridade Tributária e a Câmara dos Despachantes Aduaneiros reforçaram a cooperação para modernizar o sistema alfandegário e garantir maior eficiência na arrecadação de receitas.</p>
        
        <p>O Presidente da AT, Aníbal Mbalango, destacou o papel dos despachantes na conformidade e credibilidade das operações. O Presidente da CDA, Salmate Chuaibo, enalteceu o diálogo institucional e defendeu a co-responsabilidade na construção de um sistema transparente e previsível.</p>`,
        date: '2026-03-30',
        category: 'Cooperação',
        author: 'CDA Comunicação',
        image: 'img/noticias/cooperacao-at.jpg',
        tags: ['AT', 'cooperação', 'modernização', '2026']
    },
    {
        id: 3,
        title: 'Visita de cortesia do Tribunal Aduaneiro de Sofala à CDA Beira',
        excerpt: 'A CDA Região Centro recebeu uma visita de cortesia do Tribunal Aduaneiro de Sofala, reforçando os laços de cooperação entre as duas instituições.',
        content: `<p>No dia 27 de Outubro de 2025, a CDA Região Centro recebeu uma visita de cortesia do Tribunal Aduaneiro de Sofala.</p>
        
        <p>O encontro reforçou os laços de cooperação entre as duas instituições e abordou questões relevantes para o sector aduaneiro na região centro de Moçambique.</p>`,
        date: '2025-10-27',
        category: 'Institucional',
        author: 'CDA Comunicação',
        image: 'img/noticias/justica-aduaneira.jpg',
        tags: ['tribunal', 'sofala', 'beira', '2025']
    },
    {
        id: 4,
        title: 'Semana destacada para líderes femininas aduaneiras — ASAPRA',
        excerpt: 'A Presidente da CDA, Salmate Chuaibo, participou na semana destacada para líderes femininas aduaneiras organizada pela ASAPRA.',
        content: `<p>A Presidente da CDA, Salmate Chuaibo, participou na semana destacada para líderes femininas aduaneiras organizada pela ASAPRA.</p>
        
        <p>O evento reforçou o papel da mulher no sector aduaneiro e a importância da diversidade na governação das instituições do comércio externo.</p>`,
        date: '2026-07-15',
        category: 'Internacional',
        author: 'CDA Comunicação',
        image: 'img/noticias/asapra-brasil.jpg',
        tags: ['ASAPRA', 'mulheres', 'internacional', '2026']
    },
    {
        id: 5,
        title: 'O Despachante regressa: Unidade, Modernização e Projecção Global',
        excerpt: 'Após um período fora de circulação, a revista oficial da CDA volta a chegar aos associados com um compromisso intransigente com a legalidade.',
        content: `<p>Após um período fora de circulação, a revista oficial da CDA volta a chegar aos associados com um compromisso intransigente com a legalidade e o combate ao exercício ilegal da profissão.</p>
        
        <p>A revista reflecte a modernização e a projecção global da instituição, com artigos sobre formação, cooperação internacional e os desafios do sector aduaneiro.</p>`,
        date: '2026-07-15',
        category: 'Editorial',
        author: 'CDA Comunicação',
        image: 'img/noticias/capa-julho-2026.jpg',
        tags: ['revista', 'editorial', 'modernização', '2026']
    },
    {
        id: 6,
        title: 'CDA assume Vice-Presidência da ASAPRA durante Fórum no Brasil',
        excerpt: 'A Câmara dos Despachantes Aduaneiros de Moçambique alcançou um marco histórico ao assumir a Vice-Presidência da ASAPRA.',
        content: `<p>A Câmara dos Despachantes Aduaneiros de Moçambique alcançou um marco histórico ao assumir a Vice-Presidência da ASAPRA.</p>
        
        <p>Este acontecimento reforça a presença da CDA nos principais fóruns de discussão e tomada de decisão do sector aduaneiro internacional.</p>`,
        date: '2026-07-15',
        category: 'Internacional',
        author: 'CDA Comunicação',
        image: 'img/noticias/asapra-brasil.jpg',
        tags: ['ASAPRA', 'vice-presidência', 'internacional', '2026']
    },
    {
        id: 7,
        title: 'Quadros da CDA assumem cargos de relevo na CTA e na CCM',
        excerpt: 'A CDA vê os seus quadros reforçar a participação na CTA e CCM, com a Presidente Salmate Chuaibo a exercer funções de Vice-Presidente do Conselho Fiscal da CTA.',
        content: `<p>Enquanto membro da Confederação das Associações Económicas de Moçambique (CTA) e da Câmara de Comércio de Moçambique (CCM), a CDA vê os seus quadros reforçar a participação.</p>
        
        <p>A Presidente Salmate Chuaibo exerce funções de Vice-Presidente do Conselho Fiscal da CTA, demonstrando o reconhecimento da classe aduaneira no panorama empresarial moçambicano.</p>`,
        date: '2026-07-15',
        category: 'Representação',
        author: 'CDA Comunicação',
        image: 'img/noticias/representacao-privado.jpg',
        tags: ['CTA', 'CCM', 'representação', '2026']
    },
    {
        id: 8,
        title: 'CDA contribui para a facilitação do comércio e a competitividade',
        excerpt: 'A CDA participa activamente na simplificação de procedimentos e na remoção de barreiras, integrando as reuniões da Comissão Técnica do Comité Nacional de Facilitação do Comércio.',
        content: `<p>A CDA participa activamente na simplificação de procedimentos e na remoção de barreiras.</p>
        
        <p>A instituição integra as reuniões da Comissão Técnica e da Comissão Directiva do Comité Nacional de Facilitação do Comércio, contribuindo para a competitividade do país.</p>`,
        date: '2026-07-15',
        category: 'Facilitação do Comércio',
        author: 'CDA Comunicação',
        image: 'img/noticias/facilitacao-comercio.jpg',
        tags: ['facilitação', 'comércio', 'competitividade', '2026']
    },
    {
        id: 9,
        title: 'CDA assina convénio com despachantes de São Paulo nos Emirados Árabes Unidos',
        excerpt: 'A CDA celebrou um Convénio de Parceria com o Sindicato dos Despachantes Aduaneiros de São Paulo, reforçando a estratégia de cooperação internacional.',
        content: `<p>A CDA celebrou um Convénio de Parceria com o Sindicato dos Despachantes Aduaneiros de São Paulo.</p>
        
        <p>O convénio reforça a estratégia de cooperação internacional e a aposta no desenvolvimento de competências técnicas para o exercício da profissão.</p>`,
        date: '2026-07-15',
        category: 'Cooperação',
        author: 'CDA Comunicação',
        image: 'img/noticias/convenio-sao-paulo.jpg',
        tags: ['convénio', 'São Paulo', 'cooperação', '2026']
    },
    {
        id: 10,
        title: 'Capacitação sobre Regras de Origem reforça competências à escala nacional',
        excerpt: 'Em parceria com a Autoridade Tributária e o programa PROMOVE Comércio, a CDA promoveu uma capacitação que contribui para a harmonização de procedimentos.',
        content: `<p>Em parceria com a Autoridade Tributária e o programa PROMOVE Comércio, a CDA promoveu uma capacitação sobre Regras de Origem.</p>
        
        <p>A formação contribui para a harmonização de procedimentos e o fortalecimento das capacidades técnicas dos profissionais do sector.</p>`,
        date: '2025-04-15',
        category: 'Formação',
        author: 'CDA Comunicação',
        image: 'img/noticias/formacao-regras-origem.jpg',
        tags: ['formação', 'regras-de-origem', 'AT', '2025']
    },
    {
        id: 11,
        title: 'CDA participa na Conferência e Feira de Tecnologias da OMA nos Emirados Árabes Unidos',
        excerpt: 'Na qualidade de membro da ASAPRA, a CDA marcou presença na Conferência e Feira de Tecnologias da Organização Mundial das Alfândegas.',
        content: `<p>Na qualidade de membro da ASAPRA, a CDA marcou presença na Conferência e Feira de Tecnologias da Organização Mundial das Alfândegas.</p>
        
        <p>O evento reuniu administrações aduaneiras, especialistas e representantes de organizações internacionais para discutir o futuro digital do sector.</p>`,
        date: '2026-07-15',
        category: 'Internacional',
        author: 'CDA Comunicação',
        image: 'img/noticias/futuro-digital.jpg',
        tags: ['OMA', 'tecnologia', 'internacional', '2026']
    },
    {
        id: 12,
        title: 'Workshop sobre branqueamento de capitais e financiamento do terrorismo',
        excerpt: 'A CDA promoveu um workshop dedicado ao branqueamento de capitais, financiamento do terrorismo e da proliferação de armas.',
        content: `<p>A CDA promoveu um workshop dedicado ao branqueamento de capitais, financiamento do terrorismo e da proliferação de armas.</p>
        
        <p>O evento reuniu representantes de instituições públicas e privadas ligadas ao comércio externo e ao sistema financeiro nacional.</p>`,
        date: '2024-06-15',
        category: 'Conformidade',
        author: 'CDA Comunicação',
        image: 'img/noticias/conformidade-integridade.jpg',
        tags: ['workshop', 'branqueamento', 'conformidade', '2024']
    },
    {
        id: 13,
        title: 'Na Cúpula Mundial dos Despachantes: CDA expande influência na IFCBA no Japão',
        excerpt: 'Como membro da International Federation of Customs Brokers Associations (IFCBA), a CDA participou na conferência internacional da organização no Japão.',
        content: `<p>Como membro da International Federation of Customs Brokers Associations (IFCBA), a CDA participou na conferência internacional da organização.</p>
        
        <p>O evento, um dos mais relevantes do sector, reforçou o compromisso da CDA com a projecção global e a troca de melhores práticas.</p>`,
        date: '2026-07-15',
        category: 'Internacional',
        author: 'CDA Comunicação',
        image: 'img/noticias/cupula-mundial-japao.jpg',
        tags: ['IFCBA', 'Japão', 'internacional', '2026']
    },
    {
        id: 14,
        title: 'Intercâmbio de experiências com as Alfândegas de São Tomé e Príncipe',
        excerpt: 'A CDA manteve um encontro de trabalho com as Alfândegas de São Tomé e Príncipe, no âmbito da cooperação entre países de língua portuguesa.',
        content: `<p>A CDA manteve um encontro de trabalho com as Alfândegas de São Tomé e Príncipe.</p>
        
        <p>O encontro inscreve-se no âmbito da cooperação e intercâmbio de experiências entre instituições ligadas ao sector aduaneiro nos países de língua portuguesa.</p>`,
        date: '2026-07-15',
        category: 'Lusofonia',
        author: 'CDA Comunicação',
        image: 'img/noticias/lusofonia.jpg',
        tags: ['lusofonia', 'São Tomé', 'cooperação', '2026']
    },
    {
        id: 15,
        title: 'Solidariedade em Acção: CDA apoia vítimas das cheias em Marracuene',
        excerpt: 'Na sequência das cheias que afectaram o Muthini, no Município de Marracuene, a CDA promoveu acções de assistência que beneficiaram centenas de pessoas.',
        content: `<p>Na sequência das cheias que afectaram o Muthini, no Município de Marracuene, a CDA promoveu acções de assistência.</p>
        
        <p>As acções beneficiaram centenas de pessoas, reafirmando o compromisso da CDA com a responsabilidade social.</p>`,
        date: '2026-07-15',
        category: 'Responsabilidade Social',
        author: 'CDA Comunicação',
        image: 'img/noticias/solidariedade-cheias.jpg',
        tags: ['solidariedade', 'Marracuene', 'responsabilidade-social', '2026']
    },
    {
        id: 16,
        title: 'Entrevista: Sábito Romeu — "Esta casa não é de quem a preside"',
        excerpt: 'O Presidente da Mesa da Assembleia Geral da CDA fala sobre o papel colectivo dos órgãos sociais, a unidade da classe e os desafios do triénio 2024-2026.',
        content: `<p>O Presidente da Mesa da Assembleia Geral da CDA fala sobre o papel colectivo dos órgãos sociais, a unidade da classe e os desafios do triénio 2024-2026.</p>
        
        <p>Na entrevista, Sábito Romeu destaca que "esta casa não é de quem a preside, é de todos os despachantes aduaneiros de Moçambique".</p>`,
        date: '2026-07-15',
        category: 'Entrevista',
        author: 'CDA Comunicação',
        image: 'img/noticias/entrevista-sabito-romeu.jpg',
        tags: ['entrevista', 'Sábito Romeu', 'assembleia-geral', '2026']
    }
];

// ============================================
// Eventos / Actividades
// ============================================

const actividades = [
    {
        id: 'act-6',
        titulo: 'Celebração do Dia dos Despachantes Aduaneiros 2026',
        categoria: 'Eventos',
        data: '2026-09-14',
        local: 'Maputo',
        descricao: 'Cerimónia de celebração do Dia dos Despachantes Aduaneiros de Moçambique, com a presença da Presidente da CDA Salmate Chuaibo, representantes da CTA, sector privado e parceiros institucionais ligados à cadeia logística e aduaneira.',
        destaque: true,
        capas: ['img/galeria/hd/22-whatsapp-image-2024-12-16-at-15.57.08.jpg']
    },
    {
        id: 'act-7',
        titulo: 'Reunião CDA e Autoridade Tributária — Cooperação institucional',
        categoria: 'Reuniões',
        data: '2026-03-30',
        local: 'Maputo',
        descricao: 'Reunião entre a CDA e a Autoridade Tributária para reforçar a cooperação na modernização do sistema alfandegário, com destaque para a participação activa da CDA na Reforma Legislativa em curso.',
        destaque: true,
        capas: ['img/galeria/hd/09-01-359_thumb.jpg']
    },
    {
        id: 'act-8',
        titulo: 'Visita do Tribunal Aduaneiro de Sofala à CDA Beira',
        categoria: 'Institucional',
        data: '2025-10-27',
        local: 'Beira',
        descricao: 'Visita de cortesia do Tribunal Aduaneiro de Sofala aos escritórios da CDA Região Centro, reforçando os laços de cooperação entre as duas instituições.',
        destaque: false,
        capas: ['img/galeria/hd/13-whatsapp-image-2024-11-11-at-15.21.14-1.jpg']
    },
    {
        id: 'act-1',
        titulo: 'XXVI.ª Sessão da Assembleia Geral Ordinária',
        categoria: 'Reuniões',
        data: '2024-11-17',
        local: 'Maputo',
        descricao: 'Momentos da XXVI.ª Sessão da Assembleia Geral Ordinária da CDA, que reuniu os membros da classe para debate dos assuntos da profissão aduaneira e eleição dos novos órgãos sociais para o triénio 2024-2026.',
        destaque: true,
        capas: [
            'img/galeria/hd/01-01-100_thumb.jpg',
            'img/galeria/hd/02-01-156_thumb.jpg',
            'img/galeria/hd/03-01-184_thumb.jpg',
            'img/galeria/hd/04-01-216_thumb.jpg',
            'img/galeria/hd/05-01-227_thumb.jpg',
            'img/galeria/hd/06-01-238_thumb.jpg',
            'img/galeria/hd/07-01-242_thumb.jpg',
            'img/galeria/hd/08-01-311_thumb.jpg',
            'img/galeria/hd/09-01-359_thumb.jpg',
            'img/galeria/hd/10-01-99_thumb.jpg'
        ]
    },
    {
        id: 'act-2',
        titulo: 'Tomada de posse dos órgãos sociais 2024–2026',
        categoria: 'Institucional',
        data: '2024-10-29',
        local: 'Maputo',
        descricao: 'Cerimónia de tomada de posse dos órgãos sociais da CDA para o triénio 2024-2026, com a Presidente Salmate Chuaibo Daud.',
        destaque: false,
        capas: [
            'img/galeria/hd/11-screenshot-2024-10-29-130534_thumb.jpg',
            'img/galeria/hd/12-screenshot-2024-10-29-130947_thumb.jpg'
        ]
    },
    {
        id: 'act-3',
        titulo: 'Actividades e encontros institucionais',
        categoria: 'Eventos',
        data: '2024-12-16',
        local: 'Moçambique',
        descricao: 'Registo de actividades e encontros institucionais da CDA no último trimestre de 2024.',
        destaque: false,
        capas: [
            'img/galeria/hd/13-whatsapp-image-2024-11-11-at-15.21.14-1.jpg',
            'img/galeria/hd/14-whatsapp-image-2024-11-11-at-15.21.14-2.jpg',
            'img/galeria/hd/15-whatsapp-image-2024-11-13-at-11.40.32.jpg',
            'img/galeria/hd/16-whatsapp-image-2024-11-17-at-11.34.52.jpg',
            'img/galeria/hd/17-whatsapp-image-2024-11-17-at-11.34.57.jpg',
            'img/galeria/hd/18-whatsapp-image-2024-12-16-at-15.50.57-1.jpg',
            'img/galeria/hd/19-whatsapp-image-2024-12-16-at-15.50.57.jpg',
            'img/galeria/hd/20-whatsapp-image-2024-12-16-at-15.56.29.jpg',
            'img/galeria/hd/21-whatsapp-image-2024-12-16-at-15.56.44.jpg',
            'img/galeria/hd/22-whatsapp-image-2024-12-16-at-15.57.08.jpg'
        ]
    }
];

// ============================================
// Órgãos Sociais
// ============================================

const orgaos = [
    {
        cargo: 'Presidente da CDA',
        nome: 'Salmate Chuaibo Daud',
        orgao: 'Direcção',
        foto: 'img/orgaos/salmate-chuaibo.jpg'
    },
    {
        cargo: 'Vice-Presidente da CDA para a Zona Norte',
        nome: 'Albino Sebastião Grumor Dimene',
        orgao: 'Direcção'
    },
    {
        cargo: 'Vice-Presidente da CDA para a Zona Centro',
        nome: 'Nelson Caetano Coutinho Luís',
        orgao: 'Direcção'
    },
    {
        cargo: 'Presidente da Mesa da Assembleia Geral',
        nome: 'Sabito Joaquim Romeu',
        orgao: 'Mesa da AG',
        foto: 'img/orgaos/sabito-romeu.jpg'
    },
    {
        cargo: 'Vice-Presidente da Mesa da Assembleia Geral',
        nome: 'Júlia Carrilho Almeida da Silva',
        orgao: 'Mesa da AG'
    },
    {
        cargo: 'Secretário da Mesa da Assembleia Geral',
        nome: 'Nelson Joaquim José Rede',
        orgao: 'Mesa da AG'
    },
    {
        cargo: 'Presidente do Conselho Deontológico',
        nome: 'Pedro Armando S. Chissico',
        orgao: 'Conselho Deontológico'
    },
    {
        cargo: 'Conselho Deontológico — Zona Norte',
        nome: 'Deca Fernando Tito',
        orgao: 'Conselho Deontológico'
    },
    {
        cargo: 'Conselho Deontológico — Zona Centro',
        nome: 'Joaquim M. Mateus Manguaiana',
        orgao: 'Conselho Deontológico'
    },
    {
        cargo: 'Conselho Deontológico — Zona Sul',
        nome: 'Flora Macuvele',
        orgao: 'Conselho Deontológico'
    },
    {
        cargo: 'Conselho Deontológico — Zona Sul',
        nome: 'Humberto Benavides A. Guibunda',
        orgao: 'Conselho Deontológico'
    },
    {
        cargo: 'Conselho Directivo — Zona Norte',
        nome: 'José Mateus Manuel',
        orgao: 'Conselho Directivo'
    },
    {
        cargo: 'Conselho Directivo — Zona Centro',
        nome: 'Zacarias Miguel Mabunda',
        orgao: 'Conselho Directivo'
    },
    {
        cargo: 'Conselho Directivo — Zona Sul',
        nome: 'Madalena dos Anjos Chambule',
        orgao: 'Conselho Directivo'
    },
    {
        cargo: 'Tesoureiro',
        nome: 'Pedro Ausêncio Bonifácio Saulosse',
        orgao: 'Conselho Directivo'
    }
];
// ============================================
// CDA Data Object (for compatibility with V4 HTML)
// ============================================

window.CDA = {
    Data: {
        noticias: noticias,
        actividades: actividades,
        orgaos: orgaos
    }
};

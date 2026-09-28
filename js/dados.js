/**
 * CDA Digital V4 - Dados Dinâmicos
 * =================================
 * 
 * Este arquivo contém os dados dinâmicos do portal CDA Digital V4
 * Inclui: notícias, documentos, membros, eventos, etc.
 */

// ============================================
// Notícias
// ============================================

const noticias = [
    {
        id: 1,
        title: 'CDA lança novo portal digital para modernizar serviços aduaneiros',
        excerpt: 'O novo portal CDA Digital V4 foi apresentado durante a XXVI.ª Sessão da Assembleia Geral Ordinária, marcando um passo importante na digitalização dos serviços da Câmara.',
        content: `<p>A Câmara dos Despachantes Aduaneiros de Moçambique (CDA) apresentou oficialmente o seu novo portal digital, o CDA Digital V4, durante a XXVI.ª Sessão da Assembleia Geral Ordinária, realizada no dia 28 de Setembro de 2026, em Maputo.</p>
        
        <p>O novo portal representa um investimento significativo na modernização dos serviços prestados pela CDA aos seus membros e à comunidade em geral. Com um design moderno e intuitivo, o portal oferece uma série de funcionalidades inovadoras que visam facilitar o acesso à informação aduaneira e melhorar a eficiência dos processos.</p>
        
        <h3>Principais funcionalidades do CDA Digital V4</h3>
        
        <ul>
            <li><strong>Verificação de Despachantes:</strong> Ferramenta que permite verificar se um profissional está registado na CDA, com informações detalhadas sobre o seu estado e categoria.</li>
            <li><strong>Centro Documental:</strong> Acesso centralizado a legislação, circulares, regulamentos e outras publicações relevantes para o sector aduaneiro.</li>
            <li><strong>Pergunte à CDA:</strong> Assistente virtual que responde a perguntas com base na documentação oficial disponível.</li>
            <li><strong>Presença Territorial:</strong> Informações detalhadas sobre as delegações da CDA em todo o território nacional.</li>
            <li><strong>Notícias e Actualidades:</strong> Secção dedicada às últimas notícias e desenvolvimentos no sector aduaneiro.</li>
        </ul>
        
        <p>O Presidente da CDA, Salmate Chuaibo Daud, destacou que "este portal é um reflexo do nosso compromisso em fornecer serviços de excelência e em manter os nossos membros informados sobre todas as alterações e desenvolvimentos no sector aduaneiro".</p>
        
        <p>O CDA Digital V4 está disponível em <a href="https://cleitonsimiaondonac2-cyber.github.io/cda-digital-v4/" target="_blank">https://cleitonsimiaondonac2-cyber.github.io/cda-digital-v4/</a> e é compatível com todos os dispositivos, desde computadores a smartphones e tablets.</p>
        
        <p><em>Data de publicação: 28 de Setembro de 2026</em></p>`,
        date: '2026-09-28',
        category: 'Institucional',
        author: 'CDA Comunicação',
        image: 'img/news/featured-1.webp',
        tags: ['portal', 'digital', 'lançamento', 'modernização']
    },
    {
        id: 2,
        title: 'Novo regulamento aduaneiro entra em vigor em Outubro de 2026',
        excerpt: 'O Governo de Moçambique aprovou novo regulamento que simplifica procedimentos de despacho aduaneiro. CDA esteve envolvida nas discussões.',
        content: `<p>O Governo de Moçambique, através do Ministério das Finanças e da Autoridade Tributária, aprovou um novo regulamento aduaneiro que entrará em vigor no dia 1 de Outubro de 2026. O novo regulamento visa simplificar e agilizar os procedimentos de despacho aduaneiro, reduzindo os tempos de espera e melhorando a eficiência nas operações de comércio exterior.</p>
        
        <p>A Câmara dos Despachantes Aduaneiros (CDA) esteve activamente envolvida nas discussões e consultas públicas que precederam a aprovação deste regulamento. A CDA contribuiu com a sua experiência e conhecimento do sector para garantir que as novas normas são práticas e exequíveis.</p>
        
        <h3>Principais alterações</h3>
        
        <ul>
            <li><strong>Redução de documentação:</strong> Menos documentos exigidos para o desembaraço aduaneiro.</li>
            <li><strong>Processos digitalizados:</strong> Maior utilização de plataformas digitais para submissão de documentos.</li>
            <li><strong>Prazos reduzidos:</strong> Diminuição dos prazos máximos para despacho.</li>
            <li><strong>Transparência:</strong> Maior transparência nos critérios de avaliação e taxação.</li>
        </ul>
        
        <p>A CDA está a organizar sessões de formação para os seus membros sobre as novas normas, garantindo que todos os despachantes estão devidamente preparados para a implementação do novo regulamento.</p>
        
        <p><em>Data de publicação: 25 de Setembro de 2026</em></p>`,
        date: '2026-09-25',
        category: 'Legislação',
        author: 'CDA Comunicação',
        image: 'img/news/news-1.webp',
        tags: ['regulamento', 'legislação', 'despacho aduaneiro']
    },
    {
        id: 3,
        title: 'Formação sobre despacho aduaneiro agendada para Novembro',
        excerpt: 'A CDA em parceria com a AT está a organizar formação especializada para despachantes sobre as novas normas aduaneiras.',
        content: `<p>A Câmara dos Despachantes Aduaneiros (CDA), em parceria com a Autoridade Tributária (AT), está a organizar uma série de sessões de formação especializada para despachantes aduaneiros. As formações decorrerão ao longo do mês de Novembro de 2026 e têm como objectivo preparar os profissionais para a implementação das novas normas aduaneiras.</p>
        
        <h3>Detalhes da Formação</h3>
        
        <ul>
            <li><strong>Duração:</strong> 2 dias por sessão</li>
            <li><strong>Local:</strong> Maputo, Beira e Nampula</li>
            <li><strong>Data de Início:</strong> 3 de Novembro de 2026</li>
            <li><strong>Número de Participantes:</strong> Limitado a 30 por sessão</li>
        </ul>
        
        <h3>Tópicos a Abordar</h3>
        
        <ul>
            <li>Novo Regulamento Aduaneiro 2026</li>
            <li>Processos de Despacho Digital</li>
            <li>Classificação Tarifária</li>
            <li>Valoração Aduaneira</li>
            <li>Infrações e Sanções</li>
            <li>Ética e Deontologia Profissional</li>
        </ul>
        
        <p><strong>Inscrições:</strong> As inscrições estão abertas e podem ser feitas através do portal CDA Digital ou directamente nas delegações da CDA.</p>
        
        <p><em>Data de publicação: 20 de Setembro de 2026</em></p>`,
        date: '2026-09-20',
        category: 'Formação',
        author: 'CDA Comunicação',
        image: 'img/news/news-2.webp',
        tags: ['formação', 'despacho aduaneiro', 'novas normas']
    },
    {
        id: 4,
        title: 'CDA estabelece parceria com Autoridade Tributária para capacitação',
        excerpt: 'A parceria visa fortalecer a colaboração entre despachantes e a AT, melhorando a eficiência nos processos aduaneiros.',
        content: `<p>A Câmara dos Despachantes Aduaneiros (CDA) e a Autoridade Tributária (AT) assinaram um protocolo de parceria que visa fortalecer a colaboração entre as duas instituições. O objectivo principal desta parceria é melhorar a eficiência nos processos aduaneiros e promover a transparência nas operações de comércio exterior.</p>
        
        <p>O protocolo foi assinado em cerimónia realizada na sede da AT, em Maputo, e contou com a presença do Presidente da CDA, Salmate Chuaibo Daud, e do Director-Geral da AT, Amélia Nakhare.</p>
        
        <h3>Áreas de Colaboração</h3>
        
        <ul>
            <li><strong>Capacitação:</strong> Organização conjunta de sessões de formação e workshops.</li>
            <li><strong>Consultas:</strong> Participação da CDA em consultas públicas sobre legislação aduaneira.</li>
            <li><strong>Inovação:</strong> Desenvolvimento conjunto de soluções tecnológicas para o sector.</li>
            <li><strong>Fiscalização:</strong> Colaboração em acções de fiscalização e combate à fraude.</li>
        </ul>
        
        <p>A parceria também prevê a criação de um grupo de trabalho conjunto que se reunirá trimestralmente para avaliar o progresso e identificar novas oportunidades de colaboração.</p>
        
        <p><em>Data de publicação: 15 de Setembro de 2026</em></p>`,
        date: '2026-09-15',
        category: 'Parcerias',
        author: 'CDA Comunicação',
        image: 'img/news/news-3.webp',
        tags: ['parceria', 'Autoridade Tributária', 'colaboração']
    },
    {
        id: 5,
        title: 'XXVI.ª Sessão da Assembleia Geral Ordinária da CDA',
        excerpt: 'A CDA reuniu os seus membros para discutir o futuro da profissão aduaneira em Moçambique.',
        content: `<p>A Câmara dos Despachantes Aduaneiros (CDA) realizou a sua XXVI.ª Sessão da Assembleia Geral Ordinária no dia 10 de Setembro de 2026, em Maputo. O evento reuniu mais de 150 membros da CDA de todo o país e contou com a presença de representantes do Governo, da Autoridade Tributária e de outras instituições parceiras.</p>
        
        <h3>Ordem de Trabalhos</h3>
        
        <ul>
            <li><strong>Abertura:</strong> Discurso do Presidente da CDA, Salmate Chuaibo Daud.</li>
            <li><strong>Relatório de Actividades:</strong> Apresentação do relatório de actividades do mandato 2024-2026.</li>
            <li><strong>Relatório Financeiro:</strong> Apresentação e aprovação do relatório financeiro.</li>
            <li><strong>Eleições:</strong> Eleição dos novos órgãos sociais para o mandato 2026-2028.</li>
            <li><strong>Palestras:</strong> Sessões temáticas sobre o futuro do sector aduaneiro.</li>
        </ul>
        
        <h3>Resultados das Eleições</h3>
        
        <p>Foram eleitos os seguintes órgãos sociais para o mandato 2026-2028:</p>
        
        <ul>
            <li><strong>Presidente:</strong> Salmate Chuaibo Daud (reeleito)</li>
            <li><strong>Vice-Presidente:</strong> Maria Santos</li>
            <li><strong>Secretário-Geral:</strong> João Silva</li>
            <li><strong>Tesoureiro:</strong> Carlos Afonso</li>
        </ul>
        
        <p><em>Data de publicação: 12 de Setembro de 2026</em></p>`,
        date: '2026-09-12',
        category: 'Institucional',
        author: 'CDA Comunicação',
        image: 'img/news/news-4.webp',
        tags: ['Assembleia Geral', 'eleições', 'mandato']
    },
    {
        id: 6,
        title: 'CDA participa em conferência internacional sobre comércio exterior',
        excerpt: 'Representantes da CDA participaram na Conferência Internacional sobre Comércio Exterior, realizada em Joanesburgo.',
        content: `<p>Uma delegação da Câmara dos Despachantes Aduaneiros (CDA) de Moçambique participou na Conferência Internacional sobre Comércio Exterior, realizada em Joanesburgo, África do Sul, entre os dias 5 e 7 de Setembro de 2026. O evento reuniu representantes de câmaras de comércio e despachantes aduaneiros de mais de 30 países.</p>
        
        <p>A delegação da CDA foi liderada pelo Presidente, Salmate Chuaibo Daud, e incluiu também o Vice-Presidente, Maria Santos, e o Secretário-Geral, João Silva.</p>
        
        <h3>Temas Abordados</h3>
        
        <ul>
            <li><strong>Digitalização:</strong> O impacto da digitalização nos processos aduaneiros.</li>
            <li><strong>Integração Regional:</strong> Facilitação do comércio na África Austral.</li>
            <li><strong>Sustentabilidade:</strong> Práticas sustentáveis no comércio exterior.</li>
            <li><strong>Inovação:</strong> Novas tecnologias no sector aduaneiro.</li>
        </ul>
        
        <p>Durante o evento, a CDA teve a oportunidade de partilhar a sua experiência na implementação de soluções digitais e de apresentar os progressos alcançados no âmbito da modernização dos serviços aduaneiros em Moçambique.</p>
        
        <p><em>Data de publicação: 8 de Setembro de 2026</em></p>`,
        date: '2026-09-08',
        category: 'Internacional',
        author: 'CDA Comunicação',
        image: 'img/news/news-5.webp',
        tags: ['conferência', 'comércio exterior', 'internacional']
    }
];

// ============================================
// Documentos
// ============================================

const documentos = [
    {
        id: 1,
        title: 'Lei nº 4/2011 - Criação da Câmara dos Despachantes Aduaneiros',
        type: 'Legislação',
        category: 'Leis',
        date: '2011-09-16',
        file: '/documentos/lei-4-2011.pdf',
        size: '2.4 MB',
        pages: 15,
        description: 'Lei que cria a Câmara dos Despachantes Aduaneiros de Moçambique e define as suas atribuições e competências.',
        reference: 'Boletim da República, I Série, nº 37',
        status: 'Vigente'
    },
    {
        id: 2,
        title: 'Regulamento da CDA',
        type: 'Regulamentos',
        category: 'Regulamentos Internos',
        date: '2012-03-01',
        file: '/documentos/regulamento-cda.pdf',
        size: '1.8 MB',
        pages: 25,
        description: 'Regulamento interno da Câmara dos Despachantes Aduaneiros que define os procedimentos e normas de funcionamento.',
        reference: 'Aprovado em Assembleia Geral',
        status: 'Vigente'
    },
    {
        id: 3,
        title: 'Estatutos da CDA',
        type: 'Legislação',
        category: 'Estatutos',
        date: '2011-12-15',
        file: '/documentos/estatutos-cda.pdf',
        size: '1.2 MB',
        pages: 18,
        description: 'Estatutos da Câmara dos Despachantes Aduaneiros de Moçambique.',
        reference: 'Aprovado em Assembleia Geral',
        status: 'Vigente'
    },
    {
        id: 4,
        title: 'Circular nº 001/2026 - Novas Normas de Despacho Aduaneiro',
        type: 'Circulares',
        category: 'Normas',
        date: '2026-01-15',
        file: '/documentos/circular-001-2026.pdf',
        size: '512 KB',
        pages: 8,
        description: 'Circular com as novas normas de despacho aduaneiro a entrar em vigor em 2026.',
        reference: 'AT/CIRC/001/2026',
        status: 'Vigente'
    },
    {
        id: 5,
        title: 'Circular nº 002/2026 - Procedimentos para Importação de Veículos',
        type: 'Circulares',
        category: 'Procedimentos',
        date: '2026-02-20',
        file: '/documentos/circular-002-2026.pdf',
        size: '384 KB',
        pages: 6,
        description: 'Circular com os procedimentos específicos para importação de veículos.',
        reference: 'AT/CIRC/002/2026',
        status: 'Vigente'
    },
    {
        id: 6,
        title: 'Regulamento Aduaneiro 2026',
        type: 'Regulamentos',
        category: 'Regulamentos Externos',
        date: '2026-03-01',
        file: '/documentos/regulamento-aduaneiro-2026.pdf',
        size: '3.1 MB',
        pages: 45,
        description: 'Novo regulamento aduaneiro que entra em vigor em Outubro de 2026.',
        reference: 'Decreto nº 12/2026',
        status: 'Vigente'
    },
    {
        id: 7,
        title: 'Código Aduaneiro de Moçambique',
        type: 'Legislação',
        category: 'Códigos',
        date: '2015-06-10',
        file: '/documentos/codigo-aduaneiro.pdf',
        size: '4.2 MB',
        pages: 120,
        description: 'Código Aduaneiro de Moçambique com todas as normas e procedimentos aduaneiros.',
        reference: 'Lei nº 10/2015',
        status: 'Vigente'
    },
    {
        id: 8,
        title: 'Tabela de Taxas e Emolumentos 2026',
        type: 'Documentos',
        category: 'Tabelas',
        date: '2026-01-01',
        file: '/documentos/tabela-taxas-2026.pdf',
        size: '896 KB',
        pages: 12,
        description: 'Tabela actualizada de taxas e emolumentos aduaneiros para 2026.',
        reference: 'Portaria nº 5/2026',
        status: 'Vigente'
    },
    {
        id: 9,
        title: 'Guia de Procedimentos para Despachantes Aduaneiros',
        type: 'Publicações',
        category: 'Guias',
        date: '2025-11-15',
        file: '/documentos/guia-procedimentos.pdf',
        size: '2.1 MB',
        pages: 35,
        description: 'Guia prático com todos os procedimentos para despachantes aduaneiros.',
        reference: 'CDA/PUB/001/2025',
        status: 'Vigente'
    },
    {
        id: 10,
        title: 'Boletim Informativo CDA - Janeiro 2026',
        type: 'Publicações',
        category: 'Boletins',
        date: '2026-01-31',
        file: '/documentos/boletim-jan-2026.pdf',
        size: '1.5 MB',
        pages: 20,
        description: 'Boletim informativo com as principais notícias e actualizações do sector aduaneiro.',
        reference: 'CDA/BOLETIM/01/2026',
        status: 'Vigente'
    }
];

// ============================================
// Membros (amostra)
// ============================================

const membros = [
    {
        id: 1,
        code: '000100010912',
        name: 'Carlos F. Filomeno de Gama Afonso',
        cedula: 'DESP / 001 / DGA / 03',
        category: 'Despachante Aduaneiro',
        delegation: 'Sul - Maputo',
        email: 'carlos.afonso@cda-mz.org',
        phone: '+258 82 123 4567',
        address: 'Av. 25 de Setembro, 1138, 1º Andar, Maputo',
        registrationDate: '2011-09-16',
        expiryDate: '2027-09-16',
        status: 'ACTIVO',
        company: 'Gama Afonso Despachos, Lda'
    },
    {
        id: 2,
        code: '000100010913',
        name: 'Maria dos Santos',
        cedula: 'DESP / 002 / MS / 03',
        category: 'Despachante Aduaneiro',
        delegation: 'Sul - Maputo',
        email: 'maria.santos@cda-mz.org',
        phone: '+258 82 234 5678',
        address: 'Rua da República, 456, Maputo',
        registrationDate: '2011-10-01',
        expiryDate: '2027-10-01',
        status: 'ACTIVO',
        company: 'Santos & Associados, Lda'
    },
    {
        id: 3,
        code: '000100010914',
        name: 'João Silva',
        cedula: 'DESP / 003 / JS / 02',
        category: 'Despachante Aduaneiro',
        delegation: 'Centro - Beira',
        email: 'joao.silva@cda-mz.org',
        phone: '+258 82 345 6789',
        address: 'Av. Samora Machel, 789, Beira',
        registrationDate: '2012-01-15',
        expiryDate: '2028-01-15',
        status: 'ACTIVO',
        company: 'Silva Despachos Aduaneiros'
    },
    {
        id: 4,
        code: '000100010915',
        name: 'Ana Ferreira',
        cedula: 'DESP / 004 / AF / 01',
        category: 'Despachante Aduaneiro',
        delegation: 'Norte - Nampula',
        email: 'ana.ferreira@cda-mz.org',
        phone: '+258 82 456 7890',
        address: 'Rua Pedro Massavana, 123, Nampula',
        registrationDate: '2012-03-20',
        expiryDate: '2028-03-20',
        status: 'ACTIVO',
        company: 'Ferreira & Filhos, Lda'
    },
    {
        id: 5,
        code: '000100010916',
        name: 'Pedro Costa',
        cedula: 'DESP / 005 / PC / 03',
        category: 'Despachante Aduaneiro',
        delegation: 'Sul - Maputo',
        email: 'pedro.costa@cda-mz.org',
        phone: '+258 82 567 8901',
        address: 'Av. Eduardo Mondlane, 234, Maputo',
        registrationDate: '2013-05-10',
        expiryDate: '2029-05-10',
        status: 'ACTIVO',
        company: 'Costa Despachos Internacionais'
    }
];

// ============================================
// Eventos / Actividades
// ============================================

const eventos = [
    {
        id: 1,
        title: 'XXVI.ª Sessão da Assembleia Geral Ordinária',
        date: '2026-09-10',
        endDate: '2026-09-10',
        time: '09:00 - 17:00',
        location: 'Hotel Polana Serena, Maputo',
        description: 'Sessão da Assembleia Geral Ordinária para apresentação de relatórios e eleição de novos órgãos sociais.',
        category: 'Institucional',
        image: 'img/activities/assembleia-geral.webp',
        status: 'Realizado'
    },
    {
        id: 2,
        title: 'Formação sobre Novo Regulamento Aduaneiro',
        date: '2026-11-03',
        endDate: '2026-11-04',
        time: '08:30 - 16:30',
        location: 'Sede da CDA, Maputo',
        description: 'Formação intensiva sobre o novo regulamento aduaneiro que entra em vigor em Outubro de 2026.',
        category: 'Formação',
        image: 'img/activities/formacao.webp',
        status: 'Agendado',
        seatsAvailable: 30,
        seatsTotal: 30
    },
    {
        id: 3,
        title: 'Workshop sobre Digitalização Aduaneira',
        date: '2026-11-15',
        endDate: '2026-11-15',
        time: '09:00 - 13:00',
        location: 'Hotel Avani, Maputo',
        description: 'Workshop para discutir as últimas tendências em digitalização de processos aduaneiros.',
        category: 'Workshop',
        image: 'img/activities/workshop-digital.webp',
        status: 'Agendado',
        seatsAvailable: 25,
        seatsTotal: 25
    },
    {
        id: 4,
        title: 'Reunião com Autoridade Tributária',
        date: '2026-10-05',
        endDate: '2026-10-05',
        time: '10:00 - 12:00',
        location: 'Sede da AT, Maputo',
        description: 'Reunião de trabalho entre a CDA e a Autoridade Tributária para discussão de assuntos de interesse mútuo.',
        category: 'Reunião',
        image: 'img/activities/reuniao-at.webp',
        status: 'Agendado'
    },
    {
        id: 5,
        title: 'Conferência Internacional sobre Comércio Exterior',
        date: '2026-09-05',
        endDate: '2026-09-07',
        time: '09:00 - 18:00',
        location: 'Joanesburgo, África do Sul',
        description: 'Participação da CDA na Conferência Internacional sobre Comércio Exterior.',
        category: 'Conferência',
        image: 'img/activities/conferencia.webp',
        status: 'Realizado'
    }
];

// ============================================
// Parceiros
// ============================================

const parceiros = [
    {
        id: 1,
        name: 'Autoridade Tributária',
        shortName: 'AT',
        type: 'Instituição Pública',
        logo: 'img/partners/at.svg',
        website: 'https://www.at.gov.mz',
        description: 'Autoridade Tributária de Moçambique é a instituição responsável pela administração tributária e aduaneira no país.',
        category: 'Autoridades'
    },
    {
        id: 2,
        name: 'Ministério das Finanças',
        shortName: 'MINFIN',
        type: 'Ministério',
        logo: 'img/partners/ministrio-financas.svg',
        website: 'https://www.minfin.gov.mz',
        description: 'Ministério das Finanças de Moçambique é o órgão do Governo responsável pela política financeira e orçamental.',
        category: 'Autoridades'
    },
    {
        id: 3,
        name: 'Ministério do Comércio e Indústria',
        shortName: 'MCI',
        type: 'Ministério',
        logo: 'img/partners/ministrio-comercio.svg',
        website: 'https://www.mic.gov.mz',
        description: 'Ministério do Comércio e Indústria de Moçambique é o órgão do Governo responsável pela promoção do comércio e da indústria.',
        category: 'Autoridades'
    },
    {
        id: 4,
        name: 'Ordem dos Contabilistas e Auditores de Moçambique',
        shortName: 'OCAM',
        type: 'Ordem Profissional',
        logo: 'img/partners/ocam.svg',
        website: 'https://www.ocam.org.mz',
        description: 'Ordem dos Contabilistas e Auditores de Moçambique é a instituição que regula a profissão de contabilista e auditor no país.',
        category: 'Ordem Profissional'
    },
    {
        id: 5,
        name: 'Confederação das Associações Económicas de Moçambique',
        shortName: 'CTA',
        type: 'Confederação',
        logo: 'img/partners/cta.svg',
        website: 'https://www.cta.org.mz',
        description: 'Confederação das Associações Económicas de Moçambique é a principal organização patronal do país.',
        category: 'Associação'
    },
    {
        id: 6,
        name: 'Associação Industrial de Moçambique',
        shortName: 'API',
        type: 'Associação',
        logo: 'img/partners/api.svg',
        website: 'https://www.api.org.mz',
        description: 'Associação Industrial de Moçambique é a organização que representa os interesses do sector industrial.',
        category: 'Associação'
    }
];

// ============================================
// Delegações
// ============================================

const delegacoes = [
    {
        id: 1,
        name: 'Delegação Sul',
        region: 'Sul',
        city: 'Maputo',
        address: 'Av. 25 de Setembro, 1138, 1º Andar',
        phone: '+258 82 000 0000',
        email: 'sul@cda-mz.org',
        responsible: 'Carlos Afonso',
        responsiblePosition: 'Delegado Regional',
        image: 'img/delegations/sul.webp',
        latitude: -25.9686,
        longitude: 32.5801
    },
    {
        id: 2,
        name: 'Delegação Centro',
        region: 'Centro',
        city: 'Beira',
        address: 'Av. Samora Machel, 789',
        phone: '+258 82 000 0000',
        email: 'centro@cda-mz.org',
        responsible: 'Maria Santos',
        responsiblePosition: 'Delegada Regional',
        image: 'img/delegations/centro.webp',
        latitude: -19.8434,
        longitude: 34.8358
    },
    {
        id: 3,
        name: 'Delegação Norte',
        region: 'Norte',
        city: 'Nampula',
        address: 'Rua Pedro Massavana, 123',
        phone: '+258 82 000 0000',
        email: 'norte@cda-mz.org',
        responsible: 'João Silva',
        responsiblePosition: 'Delegado Regional',
        image: 'img/delegations/norte.webp',
        latitude: -15.1128,
        longitude: 39.2622
    }
];

// ============================================
// Estatísticas
// ============================================

const estatisticas = {
    membros: {
        total: 221,
        ativos: 215,
        suspensos: 6,
        porDelegacao: {
            'Sul': 120,
            'Centro': 60,
            'Norte': 41
        }
    },
    documentos: {
        total: 261,
        porTipo: {
            'Legislação': 50,
            'Circulares': 89,
            'Regulamentos': 30,
            'Publicações': 25,
            'Outros': 67
        }
    },
    empresas: {
        total: 150,
        ativas: 145
    },
    formacoes: {
        total: 45,
        anoCorrente: 12
    }
};

// ============================================
// Linha do Tempo (História da CDA)
// ============================================

const historia = [
    {
        year: '1996',
        title: 'Início do Processo',
        description: 'Início do processo de criação de uma associação de despachantes aduaneiros em Moçambique.',
        image: null,
        documents: []
    },
    {
        year: '2006',
        title: 'Retoma do Processo',
        description: 'Retoma do processo de constituição da Câmara dos Despachantes Aduaneiros com novo impulso.',
        image: null,
        documents: []
    },
    {
        year: '2011',
        title: 'Criação Legal',
        description: 'Aprovação da Lei nº 4/2011 que cria oficialmente a Câmara dos Despachantes Aduaneiros de Moçambique.',
        image: null,
        documents: ['Lei nº 4/2011']
    },
    {
        year: '2011',
        title: 'Primeiros Órgãos Sociais',
        description: 'Eleição dos primeiros órgãos sociais da CDA em 16 de Setembro de 2011. Dixon Chongo foi eleito o primeiro Presidente.',
        image: null,
        documents: ['Acta da Assembleia Geral Constitutiva']
    },
    {
        year: '2014',
        title: 'Novo Ciclo Institucional',
        description: 'Início de um novo ciclo institucional com a eleição de novos órgãos sociais.',
        image: null,
        documents: []
    },
    {
        year: '2024',
        title: 'Actual Mandato',
        description: 'Eleição dos órgãos sociais para o mandato 2024-2026. Salmate Chuaibo Daud assumiu a presidência.',
        image: null,
        documents: []
    },
    {
        year: '2026',
        title: 'Lançamento do CDA Digital V4',
        description: 'Lançamento oficial do novo portal digital CDA Digital V4, marcando um passo significativo na modernização dos serviços da CDA.',
        image: null,
        documents: []
    }
];

// ============================================
// Liderança (Presidentes)
// ============================================

const lideranca = [
    {
        id: 1,
        name: 'Dixon Chongo',
        position: 'Presidente',
        mandate: '2011-2014',
        image: 'img/leadership/dixon-chongo.webp',
        bio: 'Primeiro Presidente da Câmara dos Despachantes Aduaneiros de Moçambique. Liderou o processo de constituição e os primeiros anos da instituição.',
        achievements: [
            'Constituição formal da CDA',
            'Primeiras estruturas administrativas',
            'Primeiros órgãos sociais',
            'Estabelecimento de parcerias iniciais'
        ]
    },
    {
        id: 2,
        name: 'Outro Presidente',
        position: 'Presidente',
        mandate: '2014-2023',
        image: 'img/leadership/presidente-2.webp',
        bio: 'Segundo Presidente da CDA, liderou a instituição durante um período de crescimento e consolidação.',
        achievements: [
            'Expansão da base de membros',
            'Criação de delegações regionais',
            'Modernização de processos',
            'Fortalecimento de parcerias'
        ]
    },
    {
        id: 3,
        name: 'Salmate Chuaibo Daud',
        position: 'Presidente',
        mandate: '2024-2026',
        image: 'img/leadership/salmate-chuaibo.webp',
        bio: 'Actual Presidente da Câmara dos Despachantes Aduaneiros de Moçambique. Lidera a instituição no actual mandato com foco na digitalização e modernização.',
        achievements: [
            'Lançamento do CDA Digital V4',
            'Fortalecimento da parceria com a AT',
            'Organização de formações especializadas',
            'Participação em eventos internacionais'
        ]
    }
];

// ============================================
// FAQ (Perguntas Frequentes)
// ============================================

const faq = [
    {
        id: 1,
        question: 'O que é a CDA?',
        answer: 'A Câmara dos Despachantes Aduaneiros (CDA) de Moçambique é uma pessoa colectiva de direito público que representa, regula e promove o exercício da actividade de despachante aduaneiro no país.',
        category: 'Geral'
    },
    {
        id: 2,
        question: 'Quais são as atribuições da CDA?',
        answer: 'A CDA tem como principais atribuições: emitir carteira profissional, manter o registo de membros, fiscalizar o exercício da actividade, representar os interesses dos despachantes, e promover a formação contínua dos profissionais.',
        category: 'Geral'
    },
    {
        id: 3,
        question: 'Como posso tornar-me membro da CDA?',
        answer: 'Para se tornar membro da CDA, é necessário preencher os requisitos legais, submeter a documentação exigida e pagar as taxas de registo. O processo está detalhado na página "Tornar-se Membro" do nosso portal.',
        category: 'Membros'
    },
    {
        id: 4,
        question: 'Como verifico se um despachante está registado?',
        answer: 'Pode verificar se um despachante está registado na CDA através da ferramenta de verificação disponível na homepage do nosso portal. Basta introduzir o código profissional, nome ou número da cédula.',
        category: 'Verificação'
    },
    {
        id: 5,
        question: 'Onde posso encontrar a legislação aduaneira?',
        answer: 'Toda a legislação aduaneira relevante está disponível no Centro Documental do nosso portal. Pode pesquisar por palavras-chave ou navegar pelas categorias.',
        category: 'Documentação'
    },
    {
        id: 6,
        question: 'A CDA oferece formações?',
        answer: 'Sim, a CDA organiza regularmente sessões de formação e workshops para os seus membros e outros interessados. As formações abrangem diversos tópicos relacionados com o despacho aduaneiro.',
        category: 'Formação'
    },
    {
        id: 7,
        question: 'Como contacto a CDA?',
        answer: 'Pode contactar a CDA através do formulário de contacto disponível no nosso portal, por email para secretaria@cda-mz.org, ou directamente nas nossas delegações em Maputo, Beira e Nampula.',
        category: 'Contactos'
    }
];

// ============================================
// Mensagens do Sistema
// ============================================

const mensagens = {
    sucesso: {
        verificacao: 'Verificação realizada com sucesso!',
        envio: 'Mensagem enviada com sucesso!',
        subscrição: 'Subscrição realizada com sucesso!'
    },
    erro: {
        verificacao: 'Nenhum registo encontrado com os critérios especificados.',
        envio: 'Ocorreu um erro ao enviar a sua mensagem. Por favor, tente novamente.',
        subscrição: 'Ocorreu um erro ao processar a sua subscrição. Por favor, tente novamente.',
        geral: 'Ocorreu um erro. Por favor, tente novamente mais tarde.'
    },
    aviso: {
        campoObrigatorio: 'Este campo é obrigatório.',
        emailInvalido: 'Por favor, introduza um endereço de email válido.',
        telefoneInvalido: 'Por favor, introduza um número de telefone válido.'
    }
};

// ============================================
// Exportar Dados
// ============================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        noticias,
        documentos,
        membros,
        eventos,
        parceiros,
        delegacoes,
        estatisticas,
        historia,
        lideranca,
        faq,
        mensagens
    };
} else {
    window.CDA = window.CDA || {};
    window.CDA.Data = {
        noticias,
        documentos,
        membros,
        eventos,
        parceiros,
        delegacoes,
        estatisticas,
        historia,
        lideranca,
        faq,
        mensagens
    };
}

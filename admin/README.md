# 📋 Painel de Administração CDA Digital V1

> **Versão:** 1.0.0  
> **Última Actualização:** 30 de Setembro de 2024  
> **Desenvolvedor:** Cleiton Simiao Donac  
> **Cliente:** Câmara dos Despachantes Aduaneiros de Moçambique (CDA)

---

## 🎯 Sobre o Painel de Administração

O **Painel de Administração CDA Digital** é uma plataforma completa para gestão de conteúdo do portal institucional da Câmara dos Despachantes Aduaneiros de Moçambique. Este painel permite que a equipa da CDA gerencie de forma eficiente todas as informações e serviços disponibilizados no portal.

---

## 📁 Estrutura do Painel

```
admin/
├── css/
│   └── admin.css              # Estilos principais do painel
├── js/
│   └── admin.js               # Funções JavaScript comuns
├── login.html                 # Página de autenticação
├── index.html                # Dashboard principal
├── noticias.html             # Gestão de notícias
├── documentos.html           # Gestão de documentos
├── despachantes.html         # Gestão de despachantes
├── presidentes.html          # Gestão de presidentes
├── timeline.html             # Gestão da linha do tempo
├── numeros.html              # Gestão de CDA em números
├── calendario.html           # Calendário de eventos
├── galeria.html              # Gestão de galeria
├── avaliacoes.html           # Sistema de avaliações
├── newsletter.html           # Gestão de newsletters
├── users.html                # Gestão de utilizadores
├── settings.html             # Configurações do sistema
└── README.md                 # Este documento
```

---

## ✅ Funcionalidades

### 🏠 Dashboard (index.html)
- **Estatísticas em tempo real** - Visualização de métricas chaves
- **Gráficos de visualização** - Dados apresentados graficamente
- **Acessos rápidos** - Links para as áreas mais utilizadas
- **Atividades recentes** - Histórico das últimas acções

### 📰 Gestão de Notícias (noticias.html)
- ✅ CRUD completo (Criar, Ler, Actualizar, Eliminar)
- 📝 Editor de texto
- 🏷️ Categorias e tags
- 📅 Data de publicação
- 🔍 Pesquisa e filtros avançados
- 📄 Imagem de capa
- 👤 Autor da notícia

### 📄 Gestão de Documentos (documentos.html)
- ✅ CRUD completo
- 📁 Categorias de documentos
- 🔗 Upload de ficheiros
- 📄 Preview de documentos
- 🔍 Pesquisa por título e categoria
- 📅 Data de publicação

### 👥 Gestão de Despachantes (despachantes.html)
- ✅ CRUD completo
- 🆔 Código profissional e cédula
- 📍 Delegações regionais
- 📧 Contactos (email, telefone)
- 📅 Datas de registo e validade
- 📸 Foto do despachante
- 🔍 Filtros por estado e delegação
- 📊 Estatísticas (ativos, suspensos, totais)

### 👔 Gestão de Presidentes (presidentes.html)
- ✅ CRUD completo
- 📅 Mandatos
- 📝 Feitos e marcos históricos
- 📄 Documentos relacionados
- 🖼️ Galerias de fotos
- 📊 Ordenação personalizada

### 📅 Linha do Tempo (timeline.html)
- ✅ CRUD completo
- 📅 Eventos por ano
- 🏷️ Categorias (Fundação, Crescimento, Evento, Prémio, Parceria)
- 📝 Descrições detalhadas
- 🖼️ Imagens dos eventos
- 🎯 Visualização cronológica
- 📊 Calendário interativo

### 🔢 CDA em Números (numeros.html)
- ✅ CRUD completo
- 🔢 Valores numéricos
- 📝 Descrições
- 🎨 Ícones personalizados
- 📊 Preview visual dos números
- 📈 Ordenação personalizada

### 📆 Calendário de Eventos (calendario.html)
- ✅ CRUD completo
- 📅 Visualização por mês, semana, dia ou lista
- 🏷️ Categorias de eventos
- 🕐 Horários de início e fim
- 📍 Localização
- 👥 Capacidade
- 🔄 Eventos recorrentes
- 🖼️ Imagem do evento

### 🖼️ Galeria (galeria.html)
- ✅ CRUD de álbuns
- 📁 Organização por categorias
- 🖼️ Upload múltiplo de fotos
- 📅 Data do álbum
- 🎨 Capa do álbum
- 📊 Estatísticas (álbuns, fotos, armazenamento)

### ⭐ Sistema de Avaliações (avaliacoes.html)
- ✅ CRUD completo de avaliações
- 🎯 Avaliação por estrelas (1-5)
- 📝 Comentários
- 👤 Identificação do avaliador
- 📊 Categorias de avaliação
- 📈 Relatórios e estatísticas
- 📊 Gráficos de desempenho

### 📧 Newsletter (newsletter.html)
- ✅ CRUD completo de newsletters
- 📝 Editor de conteúdo HTML
- 👥 Gestão de destinatários
- 📅 Agendamento de envio
- 📊 Estatísticas de envio
- 📈 Taxas de abertura e cliques
- 🎨 Templates personalizados
- 👥 Gestão de subscritores
- 📤 Exportação de subscritores

### 👥 Gestão de Utilizadores (users.html)
- ✅ CRUD completo
- 👤 Papéis (Admin, Editor, Visualizador)
- 🔐 Estados (Activo, Inactivo, Bloqueado)
- 📧 Email e senha
- 🔍 Pesquisa por nome e papel
- 🚫 Proteção contra eliminação do utilizador actual

### ⚙️ Configurações (settings.html)
- ⚙️ **Configurações Gerais**
  - Título do site
  - Slogan
  - Descrição
  - Contactos
  - Endereço

- 🌐 **Redes Sociais**
  - Facebook
  - Twitter/X
  - LinkedIn
  - Instagram

- 🔍 **SEO**
  - Meta tags
  - Descrições
  - Palavras-chave

- 🔒 **Segurança**
  - Tempo de sessão
  - Tentativas de login
  - Bloqueios
  - Comprimento mínimo de senha

- 🔧 **Manutenção**
  - Limpar cache
  - Reindexar dados
  - Backup do sistema
  - Restaurar configurações padrão

---

## 🎨 Design e Experiência de Utilizador

### 📱 Responsive Design
- Totalmente adaptável a todos os tamanhos de ecrã
- Layout optimizado para desktop, tablet e mobile
- Navegação intuitiva em todos os dispositivos

### 🎯 Componentes de UI
- **Sidebar** - Menu de navegação lateral recolhível
- **Header** - Barra superior com ações rápidas
- **Tabelas** - Visualização de dados com paginação
- **Modais** - Janelas de diálogo para CRUD
- **Notificações** - Alertas em tempo real
- **Loading States** - Indicadores de carregamento

### 🌈 Paleta de Cores
| Cor | Código | Uso |
|-----|--------|-----|
| Primária | `#1E3A8A` | Botões principais, links |
| Secundária | `#3B82F6` | Acentos, destaques |
| Sucesso | `#10B981` | Confirmações, estados activos |
| Aviso | `#F59E0B` | Alertas, estados de atenção |
| Erro | `#EF4444` | Erros, estados críticos |
| Neutro | `#6B7280` | Textos, bordas |

---

## 🔐 Sistema de Autenticação

### 👤 Papéis de Utilizador
| Papel | Permissões |
|-------|-------------|
| **Administrador** | Acesso total a todas as funcionalidades |
| **Editor** | Criar, editar e eliminar conteúdo |
| **Visualizador** | Apenas visualizar conteúdo |

### 🔑 Credenciais Padrão
- **Email:** `admin@cda-mz.org`
- **Senha:** `admin123`

> ⚠️ **IMPORTANTE:** Alterar a senha padrão após o primeiro login!

### 📋 Processo de Login
1. Aceder à página: `https://seu-dominio.com/admin/login.html`
2. Inserir email e senha
3. Clicar em "Entrar"
4. Será redireccionado para o Dashboard

### 🚪 Logout
- Clicar no ícone do utilizador no canto superior direito
- Seleccionar "Sair"
- Ou aceder a: `javascript:logout()`

---

## 🚀 Como Começar

### 📥 Instalação Local

1. **Clonar o repositório:**
   ```bash
   git clone https://github.com/cleitonsimiaondonac2-cyber/cda-digital-v4.git
   cd cda-digital-v4
   ```

2. **Abrir no navegador:**
   - Navegar até `admin/login.html`
   - Fazer login com as credenciais padrão

3. **Iniciar a gestão:**
   - Começar por adicionar notícias, documentos e despachantes
   - Configurar as definições gerais

### 🌐 Deploy em Produção

#### Opção 1: GitHub Pages (Frontend apenas)
```bash
cd cda-digital-v4
git push origin main
```
Acesse: `https://cleitonsimiaondonac2-cyber.github.io/cda-digital-v4/admin/`

#### Opção 2: Servidor Web (Apache/Nginx)
1. Copiar todos os ficheiros para o diretório do servidor
2. Configurar o domínio para apontar para o diretório `admin/`
3. Aceder via: `https://seu-dominio.com/admin/`

#### Opção 3: Netlify/Vercel
1. Conectar o repositório GitHub
2. Configurar o build para servir ficheiros estáticos
3. Definir o diretório de publicação como `admin/`

---

## 🛠️ Personalização

### 🎨 Tema e Cores
Editar o ficheiro `admin/css/admin.css`:
```css
:root {
    --color-primary: #1E3A8A;
    --color-secondary: #3B82F6;
    --color-success: #10B981;
    --color-warning: #F59E0B;
    --color-danger: #EF4444;
}
```

### 📛 Logotipos
Substituir os ficheiros em:
- `img/logos/cda-logo-white.svg` - Logo branco para sidebar
- `img/logos/cda-logo.svg` - Logo colorido

### 📝 Textos e Mensagens
Editar os textos directamente nos ficheiros HTML ou criar um sistema de tradução.

---

## 📊 Integração com Backend

### 📋 API Endpoints (Exemplo)

#### Autenticação
```
POST /api/login
{
    "email": "admin@cda-mz.org",
    "password": "admin123"
}
```

#### Notícias
```
GET /api/noticias          # Listar todas
GET /api/noticias/{id}     # Obter uma
POST /api/noticias         # Criar
PUT /api/noticias/{id}     # Actualizar
DELETE /api/noticias/{id}  # Eliminar
```

#### Documentos
```
GET /api/documentos        # Listar todos
GET /api/documentos/{id}   # Obter um
POST /api/documentos       # Criar
PUT /api/documentos/{id}   # Actualizar
DELETE /api/documentos/{id} # Eliminar
```

### 🔗 Conectar ao Backend
Editar o ficheiro `admin/js/admin.js` para adicionar chamadas API:
```javascript
async function fetchNoticias() {
    const response = await fetch('/api/noticias');
    return await response.json();
}
```

---

## 📝 Boas Práticas

### ✅ Segurança
1. **Alterar senhas padrão** após a instalação
2. **Usar HTTPS** em produção
3. **Limitar tentativas de login** (configurado em Settings)
4. **Fazer backup regular** dos dados
5. **Manter o sistema actualizado**

### ✅ Gestão de Conteúdo
1. **Rever conteúdo** antes de publicar
2. **Usar categorias** para organizar o conteúdo
3. **Manter dados actualizados**
4. **Usar imagens optimizadas** para a web
5. **Testar em mobile** antes de publicar

### ✅ Desempenho
1. **Optimizar imagens** (comprimir e redimensionar)
2. **Limitar o número de itens** por página
3. **Usar cache** para melhorar a velocidade
4. **Minificar CSS e JavaScript** em produção

---

## 🐛 Resolução de Problemas

### ❌ Problemas Comuns

#### 1. Não consigo fazer login
- **Causa:** Senha incorrecta ou utilizador não existe
- **Solução:** Verificar credenciais ou redefinir senha

#### 2. Página não carrega
- **Causa:** JavaScript desactivado ou ficheiros em falta
- **Solução:** Verificar console do navegador (F12)

#### 3. Imagens não aparecem
- **Causa:** Caminho incorrecto ou ficheiro não existe
- **Solução:** Verificar caminhos dos ficheiros

#### 4. Dados não são guardados
- **Causa:** LocalStorage cheio ou navegador em modo privado
- **Solução:** Limpar cache ou usar modo normal

#### 5. Calendário não funciona
- **Causa:** Biblioteca FullCalendar não carregada
- **Solução:** Verificar conexão à internet e CDN

### 📞 Suporte

Para problemas técnicos, contactar:
- **Email:** cleitonsimiaondonac2-cyber@gmail.com
- **Telefone:** +258 82 000 0000

---

## 📚 Recursos Adicionais

### 📖 Documentação
- [Guia de Início Rápido](GUIA_INICIO_RAPIDO.md)
- [Manual do Administrador](MANUAL_ADMINISTRADOR.md)
- [Manual do Editor](MANUAL_EDITOR.md)
- [Arquitectura do Sistema](ARQUITECTURA.md)
- [Guia de Instalação](GUIA_INSTALACAO.md)
- [Guia de Deployment](GUIA_DEPLOYMENT.md)

### 🔗 Links Úteis
- [Site Oficial CDA](https://www.cda-mz.org/)
- [Repositório GitHub](https://github.com/cleitonsimiaondonac2-cyber/cda-digital-v4)
- [FullCalendar](https://fullcalendar.io/)
- [Chart.js](https://www.chartjs.org/)

---

## 📜 Licença

Este software é propriedade da **Câmara dos Despachantes Aduaneiros de Moçambique (CDA)** e foi desenvolvido por **Cleiton Simiao Donac**.

Todos os direitos reservados © 2024 CDA.

---

## 🎉 Agradecimentos

Agradecemos à **Presidente Salmate Chuaibo Daud** e à toda a equipa da CDA pela confiança e colaboração no desenvolvimento deste projecto.

---

> **Nota:** Este documento será actualizado regularmente com novas funcionalidades e melhorias.

/**
 * Admin JavaScript - Painel de Administração CDA Digital
 * Funções comuns a todas as páginas do painel admin
 */

// Inicializar sidebar
function initSidebar() {
    const sidebar = document.getElementById('admin-sidebar');
    const toggleBtn = document.getElementById('sidebar-toggle');
    const mobileToggleBtn = document.getElementById('mobile-menu-toggle');
    const main = document.querySelector('.admin-main');
    
    if (!sidebar || !toggleBtn || !main) return;
    
    // Toggle sidebar
    toggleBtn.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        main.classList.toggle('sidebar-collapsed');
    });
    
    // Mobile menu toggle
    if (mobileToggleBtn) {
        mobileToggleBtn.addEventListener('click', function() {
            sidebar.classList.toggle('mobile-open');
        });
    }
    
    // Fechar sidebar ao clicar fora (mobile)
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !mobileToggleBtn.contains(e.target)) {
                sidebar.classList.remove('mobile-open');
            }
        }
    });
    
    // Dropdown menus
    const dropdowns = document.querySelectorAll('.admin-sidebar-dropdown');
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.admin-sidebar-dropdown-menu');
        
        if (toggle && menu) {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Fechar outros dropdowns
                dropdowns.forEach(other => {
                    if (other !== dropdown) {
                        other.querySelector('.admin-sidebar-dropdown-menu').classList.remove('open');
                        other.querySelector('.dropdown-toggle').classList.remove('active');
                    }
                });
                
                // Toggle current
                menu.classList.toggle('open');
                toggle.classList.toggle('active');
            });
        }
    });
    
    // Fechar dropdowns ao clicar fora
    document.addEventListener('click', function(e) {
        dropdowns.forEach(dropdown => {
            const menu = dropdown.querySelector('.admin-sidebar-dropdown-menu');
            const toggle = dropdown.querySelector('.dropdown-toggle');
            
            if (menu && toggle && !dropdown.contains(e.target)) {
                menu.classList.remove('open');
                toggle.classList.remove('active');
            }
        });
    });
    
    // Atualizar menu ativo
    const menuLinks = document.querySelectorAll('.admin-sidebar-menu-link');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Inicializar ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    // Verificar autenticação
    if (sessionStorage.getItem('cda_admin_logged') !== 'true') {
        // Redirecionar para login, exceto se já estiver na página de login
        if (!window.location.pathname.includes('login.html')) {
            window.location.href = 'login.html';
        }
        return;
    }
    
    // Inicializar sidebar
    initSidebar();
    
    // Atualizar nome do utilizador no sidebar
    const userName = sessionStorage.getItem('cda_admin_user') || 'Administrador';
    const userRole = sessionStorage.getItem('cda_admin_role') || 'Admin';
    
    const sidebarUserName = document.getElementById('admin-user-name');
    const sidebarUserRole = document.querySelector('.admin-user-role');
    
    if (sidebarUserName) {
        sidebarUserName.textContent = userName;
    }
    if (sidebarUserRole) {
        sidebarUserRole.textContent = userRole;
    }
    
    // Atualizar header user
    const headerUserName = document.querySelector('.admin-header-user-name');
    const headerUserAvatar = document.querySelector('.admin-header-user-avatar');
    
    if (headerUserName) {
        headerUserName.textContent = userName;
    }
    if (headerUserAvatar) {
        headerUserAvatar.textContent = userName.split(' ').map(n => n[0]).join('').toUpperCase();
    }
});

// Função de logout
function logout() {
    sessionStorage.removeItem('cda_admin_logged');
    sessionStorage.removeItem('cda_admin_user');
    sessionStorage.removeItem('cda_admin_role');
    sessionStorage.removeItem('cda_admin_user_id');
    window.location.href = 'login.html';
}

// Função para mostrar notificações
function showNotification(message, type = 'info', duration = 5000) {
    const notifications = document.getElementById('notifications');
    if (!notifications) return;
    
    const notification = document.createElement('div');
    notification.className = `admin-notification ${type}`;
    
    let iconSvg = '';
    switch (type) {
        case 'success':
            iconSvg = '<polyline points="20,6 9,17 4,12"/>';
            break;
        case 'error':
            iconSvg = '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>';
            break;
        case 'warning':
            iconSvg = '<circle cx="12" cy="12" r="10"/><line x1="12" y1="6" x2="12" y2="12"/><line x1="12" y1="18" x2="12.01" y2="18"/>';
            break;
        default:
            iconSvg = '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>';
    }
    
    notification.innerHTML = `
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            ${iconSvg}
        </svg>
        <span class="admin-notification-message">${message}</span>
        <button class="admin-notification-close" onclick="this.parentNode.remove()">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
        </button>
    `;
    
    notifications.appendChild(notification);
    
    // Remover após duration
    setTimeout(() => {
        notification.remove();
    }, duration);
}

// Função debounce para pesquisa
tfunction debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Funções para mostrar/esconder erros
function showError(id, message) {
    const el = document.getElementById(id);
    if (el) {
        el.textContent = message;
        el.classList.add('show');
    }
}

function hideError(id) {
    const el = document.getElementById(id);
    if (el) {
        el.textContent = '';
        el.classList.remove('show');
    }
}

// Validar email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Format date
function formatDate(date) {
    if (!date) return '-';
    const d = new Date(date);
    return d.toLocaleDateString('pt-PT');
}

// Format date with time
function formatDateTime(date) {
    if (!date) return '-';
    const d = new Date(date);
    return d.toLocaleString('pt-PT', { dateStyle: 'short', timeStyle: 'short' });
}

// Inicializar tooltips (se existir biblioteca)
function initTooltips() {
    // Implementar tooltips se necessário
}

// Função para copiar texto para clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copiado para clipboard!', 'success');
    }).catch(err => {
        showNotification('Erro ao copiar: ' + err, 'error');
    });
}

// Função para exportar dados para CSV
tfunction exportToCSV(data, filename = 'export.csv') {
    if (!data || data.length === 0) {
        showNotification('Nenhum dado para exportar!', 'warning');
        return;
    }
    
    // Converter para CSV
    let csv = '';
    
    // Header
    const headers = Object.keys(data[0]);
    csv += headers.join(',') + '\n';
    
    // Data
    data.forEach(row => {
        const values = headers.map(header => {
            let value = row[header];
            if (value === undefined || value === null) {
                value = '';
            } else if (typeof value === 'object') {
                value = JSON.stringify(value);
            }
            // Escapar vírgulas e aspas
            if (typeof value === 'string') {
                value = value.replace(/"/g, '""');
                if (value.includes(',') || value.includes('"') || value.includes('\n')) {
                    value = `"${value}"`;
                }
            }
            return value;
        });
        csv += values.join(',') + '\n';
    });
    
    // Download
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showNotification('Exportação concluída!', 'success');
}

// Função para gerar PDF (simplificada)
function exportToPDF() {
    showNotification('Funcionalidade de exportação para PDF em desenvolvimento', 'info');
}

// Função para verificar se o utilizador tem permissão
function hasPermission(requiredPermission) {
    const userRole = sessionStorage.getItem('cda_admin_role') || 'Visualizador';
    
    const permissions = {
        Admin: ['read', 'write', 'delete', 'settings'],
        Editor: ['read', 'write'],
        Visualizador: ['read']
    };
    
    return permissions[userRole] && permissions[userRole].includes(requiredPermission);
}

// Função para verificar se é admin
function isAdmin() {
    const userRole = sessionStorage.getItem('cda_admin_role') || 'Visualizador';
    return userRole === 'Admin';
}

// Inicializar contadores animados
function animateCounter(elementId, target, duration = 1000) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Inicializar todos os contadores na página
function initCounters() {
    const counters = document.querySelectorAll('.admin-stat-value');
    counters.forEach(counter => {
        const target = parseInt(counter.textContent) || 0;
        if (target > 0) {
            animateCounter(counter.id, target);
        }
    });
}

// Função para mostrar loading
function showLoading(elementId = null) {
    if (elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = '<div class="admin-loading"><div class="admin-loading-spinner"></div></div>';
        }
    } else {
        // Mostrar loading global
        const overlay = document.createElement('div');
        overlay.className = 'admin-loading-overlay';
        overlay.innerHTML = '<div class="admin-loading"><div class="admin-loading-spinner"></div></div>';
        document.body.appendChild(overlay);
    }
}

// Função para esconder loading
function hideLoading(elementId = null) {
    if (elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = '';
        }
    } else {
        // Esconder loading global
        const overlay = document.querySelector('.admin-loading-overlay');
        if (overlay) {
            overlay.remove();
        }
    }
}

// Adicionar estilos de loading
const loadingStyles = `
    <style>
        .admin-loading {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100px;
        }
        
        .admin-loading-spinner {
            width: 40px;
            height: 40px;
            border: 4px solid var(--color-neutral-200);
            border-top-color: var(--color-primary);
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        .admin-loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255, 255, 255, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        }
    </style>
`;

// Adicionar estilos ao DOM
const styleElement = document.createElement('div');
styleElement.innerHTML = loadingStyles;
document.head.appendChild(styleElement);

// Função para lidar com erros de API
function handleApiError(error, customMessage = null) {
    let message = customMessage || 'Ocorreu um erro. Por favor, tente novamente.';
    
    if (error.response) {
        // Erro com resposta do servidor
        if (error.response.status === 401) {
            message = 'Sessão expirada. Por favor, faça login novamente.';
            setTimeout(() => {
                logout();
            }, 2000);
        } else if (error.response.status === 403) {
            message = 'Não tem permissão para executar esta ação.';
        } else if (error.response.status === 404) {
            message = 'Recurso não encontrado.';
        } else if (error.response.data && error.response.data.message) {
            message = error.response.data.message;
        }
    } else if (error.request) {
        // Erro sem resposta
        message = 'Não foi possível conectar ao servidor. Verifique a sua conexão.';
    }
    
    showNotification(message, 'error');
}

// Função para formatar moeda
function formatCurrency(value, currency = 'MZN') {
    if (value === undefined || value === null) return '-';
    
    const number = parseFloat(value) || 0;
    return new Intl.NumberFormat('pt-PT', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(number);
}

// Função para formatar número
function formatNumber(value) {
    if (value === undefined || value === null) return '-';
    
    const number = parseFloat(value) || 0;
    return new Intl.NumberFormat('pt-PT').format(number);
}

// Função para trunca texto
function truncateText(text, maxLength) {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

// Função para gerar ID único
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

// Função para gerar slug
function generateSlug(text) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

// Função para validar URL
function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
}

// Função para validar número de telefone
function isValidPhone(phone) {
    const re = /^\+?[0-9\s\-\(\)]{8,}$/;
    return re.test(phone);
}

// Exportar funções para uso global
window.showNotification = showNotification;
window.debounce = debounce;
window.showError = showError;
window.hideError = hideError;
window.validateEmail = validateEmail;
window.formatDate = formatDate;
window.formatDateTime = formatDateTime;
window.copyToClipboard = copyToClipboard;
window.exportToCSV = exportToCSV;
window.exportToPDF = exportToPDF;
window.hasPermission = hasPermission;
window.isAdmin = isAdmin;
window.logout = logout;
window.showLoading = showLoading;
window.hideLoading = hideLoading;
window.handleApiError = handleApiError;
window.formatCurrency = formatCurrency;
window.formatNumber = formatNumber;
window.truncateText = truncateText;
window.generateId = generateId;
window.generateSlug = generateSlug;
window.isValidUrl = isValidUrl;
window.isValidPhone = isValidPhone;

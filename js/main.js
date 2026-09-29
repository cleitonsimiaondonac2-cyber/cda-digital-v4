/**
 * CDA Digital - Main JavaScript
 * Funcionalidades principais do site
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todos os componentes
    initNavigation();
    initBackToTop();
    initScrollAnimations();
    initMobileMenu();
    initDropdowns();
    initFormValidation();
});

/**
 * Navegação principal
 */
function initNavigation() {
    const nav = document.querySelector('.nav');
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (!nav || !navToggle || !navList) return;

    // Alternar menu mobile
    navToggle.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        navList.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-link, .dropdown-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navToggle.setAttribute('aria-expanded', 'false');
                navList.classList.remove('active');
            }
        });
    });
}

/**
 * Botão de voltar ao topo
 */
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    if (!backToTop) return;

    let scrollTimeout;

    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        
        if (window.scrollY > 300) {
            backToTop.hidden = false;
        } else {
            scrollTimeout = setTimeout(() => {
                backToTop.hidden = true;
            }, 500);
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Animações de scroll
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.scroll-animate');
    if (animatedElements.length === 0) return;

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Adicionar classe de animação específica
                const animationType = entry.target.dataset.animation;
                if (animationType) {
                    entry.target.classList.add(`animate-${animationType}`);
                }
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });

    // Adicionar estilos de animação
    addAnimationStyles();
}

function addAnimationStyles() {
    if (document.getElementById('scroll-animation-styles')) return;

    const style = document.createElement('style');
    style.id = 'scroll-animation-styles';
    style.textContent = `
        .scroll-animate {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .scroll-animate.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .scroll-animate.visible.animate-fade-in {
            animation: fadeIn 0.6s ease forwards;
        }
        
        .scroll-animate.visible.animate-fade-in-up {
            animation: fadeInUp 0.6s ease forwards;
        }
        
        .scroll-animate.visible.animate-fade-in-down {
            animation: fadeInDown 0.6s ease forwards;
        }
        
        .scroll-animate.visible.animate-slide-in-left {
            animation: slideInLeft 0.6s ease forwards;
        }
        
        .scroll-animate.visible.animate-slide-in-right {
            animation: slideInRight 0.6s ease forwards;
        }
        
        .scroll-animate.visible.animate-scale-in {
            animation: scaleIn 0.6s ease forwards;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeInDown {
            from {
                opacity: 0;
                transform: translateY(-30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes scaleIn {
            from {
                opacity: 0;
                transform: scale(0.9);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Menu Mobile
 */
function initMobileMenu() {
    // Já tratado em initNavigation
}

/**
 * Dropdowns
 */
function initDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (!toggle || !menu) return;

        // Mobile: clicar para abrir/fechar
        if (window.innerWidth <= 768) {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                this.setAttribute('aria-expanded', !isExpanded);
                menu.style.display = isExpanded ? 'none' : 'block';
            });
        }

        // Desktop: hover para abrir
        if (window.innerWidth > 768) {
            dropdown.addEventListener('mouseenter', function() {
                toggle.setAttribute('aria-expanded', 'true');
                menu.style.display = 'block';
            });
            
            dropdown.addEventListener('mouseleave', function() {
                toggle.setAttribute('aria-expanded', 'false');
                menu.style.display = 'none';
            });
        }
    });
}

/**
 * Validação de Formulários
 */
function initFormValidation() {
    const forms = document.querySelectorAll('[data-validate]');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            
            const requiredFields = this.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    
                    // Remover erro ao focar
                    field.addEventListener('focus', function() {
                        this.classList.remove('error');
                    }, { once: true });
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                // Focar no primeiro campo com erro
                const firstError = this.querySelector('[required].error');
                if (firstError) {
                    firstError.focus();
                }
            }
        });
    });

/**
 * Funções utilitárias
 */

// Debounce function
function debounce(func, wait) {
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

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Inicialização para elementos dinâmicos
 */

// Função para inicializar tooltips
function initTooltips() {
    const tooltips = document.querySelectorAll('[data-tooltip]');
    
    tooltips.forEach(element => {
        const tooltipText = element.dataset.tooltip;
        const tooltip = document.createElement('span');
        tooltip.className = 'tooltip';
        tooltip.textContent = tooltipText;
        
        const wrapper = document.createElement('span');
        wrapper.className = 'tooltip-wrapper';
        wrapper.appendChild(element.cloneNode(true));
        wrapper.appendChild(tooltip);
        
        element.parentNode.replaceChild(wrapper, element);
    });
}

// Função para inicializar tabs
function initTabs() {
    const tabs = document.querySelectorAll('.tabs');
    
    tabs.forEach(tabContainer => {
        const tabBtns = tabContainer.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.dataset.tab;
                
                // Remover classe active de todos
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                // Adicionar classe active ao clicado
                btn.classList.add('active');
                
                // Mostrar conteúdo correspondente
                const targetContent = document.getElementById(targetId);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
        
        // Ativar primeiro tab por padrão
        if (tabBtns.length > 0) {
            tabBtns[0].classList.add('active');
            const firstContent = document.querySelector('.tab-content');
            if (firstContent) {
                firstContent.classList.add('active');
            }
        }
    });
}

// Função para inicializar accordions
function initAccordions() {
    const accordions = document.querySelectorAll('.accordion');
    
    accordions.forEach(accordion => {
        const items = accordion.querySelectorAll('.accordion-item');
        
        items.forEach(item => {
            const header = item.querySelector('.accordion-header');
            const content = item.querySelector('.accordion-content');
            
            if (!header || !content) return;
            
            header.addEventListener('click', () => {
                const isExpanded = header.getAttribute('aria-expanded') === 'true';
                
                // Fechar todos os outros
                items.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
                    }
                });
                
                // Alternar item clicado
                item.classList.toggle('active');
                header.setAttribute('aria-expanded', !isExpanded);
            });
        });
    });
}

/**
 * Carregar mais conteúdo (para listas longas)
 */
function loadMoreContent() {
    const loadMoreBtns = document.querySelectorAll('.load-more-btn');
    
    loadMoreBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.target;
            const container = document.querySelector(target);
            const hiddenItems = container.querySelectorAll('.hidden-item');
            const itemsToShow = Math.min(hiddenItems.length, 4);
            
            for (let i = 0; i < itemsToShow; i++) {
                hiddenItems[i].classList.remove('hidden-item');
                hiddenItems[i].style.display = '';
            }
            
            // Esconder botão se não houver mais itens
            if (hiddenItems.length <= itemsToShow) {
                btn.style.display = 'none';
            }
        });
    });
}

/**
 * Inicializar tudo
 */

// Inicializar ao carregar
window.addEventListener('load', function() {
    initTabs();
    initAccordions();
    initTooltips();
    loadMoreContent();
});

// Re-inicializar ao redimensionar
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        initDropdowns();
    }, 250);
});

/**
 * Exportar funções para uso em outros scripts
 */
window.CDA = window.CDA || {};
window.CDA.initTabs = initTabs;
window.CDA.initAccordions = initAccordions;
window.CDA.initTooltips = initTooltips;
window.CDA.debounce = debounce;
window.CDA.throttle = throttle;

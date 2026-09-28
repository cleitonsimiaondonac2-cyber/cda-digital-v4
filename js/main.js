/**
 * CDA Digital V4 - JavaScript Principal
 * =================================
 * 
 * Este arquivo contém as funcionalidades principais do portal CDA Digital V4
 */

// ============================================
// DOM Content Loaded
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initMobileMenu();
    initSearch();
    initScrollEffects();
    initAnimatedNumbers();
    initModals();
    initTooltips();
    initAccordions();
    initTabs();
    initBackToTop();
    initHeroSlider();
    initTicker();
    initPartnersCarousel();
    initFormValidation();
});

// ============================================
// Navigation
// ============================================

function initNavigation() {
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath) {
            link.classList.add('active');
        }
    });
    
    // Dropdown functionality
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!toggle.contains(e.target)) {
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
}

// ============================================
// Mobile Menu
// ============================================

function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (navToggle && navList) {
        navToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navList.contains(e.target)) {
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

// ============================================
// Search
// ============================================

function initSearch() {
    const searchToggle = document.querySelector('.search-toggle');
    const searchForm = document.querySelector('.search-form');
    
    if (searchToggle && searchForm) {
        searchToggle.addEventListener('click', function(e) {
            e.preventDefault();
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            
            if (!isExpanded) {
                const searchInput = searchForm.querySelector('.search-input');
                if (searchInput) {
                    setTimeout(() => {
                        searchInput.focus();
                    }, 200);
                }
            }
        });
        
        // Close search when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchToggle.contains(e.target) && !searchForm.contains(e.target)) {
                searchToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

// ============================================
// Scroll Effects
// ============================================

function initScrollEffects() {
    const header = document.querySelector('.header');
    const topbar = document.querySelector('.topbar');
    const backToTop = document.querySelector('.back-to-top');
    
    // Header shadow on scroll
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add shadow to header on scroll
        if (currentScroll > 10) {
            if (header) header.classList.add('header-shadow');
        } else {
            if (header) header.classList.remove('header-shadow');
        }
        
        // Show/hide back to top button
        if (backToTop) {
            if (currentScroll > 300) {
                backToTop.hidden = false;
            } else {
                backToTop.hidden = true;
            }
        }
        
        // Hide header on scroll down, show on scroll up
        if (currentScroll > 100) {
            if (currentScroll > lastScroll) {
                // Scrolling down
                if (header) header.style.transform = 'translateY(-100%)';
                if (topbar) topbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                if (header) header.style.transform = 'translateY(0)';
                if (topbar) topbar.style.transform = 'translateY(0)';
            }
        } else {
            if (header) header.style.transform = 'translateY(0)';
            if (topbar) topbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}

// ============================================
// Animated Numbers (Counter)
// ============================================

function initAnimatedNumbers() {
    const numberElements = document.querySelectorAll('.number-value[data-target]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetValue = parseInt(target.dataset.target);
                animateNumber(target, targetValue);
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    numberElements.forEach(el => observer.observe(el));
}

function animateNumber(element, target) {
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out-cubic)
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (target - start) * easeOutCubic);
        
        element.textContent = current.toLocaleString('pt-PT');
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// ============================================
// Modals
// ============================================

function initModals() {
    const modalTriggers = document.querySelectorAll('[data-modal-trigger]');
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.dataset.modalTrigger;
            const modal = document.getElementById(modalId);
            const overlay = modal?.closest('.modal-overlay');
            
            if (overlay) {
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                // Focus trap
                const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                const firstFocusable = focusableElements[0];
                const lastFocusable = focusableElements[focusableElements.length - 1];
                
                firstFocusable?.focus();
                
                modal.addEventListener('keydown', function(e) {
                    if (e.key === 'Tab') {
                        if (e.shiftKey && document.activeElement === firstFocusable) {
                            lastFocusable.focus();
                            e.preventDefault();
                        } else if (!e.shiftKey && document.activeElement === lastFocusable) {
                            firstFocusable.focus();
                            e.preventDefault();
                        }
                    }
                    
                    if (e.key === 'Escape') {
                        closeModal(overlay);
                    }
                }, { once: true });
            }
        });
    });
    
    // Close modal handlers
    const modalCloses = document.querySelectorAll('.modal-close');
    modalCloses.forEach(close => {
        close.addEventListener('click', function() {
            const modal = this.closest('.modal');
            const overlay = modal?.closest('.modal-overlay');
            closeModal(overlay);
        });
    });
    
    // Close modal on overlay click
    const modalOverlays = document.querySelectorAll('.modal-overlay');
    modalOverlays.forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                closeModal(overlay);
            }
        });
    });
}

function closeModal(overlay) {
    if (overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ============================================
// Tooltips
// ============================================

function initTooltips() {
    const tooltips = document.querySelectorAll('.tooltip');
    
    tooltips.forEach(tooltip => {
        const tooltipContent = tooltip.querySelector('.tooltip-content');
        
        tooltip.addEventListener('mouseenter', function() {
            if (tooltipContent) {
                tooltipContent.style.opacity = '1';
                tooltipContent.style.visibility = 'visible';
            }
        });
        
        tooltip.addEventListener('mouseleave', function() {
            if (tooltipContent) {
                tooltipContent.style.opacity = '0';
                tooltipContent.style.visibility = 'hidden';
            }
        });
        
        // Keyboard support
        tooltip.addEventListener('focus', function() {
            if (tooltipContent) {
                tooltipContent.style.opacity = '1';
                tooltipContent.style.visibility = 'visible';
            }
        });
        
        tooltip.addEventListener('blur', function() {
            if (tooltipContent) {
                tooltipContent.style.opacity = '0';
                tooltipContent.style.visibility = 'hidden';
            }
        });
    });
}

// ============================================
// Accordions
// ============================================

function initAccordions() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.closest('.accordion-item');
            const isExpanded = accordionItem.getAttribute('aria-expanded') === 'true';
            
            // Close all other accordions in the same group
            const accordion = this.closest('.accordion');
            if (accordion) {
                const allItems = accordion.querySelectorAll('.accordion-item');
                allItems.forEach(item => {
                    if (item !== accordionItem) {
                        item.setAttribute('aria-expanded', 'false');
                    }
                });
            }
            
            // Toggle current accordion
            accordionItem.setAttribute('aria-expanded', !isExpanded);
        });
        
        // Keyboard support
        header.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// ============================================
// Tabs
// ============================================

function initTabs() {
    const tabButtons = document.querySelectorAll('.tabs-button');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabs = this.closest('.tabs');
            const tabId = this.dataset.tabId;
            
            if (tabs) {
                // Update button states
                const allButtons = tabs.querySelectorAll('.tabs-button');
                allButtons.forEach(btn => {
                    btn.setAttribute('aria-selected', btn === this);
                });
                
                // Update panel states
                const allPanels = tabs.querySelectorAll('.tab-panel');
                allPanels.forEach(panel => {
                    panel.setAttribute('aria-expanded', panel.dataset.tabId === tabId);
                });
            }
        });
        
        // Keyboard support
        button.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                e.preventDefault();
                const tabs = this.closest('.tabs');
                const allButtons = tabs?.querySelectorAll('.tabs-button');
                if (allButtons) {
                    const currentIndex = Array.from(allButtons).indexOf(this);
                    let nextIndex;
                    
                    if (e.key === 'ArrowRight') {
                        nextIndex = (currentIndex + 1) % allButtons.length;
                    } else {
                        nextIndex = (currentIndex - 1 + allButtons.length) % allButtons.length;
                    }
                    
                    allButtons[nextIndex].focus();
                    allButtons[nextIndex].click();
                }
            }
        });
    });
}

// ============================================
// Back to Top
// ============================================

function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    
    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Keyboard support
        backToTop.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }
}

// ============================================
// Hero Slider
// ============================================

function initHeroSlider() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const slides = hero.querySelectorAll('.hero-slide');
    const dots = hero.querySelectorAll('.hero-dot');
    const prevBtn = hero.querySelector('.hero-nav-prev');
    const nextBtn = hero.querySelector('.hero-nav-next');
    
    if (slides.length <= 1) return;
    
    let currentIndex = 0;
    let intervalId;
    const intervalTime = 7000;
    
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Show current slide
        slides[index].classList.add('active');
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
            dot.setAttribute('aria-current', i === index);
        });
        
        currentIndex = index;
    }
    
    function nextSlide() {
        const nextIndex = (currentIndex + 1) % slides.length;
        showSlide(nextIndex);
    }
    
    function prevSlide() {
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    }
    
    // Auto-advance
    function startAutoSlide() {
        intervalId = setInterval(nextSlide, intervalTime);
    }
    
    function stopAutoSlide() {
        if (intervalId) {
            clearInterval(intervalId);
        }
    }
    
    // Initialize
    showSlide(0);
    startAutoSlide();
    
    // Event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
        prevBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                prevSlide();
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
        nextBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                nextSlide();
            }
        });
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
        dot.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                showSlide(index);
            }
        });
    });
    
    // Pause on hover
    hero.addEventListener('mouseenter', stopAutoSlide);
    hero.addEventListener('mouseleave', startAutoSlide);
    
    // Pause on focus
    hero.addEventListener('focusin', stopAutoSlide);
    hero.addEventListener('focusout', startAutoSlide);
    
    // Keyboard navigation
    hero.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
    
    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;
    
    hero.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    hero.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }
    
    // Visibility API - pause when tab is not visible
    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'hidden') {
            stopAutoSlide();
        } else {
            startAutoSlide();
        }
    });
}

// ============================================
// Ticker (Flash CDA)
// ============================================

function initTicker() {
    const ticker = document.querySelector('.flash-ticker');
    if (!ticker) return;
    
    const tickerContent = ticker.querySelector('.ticker-content');
    const tickerTracks = tickerContent?.querySelectorAll('.ticker-track');
    const pauseBtn = ticker.querySelector('.ticker-pause');
    
    if (!tickerTracks || tickerTracks.length === 0) return;
    
    let isPaused = false;
    
    function togglePause() {
        isPaused = !isPaused;
        tickerTracks.forEach(track => {
            track.style.animationPlayState = isPaused ? 'paused' : 'running';
        });
        
        if (pauseBtn) {
            pauseBtn.setAttribute('aria-label', isPaused ? 'Retomar ticker' : 'Pausar ticker');
            pauseBtn.innerHTML = isPaused ? `
                <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5,3 19,12 5,21"/>
                </svg>
            ` : `
                <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16"/>
                    <rect x="14" y="4" width="4" height="16"/>
                </svg>
            `;
        }
    }
    
    if (pauseBtn) {
        pauseBtn.addEventListener('click', togglePause);
        pauseBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                togglePause();
            }
        });
    }
    
    // Pause on hover
    tickerContent.addEventListener('mouseenter', () => {
        if (!isPaused) {
            tickerTracks.forEach(track => {
                track.style.animationPlayState = 'paused';
            });
        }
    });
    
    tickerContent.addEventListener('mouseleave', () => {
        if (!isPaused) {
            tickerTracks.forEach(track => {
                track.style.animationPlayState = 'running';
            });
        }
    });
    
    // Reduced motion support
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        tickerTracks.forEach(track => {
            track.style.animation = 'none';
        });
    }
}

// ============================================
// Partners Carousel
// ============================================

function initPartnersCarousel() {
    const carousel = document.querySelector('.partners-carousel');
    if (!carousel) return;
    
    const track = carousel.querySelector('.partners-track');
    const prevBtn = carousel.querySelector('.partners-prev');
    const nextBtn = carousel.querySelector('.partners-next');
    const pauseBtn = carousel.querySelector('.partners-pause');
    
    if (!track) return;
    
    const items = track.querySelectorAll('.partner-card');
    if (items.length === 0) return;
    
    let isPaused = false;
    let intervalId;
    const intervalTime = 5000;
    
    function scrollToItem(index) {
        const item = items[index];
        if (item) {
            const itemLeft = item.offsetLeft;
            const trackWidth = track.scrollWidth;
            const carouselWidth = carousel.clientWidth;
            
            // Calculate scroll position to center the item
            let scrollLeft = itemLeft - (carouselWidth / 2) + (item.clientWidth / 2);
            
            // Clamp scroll position
            scrollLeft = Math.max(0, Math.min(scrollLeft, trackWidth - carouselWidth));
            
            track.scrollTo({
                left: scrollLeft,
                behavior: 'smooth'
            });
        }
    }
    
    function nextItem() {
        const visibleItems = getVisibleItems();
        const lastVisibleIndex = visibleItems[visibleItems.length - 1];
        const nextIndex = (lastVisibleIndex + 1) % items.length;
        scrollToItem(nextIndex);
    }
    
    function prevItem() {
        const visibleItems = getVisibleItems();
        const firstVisibleIndex = visibleItems[0];
        const prevIndex = (firstVisibleIndex - 1 + items.length) % items.length;
        scrollToItem(prevIndex);
    }
    
    function getVisibleItems() {
        const carouselRect = carousel.getBoundingClientRect();
        const visibleIndices = [];
        
        items.forEach((item, index) => {
            const itemRect = item.getBoundingClientRect();
            if (itemRect.right > carouselRect.left && itemRect.left < carouselRect.right) {
                visibleIndices.push(index);
            }
        });
        
        return visibleIndices;
    }
    
    function togglePause() {
        isPaused = !isPaused;
        
        if (isPaused) {
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
        } else {
            intervalId = setInterval(nextItem, intervalTime);
        }
        
        if (pauseBtn) {
            pauseBtn.setAttribute('aria-label', isPaused ? 'Retomar carrossel' : 'Pausar carrossel');
            pauseBtn.innerHTML = isPaused ? `
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="5,3 19,12 5,21"/>
                </svg>
            ` : `
                <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16"/>
                    <rect x="14" y="4" width="4" height="16"/>
                </svg>
            `;
        }
    }
    
    // Initialize
    if (prevBtn) {
        prevBtn.addEventListener('click', prevItem);
        prevBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                prevItem();
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextItem);
        nextBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                nextItem();
            }
        });
    }
    
    if (pauseBtn) {
        pauseBtn.addEventListener('click', togglePause);
        pauseBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                togglePause();
            }
        });
    }
    
    // Auto-advance
    intervalId = setInterval(nextItem, intervalTime);
    
    // Pause on hover
    carousel.addEventListener('mouseenter', () => {
        if (!isPaused) {
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
        }
    });
    
    carousel.addEventListener('mouseleave', () => {
        if (!isPaused) {
            intervalId = setInterval(nextItem, intervalTime);
        }
    });
    
    // Reduced motion support
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        if (intervalId) {
            clearInterval(intervalId);
        }
    }
}

// ============================================
// Form Validation
// ============================================

function initFormValidation() {
    const forms = document.querySelectorAll('form[data-validate]');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            
            // Validate required fields
            const requiredFields = form.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    setError(field, 'Este campo é obrigatório');
                } else {
                    clearError(field);
                }
            });
            
            // Validate email fields
            const emailFields = form.querySelectorAll('[type="email"]');
            emailFields.forEach(field => {
                if (field.value && !validateEmail(field.value)) {
                    isValid = false;
                    setError(field, 'Por favor, introduza um endereço de email válido');
                } else {
                    clearError(field);
                }
            });
            
            // Validate phone fields
            const phoneFields = form.querySelectorAll('[type="tel"]');
            phoneFields.forEach(field => {
                if (field.value && !validatePhone(field.value)) {
                    isValid = false;
                    setError(field, 'Por favor, introduza um número de telefone válido');
                } else {
                    clearError(field);
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                // Focus on first error
                const firstError = form.querySelector('.error-message');
                if (firstError) {
                    const input = firstError.previousElementSibling;
                    if (input) input.focus();
                }
            }
        });
        
        // Clear error on input
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                clearError(this);
            });
            
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    setError(this, 'Este campo é obrigatório');
                }
            });
        });
    });
}

function setError(field, message) {
    field.classList.add('error');
    field.setAttribute('aria-invalid', 'true');
    
    let errorMessage = field.nextElementSibling;
    if (!errorMessage || !errorMessage.classList.contains('error-message')) {
        errorMessage = document.createElement('span');
        errorMessage.className = 'error-message';
        field.parentNode.insertBefore(errorMessage, field.nextSibling);
    }
    
    errorMessage.textContent = message;
    errorMessage.style.color = 'var(--color-error)';
    errorMessage.style.fontSize = 'var(--text-xs)';
    errorMessage.style.marginTop = 'var(--space-1)';
    errorMessage.style.display = 'block';
}

function clearError(field) {
    field.classList.remove('error');
    field.setAttribute('aria-invalid', 'false');
    
    const errorMessage = field.nextElementSibling;
    if (errorMessage && errorMessage.classList.contains('error-message')) {
        errorMessage.textContent = '';
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    // Simple validation for Mozambican and international numbers
    const re = /^\+?[\d\s-]{8,}$/;
    return re.test(phone);
}

// ============================================
// Utility Functions
// ============================================

// Debounce function for performance optimization
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

// Throttle function for scroll events
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

// Format date for display
function formatDate(dateString) {
    const options = { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('pt-PT', options).toUpperCase();
}

// Format number with locale
function formatNumber(number) {
    return number.toLocaleString('pt-PT');
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ============================================
// Export Functions (for other modules)
// ============================================

window.CDA = window.CDA || {};
window.CDA.Utils = {
    formatDate,
    formatNumber,
    debounce,
    throttle,
    isInViewport,
    setError,
    clearError,
    validateEmail,
    validatePhone
};

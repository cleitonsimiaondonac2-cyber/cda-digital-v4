/**
 * CDA Digital V4 - JavaScript da Homepage
 * ==========================================
 * 
 * Este arquivo contém as funcionalidades específicas da homepage
 */

// ============================================
// DOM Content Loaded
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initVerificationForm();
    initAskForm();
    initNewsCards();
    initLazyLoading();
    initScrollAnimations();
    initIntersectionObserver();
});

// ============================================
// Verification Form
// ============================================

function initVerificationForm() {
    const verifyForm = document.getElementById('verify-form');
    const verifyResult = document.getElementById('verify-result');
    const verifyResultBody = document.getElementById('verify-result-body');
    const verifyDate = document.getElementById('verify-date');
    
    if (!verifyForm || !verifyResult || !verifyResultBody) return;
    
    verifyForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const codeInput = document.getElementById('verify-code');
        const verifyType = document.querySelector('input[name="verify-type"]:checked');
        
        if (!codeInput || !codeInput.value.trim()) {
            window.CDA.Utils.setError(codeInput, 'Por favor, introduza um código, nome ou número de cédula');
            return;
        }
        
        window.CDA.Utils.clearError(codeInput);
        
        // Simulate API call (replace with actual API call)
        simulateVerification(codeInput.value, verifyType?.value || 'professional')
            .then(data => {
                displayVerificationResult(data, verifyResult, verifyResultBody, verifyDate);
            })
            .catch(error => {
                displayVerificationError(error, verifyResult, verifyResultBody);
            });
    });
    
    // Clear result when input changes
    const codeInput = document.getElementById('verify-code');
    if (codeInput) {
        codeInput.addEventListener('input', function() {
            if (!verifyResult.hidden) {
                verifyResult.hidden = true;
            }
        });
    }
}

function simulateVerification(query, type) {
    return new Promise((resolve, reject) => {
        // Simulate network delay
        setTimeout(() => {
            // Mock data - replace with actual API call
            const mockData = {
                professional: {
                    '000100010912': {
                        name: 'Carlos F. Filomeno de Gama Afonso',
                        code: '000100010912',
                        cedula: 'DESP / 001 / DGA / 03',
                        status: 'REGISTADO',
                        delegation: 'Sul - Maputo',
                        category: 'Despachante Aduaneiro',
                        registrationDate: '2011-09-16',
                        expiryDate: '2027-09-16'
                    },
                    'Carlos': {
                        name: 'Carlos F. Filomeno de Gama Afonso',
                        code: '000100010912',
                        cedula: 'DESP / 001 / DGA / 03',
                        status: 'REGISTADO',
                        delegation: 'Sul - Maputo',
                        category: 'Despachante Aduaneiro',
                        registrationDate: '2011-09-16',
                        expiryDate: '2027-09-16'
                    },
                    'DESP / 001 / DGA / 03': {
                        name: 'Carlos F. Filomeno de Gama Afonso',
                        code: '000100010912',
                        cedula: 'DESP / 001 / DGA / 03',
                        status: 'REGISTADO',
                        delegation: 'Sul - Maputo',
                        category: 'Despachante Aduaneiro',
                        registrationDate: '2011-09-16',
                        expiryDate: '2027-09-16'
                    }
                },
                company: {
                    'CDA Serviços': {
                        name: 'CDA Serviços, Lda',
                        code: 'COMP-001',
                        status: 'ACTIVA',
                        registrationDate: '2015-01-01',
                        linkedProfessionals: ['000100010912', '000100010913']
                    }
                },
                document: {
                    'CIRC-2026-001': {
                        title: 'Circular nº 001/2026',
                        type: 'Circular',
                        date: '2026-01-15',
                        status: 'VÁLIDO',
                        reference: 'AT/2026/CIRC/001'
                    }
                }
            };
            
            // Check if query exists in mock data
            if (mockData[type] && mockData[type][query]) {
                const data = mockData[type][query];
                data.type = type;
                data.query = query;
                data.lastUpdated = new Date().toISOString().split('T')[0];
                resolve(data);
            } else {
                reject({ message: 'Nenhum registo encontrado com os critérios especificados.' });
            }
        }, 500);
    });
}

function displayVerificationResult(data, resultEl, bodyEl, dateEl) {
    // Update result header based on status
    const resultHeader = resultEl.querySelector('.verify-result-header');
    const resultIcon = resultHeader?.querySelector('.icon');
    const resultTitle = resultHeader?.querySelector('h3');
    
    if (resultIcon) {
        resultIcon.className = 'icon icon-success';
        resultIcon.innerHTML = `
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22,4 12,14.01 9,11.01"/>
        `;
    }
    
    if (resultTitle) {
        resultTitle.textContent = 'Registo Encontrado';
    }
    
    // Build result body based on type
    let html = '';
    
    switch (data.type) {
        case 'professional':
            html = `
                <div class="verify-result-item">
                    <span class="verify-result-label">Nome:</span>
                    <span class="verify-result-value">${data.name}</span>
                </div>
                <div class="verify-result-item">
                    <span class="verify-result-label">Código Profissional:</span>
                    <span class="verify-result-value">${data.code}</span>
                </div>
                <div class="verify-result-item">
                    <span class="verify-result-label">Cédula:</span>
                    <span class="verify-result-value">${data.cedula}</span>
                </div>
                <div class="verify-result-item">
                    <span class="verify-result-label">Estado:</span>
                    <span class="verify-result-value"><strong style="color: var(--color-success)">${data.status}</strong></span>
                </div>
                <div class="verify-result-item">
                    <span class="verify-result-label">Delegação:</span>
                    <span class="verify-result-value">${data.delegation}</span>
                </div>
                <div class="verify-result-item">
                    <span class="verify-result-label">Categoria:</span>
                    <span class="verify-result-value">${data.category}</span>
                </div>
                <div class="verify-result-item">
                    <span class="verify-result-label">Data de Registo:</span>
                    <span class="verify-result-value">${window.CDA.Utils.formatDate(data.registrationDate)}</span>
                </div>
            `;
            break;
            
        case 'company':
            html = `
                <div class="verify-result-item">
                    <span class="verify-result-label">Nome:</span>
                    <span class="verify-result-value">${data.name}</span>
                </div>
                <div class="verify-result-item">
                    <span class="verify-result-label">Código:</span>
                    <span class="verify-result-value">${data.code}</span>
                </div>
                <div class="verify-result-item">
                    <span class="verify-result-label">Estado:</span>
                    <span class="verify-result-value"><strong style="color: var(--color-success)">${data.status}</strong></span>
                </div>
                <div class="verify-result-item">
                    <span class="verify-result-label">Data de Registo:</span>
                    <span class="verify-result-value">${window.CDA.Utils.formatDate(data.registrationDate)}</span>
                </div>
                <div class="verify-result-item">
                    <span class="verify-result-label">Profissionais Ligados:</span>
                    <span class="verify-result-value">${data.linkedProfessionals.length}</span>
                </div>
            `;
            break;
            
        case 'document':
            html = `
                <div class="verify-result-item">
                    <span class="verify-result-label">Título:</span>
                    <span class="verify-result-value">${data.title}</span>
                </div>
                <div class="verify-result-item">
                    <span class="verify-result-label">Tipo:</span>
                    <span class="verify-result-value">${data.type}</span>
                </div>
                <div class="verify-result-item">
                    <span class="verify-result-label">Data:</span>
                    <span class="verify-result-value">${window.CDA.Utils.formatDate(data.date)}</span>
                </div>
                <div class="verify-result-item">
                    <span class="verify-result-label">Estado:</span>
                    <span class="verify-result-value"><strong style="color: var(--color-success)">${data.status}</strong></span>
                </div>
                <div class="verify-result-item">
                    <span class="verify-result-label">Referência:</span>
                    <span class="verify-result-value">${data.reference}</span>
                </div>
            `;
            break;
    }
    
    bodyEl.innerHTML = html;
    
    if (dateEl) {
        dateEl.textContent = window.CDA.Utils.formatDate(data.lastUpdated);
    }
    
    resultEl.hidden = false;
    
    // Scroll to result
    resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function displayVerificationError(error, resultEl, bodyEl) {
    const resultHeader = resultEl.querySelector('.verify-result-header');
    const resultIcon = resultHeader?.querySelector('.icon');
    const resultTitle = resultHeader?.querySelector('h3');
    
    if (resultIcon) {
        resultIcon.className = 'icon';
        resultIcon.style.color = 'var(--color-error)';
        resultIcon.innerHTML = `
            <circle cx="12" cy="12" r="10"/>
            <line x1="15" y1="9" x2="9" y2="15"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
        `;
    }
    
    if (resultTitle) {
        resultTitle.textContent = 'Nenhum Registo Encontrado';
    }
    
    bodyEl.innerHTML = `
        <div class="verify-result-item">
            <span class="verify-result-label" style="color: var(--color-error)">${error.message}</span>
        </div>
    `;
    
    resultEl.hidden = false;
    
    // Scroll to result
    resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ============================================
// Ask Form (IA Assistente)
// ============================================

function initAskForm() {
    const askForm = document.getElementById('ask-form');
    const askInput = document.getElementById('ask-question');
    
    if (!askForm || !askInput) return;
    
    askForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const question = askInput.value.trim();
        if (!question) {
            window.CDA.Utils.setError(askInput, 'Por favor, introduza a sua pergunta');
            return;
        }
        
        window.CDA.Utils.clearError(askInput);
        
        // Simulate API call (replace with actual API call)
        simulateAskQuestion(question)
            .then(response => {
                displayAskResponse(question, response);
            })
            .catch(error => {
                displayAskError(error);
            });
        
        // Clear input
        askInput.value = '';
    });
}

function simulateAskQuestion(question) {
    return new Promise((resolve, reject) => {
        // Simulate network delay
        setTimeout(() => {
            // Mock responses based on question keywords
            const mockResponses = {
                'legislação': {
                    answer: 'Pode encontrar toda a legislação aduaneira no nosso Centro Documental. A legislação está organizada por categorias e pode ser pesquisada por palavras-chave.',
                    sources: ['Lei nº 4/2011', 'Regulamento Aduaneiro 2026'],
                    documents: ['/documentos/lei-4-2011.pdf', '/documentos/regulamento-2026.pdf']
                },
                'despachante': {
                    answer: 'Um despachante aduaneiro é um profissional que representa terceiros perante as autoridades aduaneiras, tratando dos actos e formalidades relacionados com o desembaraço aduaneiro.',
                    sources: ['Estatutos da CDA', 'Lei nº 4/2011'],
                    documents: ['/documentos/estatutos-cda.pdf']
                },
                'membro': {
                    answer: 'Para se tornar membro da CDA, é necessário preencher os requisitos legais e submeter a documentação exigida. O processo está detalhado na página "Tornar-se Membro".',
                    sources: ['Estatutos da CDA'],
                    documents: ['/documentos/requisitos-membros.pdf']
                },
                'verificar': {
                    answer: 'Pode verificar um despachante, empresa ou documento usando a ferramenta de verificação na homepage. Basta introduzir o código, nome ou número de cédula.',
                    sources: ['Base de Dados CDA'],
                    documents: []
                },
                'default': {
                    answer: 'Desculpe, não consegui encontrar uma resposta para a sua pergunta. Tente reformular ou consulte o nosso Centro Documental para mais informações.',
                    sources: [],
                    documents: []
                }
            };
            
            // Find matching response
            const lowerQuestion = question.toLowerCase();
            let response = mockResponses.default;
            
            for (const [keyword, resp] of Object.entries(mockResponses)) {
                if (lowerQuestion.includes(keyword)) {
                    response = resp;
                    break;
                }
            }
            
            // Add metadata
            response.question = question;
            response.timestamp = new Date().toISOString();
            
            resolve(response);
        }, 1000);
    });
}

function displayAskResponse(question, response) {
    // Create response element
    const responseEl = document.createElement('div');
    responseEl.className = 'ask-response';
    responseEl.setAttribute('aria-live', 'polite');
    
    const date = new Date(response.timestamp);
    const timeStr = date.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' });
    
    responseEl.innerHTML = `
        <div class="ask-response-header">
            <div class="ask-response-question">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                <span>${question}</span>
            </div>
            <span class="ask-response-time">${timeStr}</span>
        </div>
        <div class="ask-response-body">
            <p>${response.answer}</p>
            ${response.sources.length > 0 ? `
                <div class="ask-response-sources">
                    <strong>Fontes:</strong>
                    <ul>
                        ${response.sources.map(source => `<li>${source}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
            ${response.documents.length > 0 ? `
                <div class="ask-response-documents">
                    <strong>Documentos relacionados:</strong>
                    <ul>
                        ${response.documents.map(doc => `<li><a href="${doc}" target="_blank">Ver documento</a></li>`).join('')}
                    </ul>
                </div>
            ` : ''}
        </div>
    `;
    
    // Style the response
    responseEl.style.background = 'var(--color-neutral-50)';
    responseEl.style.borderRadius = 'var(--radius-lg)';
    responseEl.style.padding = 'var(--space-4)';
    responseEl.style.marginTop = 'var(--space-4)';
    responseEl.style.borderLeft = '4px solid var(--color-primary)';
    
    // Insert after form
    const askForm = document.getElementById('ask-form');
    if (askForm) {
        askForm.after(responseEl);
    }
    
    // Scroll to response
    responseEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Auto-remove after 5 minutes
    setTimeout(() => {
        responseEl.remove();
    }, 300000);
}

function displayAskError(error) {
    // Create error element
    const errorEl = document.createElement('div');
    errorEl.className = 'ask-error';
    errorEl.setAttribute('aria-live', 'polite');
    errorEl.setAttribute('aria-invalid', 'true');
    
    errorEl.innerHTML = `
        <div class="alert alert-error">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
            <div class="alert-content">
                <div class="alert-title">Ocorreu um erro</div>
                <div class="alert-description">${error.message || 'Não foi possível processar a sua pergunta. Por favor, tente novamente mais tarde.'}</div>
            </div>
        </div>
    `;
    
    // Insert after form
    const askForm = document.getElementById('ask-form');
    if (askForm) {
        askForm.after(errorEl);
    }
    
    // Scroll to error
    errorEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
        errorEl.remove();
    }, 10000);
}

// ============================================
// News Cards
// ============================================

function initNewsCards() {
    const newsCards = document.querySelectorAll('.news-card');
    
    newsCards.forEach(card => {
        // Add click handler to entire card
        card.addEventListener('click', function(e) {
            const link = card.querySelector('.news-link');
            if (link && !e.target.closest('a, button')) {
                window.location.href = link.href;
            }
        });
        
        // Keyboard support
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                const link = card.querySelector('.news-link');
                if (link) {
                    e.preventDefault();
                    window.location.href = link.href;
                }
            }
        });
    });
}

// ============================================
// Lazy Loading
// ============================================

function initLazyLoading() {
    // Images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.removeAttribute('loading');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });
        
        lazyImages.forEach(img => {
            if (!img.complete) {
                imageObserver.observe(img);
            }
        });
    }
    
    // Iframes
    const lazyIframes = document.querySelectorAll('iframe[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const iframeObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const iframe = entry.target;
                    iframe.src = iframe.dataset.src || iframe.src;
                    iframe.removeAttribute('loading');
                    observer.unobserve(iframe);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });
        
        lazyIframes.forEach(iframe => {
            iframeObserver.observe(iframe);
        });
    }
}

// ============================================
// Scroll Animations
// ============================================

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    if ('IntersectionObserver' in window) {
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const animation = el.dataset.animate || 'fade-in';
                    el.classList.add('animate-' + animation);
                    animationObserver.unobserve(el);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(el => {
            animationObserver.observe(el);
        });
    }
}

// ============================================
// Intersection Observer for Various Effects
// ============================================

function initIntersectionObserver() {
    // Reveal animations
    const revealElements = document.querySelectorAll('.reveal');
    
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    }
    
    // Parallax effect for hero
    const hero = document.querySelector('.hero');
    if (hero) {
        const heroSlides = hero.querySelectorAll('.hero-slide');
        
        const parallaxObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const slide = entry.target;
                    const speed = 0.2;
                    
                    function updateParallax() {
                        const scrollY = window.pageYOffset;
                        const offset = scrollY * speed;
                        slide.style.transform = `translateY(${offset}px)`;
                    }
                    
                    window.addEventListener('scroll', window.CDA.Utils.debounce(updateParallax, 10));
                    parallaxObserver.unobserve(slide);
                }
            });
        }, {
            threshold: 0.5
        });
        
        heroSlides.forEach(slide => {
            parallaxObserver.observe(slide);
        });
    }
}

// ============================================
// Newsletter Subscription
// ============================================

function initNewsletter() {
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = document.getElementById('newsletter-email');
            const nameInput = document.getElementById('newsletter-name');
            
            if (!emailInput || !window.CDA.Utils.validateEmail(emailInput.value)) {
                window.CDA.Utils.setError(emailInput, 'Por favor, introduza um endereço de email válido');
                return;
            }
            
            window.CDA.Utils.clearError(emailInput);
            
            // Simulate subscription
            simulateNewsletterSubscription(emailInput.value, nameInput?.value || '')
                .then(() => {
                    displayNewsletterSuccess(newsletterForm);
                })
                .catch(error => {
                    displayNewsletterError(newsletterForm, error);
                });
        });
    }
}

function simulateNewsletterSubscription(email, name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate 10% chance of error
            if (Math.random() < 0.1) {
                reject({ message: 'Ocorreu um erro ao processar a sua subscrição. Por favor, tente novamente.' });
            } else {
                resolve();
            }
        }, 1000);
    });
}

function displayNewsletterSuccess(form) {
    const successEl = document.createElement('div');
    successEl.className = 'alert alert-success';
    successEl.setAttribute('aria-live', 'polite');
    successEl.innerHTML = `
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22,4 12,14.01 9,11.01"/>
        </svg>
        <div class="alert-content">
            <div class="alert-title">Subscrição bem-sucedida!</div>
            <div class="alert-description">Obrigado por se subscrever à nossa newsletter. Irá receber as últimas notícias e actualizações.</div>
        </div>
    `;
    
    form.after(successEl);
    form.reset();
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        successEl.remove();
    }, 5000);
}

function displayNewsletterError(form, error) {
    const errorEl = document.createElement('div');
    errorEl.className = 'alert alert-error';
    errorEl.setAttribute('aria-live', 'polite');
    errorEl.setAttribute('aria-invalid', 'true');
    errorEl.innerHTML = `
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="15" y1="9" x2="9" y2="15"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
        </svg>
        <div class="alert-content">
            <div class="alert-title">Erro na subscrição</div>
            <div class="alert-description">${error.message || 'Ocorreu um erro ao processar a sua subscrição.'}</div>
        </div>
    `;
    
    form.after(errorEl);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        errorEl.remove();
    }, 5000);
}

// ============================================
// Contact Form
// ============================================

function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Validate
            let isValid = true;
            
            if (!data.name || !data.name.trim()) {
                window.CDA.Utils.setError(document.getElementById('contact-name'), 'Por favor, introduza o seu nome');
                isValid = false;
            }
            
            if (!data.email || !window.CDA.Utils.validateEmail(data.email)) {
                window.CDA.Utils.setError(document.getElementById('contact-email'), 'Por favor, introduza um endereço de email válido');
                isValid = false;
            }
            
            if (!data.subject || !data.subject.trim()) {
                window.CDA.Utils.setError(document.getElementById('contact-subject'), 'Por favor, introduza o assunto');
                isValid = false;
            }
            
            if (!data.message || !data.message.trim()) {
                window.CDA.Utils.setError(document.getElementById('contact-message'), 'Por favor, introduza a sua mensagem');
                isValid = false;
            }
            
            if (!isValid) return;
            
            // Simulate form submission
            simulateContactSubmission(data)
                .then(() => {
                    displayContactSuccess(contactForm);
                })
                .catch(error => {
                    displayContactError(contactForm, error);
                });
        });
    }
}

function simulateContactSubmission(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.1) {
                reject({ message: 'Ocorreu um erro ao enviar a sua mensagem. Por favor, tente novamente.' });
            } else {
                resolve();
            }
        }, 1000);
    });
}

function displayContactSuccess(form) {
    const successEl = document.createElement('div');
    successEl.className = 'alert alert-success';
    successEl.setAttribute('aria-live', 'polite');
    successEl.innerHTML = `
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22,4 12,14.01 9,11.01"/>
        </svg>
        <div class="alert-content">
            <div class="alert-title">Mensagem enviada com sucesso!</div>
            <div class="alert-description">A sua mensagem foi enviada. Iremos responder o mais breve possível.</div>
        </div>
    `;
    
    form.after(successEl);
    form.reset();
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        successEl.remove();
    }, 5000);
}

function displayContactError(form, error) {
    const errorEl = document.createElement('div');
    errorEl.className = 'alert alert-error';
    errorEl.setAttribute('aria-live', 'polite');
    errorEl.setAttribute('aria-invalid', 'true');
    errorEl.innerHTML = `
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="15" y1="9" x2="9" y2="15"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
        </svg>
        <div class="alert-content">
            <div class="alert-title">Erro ao enviar mensagem</div>
            <div class="alert-description">${error.message || 'Ocorreu um erro ao enviar a sua mensagem.'}</div>
        </div>
    `;
    
    form.after(errorEl);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        errorEl.remove();
    }, 5000);
}

// ============================================
// Export Functions
// ============================================

window.CDA = window.CDA || {};
window.CDA.Home = {
    initVerificationForm,
    initAskForm,
    initNewsCards,
    initLazyLoading,
    initScrollAnimations,
    initIntersectionObserver,
    initNewsletter,
    initContactForm,
    simulateVerification,
    displayVerificationResult,
    displayVerificationError
};

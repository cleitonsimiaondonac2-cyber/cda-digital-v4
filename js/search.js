/**
 * CDA Digital V4 - Funcionalidade de Busca
 * ============================================
 * 
 * Este arquivo contém a funcionalidade de busca do portal CDA Digital V4
 */

// ============================================
// DOM Content Loaded
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initSearchFunctionality();
    initSearchPage();
});

// ============================================
// Inicializar Funcionalidade de Busca
// ============================================

function initSearchFunctionality() {
    const searchForms = document.querySelectorAll('form[action*="documentacao.html"]');
    
    searchForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            performSearch(form);
        });
    });
    
    // Search on home page
    const homeSearchForm = document.querySelector('.header-search form');
    if (homeSearchForm) {
        homeSearchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = this.querySelector('.search-input').value.trim();
            if (query) {
                window.location.href = `documentacao.html?q=${encodeURIComponent(query)}`;
            }
        });
    }
    
    // Large search form
    const largeSearchForm = document.querySelector('.search-form-large');
    if (largeSearchForm) {
        largeSearchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = this.querySelector('.search-input-large').value.trim();
            if (query) {
                window.location.href = `documentacao.html?q=${encodeURIComponent(query)}`;
            }
        });
    }
}

// ============================================
// Realizar Busca
// ============================================

function performSearch(form) {
    const query = form.querySelector('input[type="search"]').value.trim();
    const type = form.querySelector('input[name="type"]')?.value || 'all';
    
    if (!query) return;
    
    // Redirect to search results page
    const url = new URL('documentacao.html', window.location.origin);
    url.searchParams.set('q', query);
    if (type !== 'all') {
        url.searchParams.set('type', type);
    }
    window.location.href = url.toString();
}

// ============================================
// Página de Busca
// ============================================

function initSearchPage() {
    const searchResultsContainer = document.getElementById('search-results');
    if (!searchResultsContainer) return;
    
    // Get query from URL
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q') || '';
    const type = urlParams.get('type') || 'all';
    
    // Display query
    const searchQueryEl = document.getElementById('search-query');
    if (searchQueryEl) {
        searchQueryEl.textContent = query;
    }
    
    // Perform search
    if (query) {
        executeSearch(query, type, searchResultsContainer);
    } else {
        displayNoQuery(searchResultsContainer);
    }
    
    // Clear search
    const clearBtn = document.getElementById('clear-search');
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            window.location.href = 'documentacao.html';
        });
    }
}

// ============================================
// Executar Busca
// ============================================

function executeSearch(query, type, container) {
    // Show loading state
    container.innerHTML = '<div class="loading"></div>';
    
    // Simulate search (replace with actual search logic)
    setTimeout(() => {
        const results = performLocalSearch(query, type);
        displaySearchResults(results, query, type, container);
    }, 500);
}

// ============================================
// Busca Local (simulada)
// ============================================

function performLocalSearch(query, type) {
    const allData = [
        ...window.CDA.Data.documentos.map(d => ({ ...d, type: 'documento' })),
        ...window.CDA.Data.noticias.map(n => ({ ...n, type: 'noticia' })),
        ...window.CDA.Data.membros.map(m => ({ ...m, type: 'membro' })),
        ...window.CDA.Data.eventos.map(e => ({ ...e, type: 'evento' }))
    ];
    
    const lowerQuery = query.toLowerCase();
    
    return allData.filter(item => {
        // Filter by type if specified
        if (type !== 'all' && item.type !== type) {
            return false;
        }
        
        // Search in text fields
        const searchableText = [
            item.title || '',
            item.name || '',
            item.description || '',
            item.content || '',
            item.category || '',
            item.code || '',
            item.cedula || ''
        ].join(' ').toLowerCase();
        
        return searchableText.includes(lowerQuery);
    }).slice(0, 50); // Limit results
}

// ============================================
// Exibir Resultados da Busca
// ============================================

function displaySearchResults(results, query, type, container) {
    if (results.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">
                    <svg class="icon icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"/>
                        <path d="m21 21-4.35-4.35"/>
                    </svg>
                </div>
                <h3 class="empty-state-title">Nenhum resultado encontrado</h3>
                <p class="empty-state-description">
                    Não foram encontrados resultados para "${query}". Tente outros termos de busca.
                </p>
                <div class="empty-state-cta">
                    <a href="documentacao.html" class="btn btn-primary">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                            <polyline points="14,2 14,8 20,8"/>
                            <line x1="16" y1="13" x2="8" y2="13"/>
                            <line x1="16" y1="17" x2="8" y2="17"/>
                        </svg>
                        Ver Todos os Documentos
                    </a>
                </div>
            </div>
        `;
        return;
    }
    
    // Group results by type
    const resultsByType = {};
    results.forEach(result => {
        if (!resultsByType[result.type]) {
            resultsByType[result.type] = [];
        }
        resultsByType[result.type].push(result);
    });
    
    let html = '';
    
    // Display results by type
    for (const [typeKey, typeResults] of Object.entries(resultsByType)) {
        const typeName = getTypeName(typeKey);
        
        html += `
            <section class="search-results-section" aria-labelledby="results-${typeKey}-title">
                <h3 id="results-${typeKey}-title" class="search-results-title">
                    ${typeName} (${typeResults.length})
                </h3>
                <div class="search-results-grid">
        `;
        
        typeResults.forEach(result => {
            html += createResultCard(result, typeKey);
        });
        
        html += `
                </div>
            </section>
        `;
    }
    
    container.innerHTML = html;
}

// ============================================
// Nome do Tipo
// ============================================

function getTypeName(type) {
    const typeNames = {
        'documento': 'Documentos',
        'noticia': 'Notícias',
        'membro': 'Membros',
        'evento': 'Eventos'
    };
    return typeNames[type] || type;
}

// ============================================
// Criar Card de Resultado
// ============================================

function createResultCard(result, type) {
    let html = '';
    let icon = '';
    let url = '';
    let title = result.title || result.name || '';
    let date = result.date || '';
    let category = result.category || '';
    let description = result.description || result.excerpt || '';
    
    // Set icon based on type
    switch (type) {
        case 'documento':
            icon = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14,2 14,8 20,8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
            `;
            url = `documentacao.html#doc-${result.id}`;
            break;
            
        case 'noticia':
            icon = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 6 6 18"/>
                    <path d="m6 6 12 12"/>
                </svg>
            `;
            url = `noticias.html#news-${result.id}`;
            break;
            
        case 'membro':
            icon = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                </svg>
            `;
            url = `despachantes.html#member-${result.id}`;
            break;
            
        case 'evento':
            icon = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
            `;
            url = `galeria.html#event-${result.id}`;
            break;
    }
    
    // Format date
    const formattedDate = date ? window.CDA.Utils.formatDate(date) : '';
    
    html = `
        <article class="search-result-card">
            <div class="search-result-icon">
                ${icon}
            </div>
            <div class="search-result-content">
                <h4 class="search-result-title">
                    <a href="${url}" class="search-result-link">${title}</a>
                </h4>
                <div class="search-result-meta">
                    ${formattedDate ? `<span class="search-result-date">${formattedDate}</span>` : ''}
                    ${category ? `<span class="search-result-category">${category}</span>` : ''}
                </div>
                ${description ? `<p class="search-result-excerpt">${description}</p>` : ''}
            </div>
        </article>
    `;
    
    return html;
}

// ============================================
// Sem Query
// ============================================

function displayNoQuery(container) {
    container.innerHTML = `
        <div class="empty-state">
            <div class="empty-state-icon">
                <svg class="icon icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                </svg>
            </div>
            <h3 class="empty-state-title">Pesquisa no Centro Documental</h3>
            <p class="empty-state-description">
                Utilize a barra de pesquisa para encontrar legislação, circulares, regulamentos e outros documentos.
            </p>
        </div>
    `;
}

// ============================================
// Busca em Tempo Real (Autocomplete)
// ============================================

function initAutocomplete() {
    const searchInputs = document.querySelectorAll('input[type="search"]');
    
    searchInputs.forEach(input => {
        const form = input.closest('form');
        if (!form) return;
        
        let debounceTimer;
        
        input.addEventListener('input', function() {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                const query = this.value.trim();
                if (query.length >= 3) {
                    showSuggestions(query, input, form);
                } else {
                    hideSuggestions(input);
                }
            }, 300);
        });
        
        input.addEventListener('blur', function() {
            setTimeout(() => {
                hideSuggestions(this);
            }, 200);
        });
        
        input.addEventListener('keydown', function(e) {
            const suggestions = document.getElementById('search-suggestions');
            if (!suggestions) return;
            
            const items = suggestions.querySelectorAll('.suggestion-item');
            let currentIndex = -1;
            
            items.forEach((item, index) => {
                if (item.classList.contains('active')) {
                    currentIndex = index;
                }
            });
            
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (currentIndex < items.length - 1) {
                    items[currentIndex]?.classList.remove('active');
                    items[currentIndex + 1]?.classList.add('active');
                    items[currentIndex + 1]?.scrollIntoView({ block: 'nearest' });
                }
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (currentIndex > 0) {
                    items[currentIndex]?.classList.remove('active');
                    items[currentIndex - 1]?.classList.add('active');
                    items[currentIndex - 1]?.scrollIntoView({ block: 'nearest' });
                }
            } else if (e.key === 'Enter' && currentIndex >= 0) {
                e.preventDefault();
                items[currentIndex]?.click();
            }
        });
    });
}

// ============================================
// Mostrar Sugestões
// ============================================

function showSuggestions(query, input, form) {
    hideSuggestions(input);
    
    const suggestions = performQuickSearch(query);
    if (suggestions.length === 0) return;
    
    const suggestionsEl = document.createElement('div');
    suggestionsEl.id = 'search-suggestions';
    suggestionsEl.className = 'search-suggestions';
    suggestionsEl.setAttribute('role', 'listbox');
    suggestionsEl.setAttribute('aria-label', 'Sugestões de busca');
    
    let html = '';
    suggestions.slice(0, 5).forEach((suggestion, index) => {
        html += `
            <div class="suggestion-item" role="option" tabindex="0" data-value="${suggestion.text}">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                </svg>
                <span class="suggestion-text">${suggestion.text}</span>
                <span class="suggestion-type">${suggestion.type}</span>
            </div>
        `;
    });
    
    suggestionsEl.innerHTML = html;
    
    // Position suggestions
    const inputRect = input.getBoundingClientRect();
    suggestionsEl.style.position = 'absolute';
    suggestionsEl.style.left = `${inputRect.left}px`;
    suggestionsEl.style.top = `${inputRect.bottom + window.scrollY}px`;
    suggestionsEl.style.width = `${inputRect.width}px`;
    suggestionsEl.style.zIndex = '1000';
    
    // Add to body
    document.body.appendChild(suggestionsEl);
    
    // Add event listeners
    const items = suggestionsEl.querySelectorAll('.suggestion-item');
    items.forEach(item => {
        item.addEventListener('click', function() {
            input.value = this.dataset.value;
            form.submit();
            hideSuggestions(input);
        });
        
        item.addEventListener('mouseenter', function() {
            items.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// ============================================
// Esconder Sugestões
// ============================================

function hideSuggestions(input) {
    const suggestions = document.getElementById('search-suggestions');
    if (suggestions) {
        suggestions.remove();
    }
}

// ============================================
// Busca Rápida
// ============================================

function performQuickSearch(query) {
    const allData = [
        ...window.CDA.Data.documentos.slice(0, 20),
        ...window.CDA.Data.noticias.slice(0, 20)
    ];
    
    const lowerQuery = query.toLowerCase();
    
    return allData
        .filter(item => {
            const searchableText = [
                item.title || '',
                item.name || '',
                item.category || '',
                item.reference || ''
            ].join(' ').toLowerCase();
            
            return searchableText.includes(lowerQuery);
        })
        .map(item => ({
            text: item.title || item.name,
            type: item.type === 'documento' ? 'Doc' : 'Notícia'
        }));
}

// ============================================
// Filtros de Busca
// ============================================

function initSearchFilters() {
    const filterButtons = document.querySelectorAll('.search-filter button');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.dataset.filter;
            
            // Update search
            const searchInput = document.querySelector('.search-input');
            if (searchInput) {
                const query = searchInput.value.trim();
                if (query) {
                    const url = new URL('documentacao.html', window.location.origin);
                    url.searchParams.set('q', query);
                    url.searchParams.set('type', filterValue);
                    window.location.href = url.toString();
                }
            }
        });
    });
}

// ============================================
// Exportar Funções
// ============================================

window.CDA = window.CDA || {};
window.CDA.Search = {
    initSearchFunctionality,
    initSearchPage,
    performSearch,
    executeSearch,
    performLocalSearch,
    displaySearchResults,
    initAutocomplete,
    showSuggestions,
    hideSuggestions,
    performQuickSearch,
    initSearchFilters
};

/**
 * CDA Digital - Verificação de Despachantes
 * Funcionalidade para verificar despachantes por código, nome ou cédula
 */

document.addEventListener('DOMContentLoaded', function() {
    const verifyForm = document.getElementById('verify-form');
    if (!verifyForm) return;

    const queryInput = document.getElementById('verify-query');
    const resultsContainer = document.createElement('div');
    resultsContainer.className = 'verify-results';
    resultsContainer.style.display = 'none';
    verifyForm.parentNode.insertBefore(resultsContainer, verifyForm.nextSibling);

    // Carregar dados dos despachantes
    let despachantes = [];
    
    // Tentar carregar dados do JSON
    async function loadDespachantes() {
        try {
            const response = await fetch('data/despachantes.json');
            if (response.ok) {
                despachantes = await response.json();
                console.log('Despachantes carregados:', despachantes.length);
            }
        } catch (error) {
            console.error('Erro ao carregar despachantes:', error);
            // Usar dados de fallback
            despachantes = getFallbackDespachantes();
        }
    }
    
    function getFallbackDespachantes() {
        return [
            {
                id: "000100010912",
                nome: "Carlos F. Filomeno de Gama Afonso",
                cedula: "DESP / 001 / DGA / 03",
                estado: "REGISTADO",
                delegacao: "Maputo",
                publico: true
            },
            {
                id: "000200020913",
                nome: "Maria da Graça João",
                cedula: "DESP / 002 / DGA / 04",
                estado: "REGISTADO",
                delegacao: "Maputo",
                publico: true
            },
            {
                id: "000300030914",
                nome: "José Manuel da Silva",
                cedula: "DESP / 003 / DGA / 05",
                estado: "REGISTADO",
                delegacao: "Beira",
                publico: true
            }
        ];
    }
    
    // Inicializar
    loadDespachantes();

    verifyForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const query = queryInput.value.trim();
        
        if (!query) {
            showError('Por favor, introduza um código, nome ou número de cédula');
            return;
        }
        
        searchDespachante(query);
    });
    
    // Pesquisa em tempo real (opcional)
    queryInput.addEventListener('input', function() {
        const query = this.value.trim();
        if (query.length >= 3) {
            // Pesquisa automática para sugestões
            const suggestions = findDespachantes(query, 5);
            if (suggestions.length > 0) {
                showSuggestions(suggestions);
            } else {
                hideSuggestions();
            }
        } else {
            hideSuggestions();
        }
    });
    
    function searchDespachante(query) {
        const results = findDespachantes(query);
        
        if (results.length === 0) {
            showNoResults(query);
            return;
        }
        
        if (results.length === 1) {
            showResult(results[0]);
            return;
        }
        
        showMultipleResults(results);
    }
    
    function findDespachantes(query, limit = null) {
        const normalizedQuery = query.toLowerCase();
        
        const results = despachantes.filter(despachante => {
            // Verificar se é público
            if (!despachante.publico) return false;
            
            // Pesquisa por ID
            if (despachante.id.toLowerCase().includes(normalizedQuery)) {
                return true;
            }
            
            // Pesquisa por nome
            if (despachante.nome.toLowerCase().includes(normalizedQuery)) {
                return true;
            }
            
            // Pesquisa por cédula
            if (despachante.cedula && despachante.cedula.toLowerCase().includes(normalizedQuery)) {
                return true;
            }
            
            return false;
        });
        
        // Aplicar limite se especificado
        if (limit && results.length > limit) {
            return results.slice(0, limit);
        }
        
        return results;
    }
    
    function showResult(despachante) {
        resultsContainer.style.display = 'block';
        resultsContainer.innerHTML = `
            <div class="verify-result-card">
                <div class="verify-result-header">
                    <svg class="icon icon-lg verify-result-icon ${despachante.estado === 'REGISTADO' ? 'success' : 'warning'}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        ${despachante.estado === 'REGISTADO' ? 
                            '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/>' :
                            '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>'
                        }
                    </svg>
                    <h3 class="verify-result-title">${despachante.estado === 'REGISTADO' ? 'Registo Confirmado' : 'Registo ' + despachante.estado}</h3>
                </div>
                <div class="verify-result-body">
                    <div class="verify-result-field">
                        <span class="verify-result-label">Nome:</span>
                        <span class="verify-result-value">${despachante.nome}</span>
                    </div>
                    <div class="verify-result-field">
                        <span class="verify-result-label">Código Profissional:</span>
                        <span class="verify-result-value">${despachante.id}</span>
                    </div>
                    <div class="verify-result-field">
                        <span class="verify-result-label">Cédula:</span>
                        <span class="verify-result-value">${despachante.cedula || 'N/A'}</span>
                    </div>
                    <div class="verify-result-field">
                        <span class="verify-result-label">Delegação:</span>
                        <span class="verify-result-value">${despachante.delegacao || 'N/A'}</span>
                    </div>
                    <div class="verify-result-field">
                        <span class="verify-result-label">Estado:</span>
                        <span class="verify-result-value verify-result-badge ${despachante.estado === 'REGISTADO' ? 'badge-success' : 'badge-warning'}">${despachante.estado}</span>
                    </div>
                </div>
                <div class="verify-result-footer">
                    <p class="verify-result-note">Informação oficial da Câmara dos Despachantes Aduaneiros de Moçambique</p>
                    <div class="verify-result-qrcode">
                        <p class="verify-result-qrcode-text">Verificar via QR Code:</p>
                        <div class="verify-result-qrcode-image">
                            <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(window.location.origin + '/verify.html?id=' + despachante.id)}" alt="QR Code para verificação" loading="lazy">
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Scroll para o resultado
        resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Adicionar estilos dinâmicos
        addResultStyles();
    }
    
    function showMultipleResults(results) {
        resultsContainer.style.display = 'block';
        resultsContainer.innerHTML = `
            <div class="verify-results-header">
                <h3 class="verify-results-title">Foram encontrados ${results.length} resultados</h3>
                <p class="verify-results-subtitle">Por favor, selecione o despachante que procura</p>
            </div>
            <div class="verify-results-list">
                ${results.map(despachante => `
                    <div class="verify-result-item" data-id="${despachante.id}">
                        <div class="verify-result-item-content">
                            <h4 class="verify-result-item-name">${despachante.nome}</h4>
                            <div class="verify-result-item-meta">
                                <span class="verify-result-item-code">Código: ${despachante.id}</span>
                                <span class="verify-result-item-delegacao">${despachante.delegacao || 'N/A'}</span>
                                <span class="verify-result-item-estado verify-result-badge ${despachante.estado === 'REGISTADO' ? 'badge-success' : 'badge-warning'}">${despachante.estado}</span>
                            </div>
                        </div>
                        <button class="verify-result-item-btn" aria-label="Ver detalhes">
                            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </button>
                    </div>
                `).join('')}
            </div>
        `;
        
        // Adicionar event listeners aos itens
        document.querySelectorAll('.verify-result-item').forEach(item => {
            item.addEventListener('click', () => {
                const id = item.dataset.id;
                const despachante = despachantes.find(d => d.id === id);
                if (despachante) {
                    showResult(despachante);
                }
            });
        });
        
        // Scroll para os resultados
        resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Adicionar estilos dinâmicos
        addResultStyles();
    }
    
    function showNoResults(query) {
        resultsContainer.style.display = 'block';
        resultsContainer.innerHTML = `
            <div class="verify-no-results">
                <svg class="icon icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M16 16s-4-4-4-4"/>
                    <line x1="16" y1="16" x2="16.01" y2="16"/>
                    <line x1="12" y1="12" x2="12.01" y2="12"/>
                </svg>
                <h3 class="verify-no-results-title">Nenhum resultado encontrado</h3>
                <p class="verify-no-results-text">Não foi encontrado nenhum despachante com o termo "${query}"</p>
                <div class="verify-no-results-actions">
                    <button class="btn btn-outline verify-no-results-btn" onclick="clearSearch()">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 4H8l-7 7v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8z"/>
                            <polyline points="10,9 15,4 15,9"/>
                        </svg>
                        Limpar pesquisa
                    </button>
                    <a href="despachantes.html" class="btn btn-primary verify-no-results-btn">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                            <circle cx="9" cy="7" r="4"/>
                        </svg>
                        Ver todos os despachantes
                    </a>
                </div>
            </div>
        `;
        
        // Scroll para os resultados
        resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Adicionar estilos dinâmicos
        addResultStyles();
    }
    
    function showError(message) {
        resultsContainer.style.display = 'block';
        resultsContainer.innerHTML = `
            <div class="verify-error">
                <svg class="icon icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <h3 class="verify-error-title">Erro</h3>
                <p class="verify-error-text">${message}</p>
            </div>
        `;
        
        // Scroll para o erro
        resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Adicionar estilos dinâmicos
        addResultStyles();
    }
    
    function showSuggestions(suggestions) {
        // Remover sugestões existentes
        hideSuggestions();
        
        // Criar container de sugestões
        const suggestionsContainer = document.createElement('div');
        suggestionsContainer.className = 'verify-suggestions';
        
        suggestionsContainer.innerHTML = `
            ${suggestions.map(despachante => `
                <button class="verify-suggestion" data-id="${despachante.id}">
                    <span class="verify-suggestion-name">${despachante.nome}</span>
                    <span class="verify-suggestion-code">${despachante.id}</span>
                </button>
            `).join('')}
        `;
        
        // Adicionar ao DOM
        queryInput.parentNode.appendChild(suggestionsContainer);
        
        // Adicionar event listeners
        document.querySelectorAll('.verify-suggestion').forEach(suggestion => {
            suggestion.addEventListener('click', () => {
                queryInput.value = suggestion.querySelector('.verify-suggestion-name').textContent;
                verifyForm.dispatchEvent(new Event('submit'));
            });
        });
        
        // Adicionar estilos dinâmicos
        addSuggestionStyles();
    }
    
    function hideSuggestions() {
        const suggestions = document.querySelector('.verify-suggestions');
        if (suggestions) {
            suggestions.remove();
        }
    }
    
    function clearSearch() {
        queryInput.value = '';
        resultsContainer.style.display = 'none';
        hideSuggestions();
        queryInput.focus();
    }
    
    function addResultStyles() {
        if (document.getElementById('verify-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'verify-styles';
        style.textContent = `
            .verify-results {
                margin-top: var(--space-xl);
            }
            
            .verify-result-card {
                background-color: var(--color-white);
                border-radius: var(--radius-lg);
                padding: var(--space-xl);
                box-shadow: var(--shadow-md);
                animation: fadeInUp 0.5s ease forwards;
            }
            
            .verify-result-header {
                display: flex;
                align-items: center;
                gap: var(--space-md);
                margin-bottom: var(--space-lg);
                padding-bottom: var(--space-lg);
                border-bottom: 2px solid var(--color-neutral-200);
            }
            
            .verify-result-icon {
                width: 48px;
                height: 48px;
            }
            
            .verify-result-icon.success {
                color: #28a745;
            }
            
            .verify-result-icon.warning {
                color: #ffc107;
            }
            
            .verify-result-title {
                font-size: var(--text-2xl);
                font-weight: var(--font-bold);
                color: var(--color-neutral-900);
                margin: 0;
            }
            
            .verify-result-body {
                display: grid;
                gap: var(--space-md);
                margin-bottom: var(--space-lg);
            }
            
            .verify-result-field {
                display: flex;
                gap: var(--space-md);
            }
            
            .verify-result-label {
                font-size: var(--text-sm);
                font-weight: var(--font-semibold);
                color: var(--color-neutral-500);
                min-width: 150px;
            }
            
            .verify-result-value {
                font-size: var(--text-base);
                color: var(--color-neutral-900);
            }
            
            .verify-result-badge {
                display: inline-block;
                padding: var(--space-xs) var(--space-sm);
                border-radius: var(--radius-sm);
                font-size: var(--text-xs);
                font-weight: var(--font-semibold);
            }
            
            .badge-success {
                background-color: #d4edda;
                color: #155724;
            }
            
            .badge-warning {
                background-color: #fff3cd;
                color: #856404;
            }
            
            .verify-result-footer {
                padding-top: var(--space-lg);
                border-top: 1px solid var(--color-neutral-200);
            }
            
            .verify-result-note {
                font-size: var(--text-xs);
                color: var(--color-neutral-500);
                text-align: center;
                margin-bottom: var(--space-lg);
            }
            
            .verify-result-qrcode {
                text-align: center;
            }
            
            .verify-result-qrcode-text {
                font-size: var(--text-sm);
                color: var(--color-neutral-600);
                margin-bottom: var(--space-sm);
            }
            
            .verify-result-qrcode-image {
                display: inline-block;
                padding: var(--space-md);
                background-color: var(--color-white);
                border-radius: var(--radius-md);
                border: 1px solid var(--color-neutral-200);
            }
            
            .verify-result-qrcode-image img {
                width: 120px;
                height: 120px;
            }
            
            /* Multiple Results */
            .verify-results-header {
                text-align: center;
                margin-bottom: var(--space-lg);
            }
            
            .verify-results-title {
                font-size: var(--text-xl);
                font-weight: var(--font-bold);
                color: var(--color-neutral-900);
                margin-bottom: var(--space-xs);
            }
            
            .verify-results-subtitle {
                font-size: var(--text-base);
                color: var(--color-neutral-500);
            }
            
            .verify-results-list {
                display: grid;
                gap: var(--space-sm);
            }
            
            .verify-result-item {
                display: flex;
                align-items: center;
                gap: var(--space-md);
                padding: var(--space-md);
                background-color: var(--color-white);
                border-radius: var(--radius-md);
                box-shadow: var(--shadow-sm);
                cursor: pointer;
                transition: all var(--transition-fast);
            }
            
            .verify-result-item:hover {
                background-color: var(--color-neutral-50);
                transform: translateX(4px);
            }
            
            .verify-result-item-content {
                flex: 1;
            }
            
            .verify-result-item-name {
                font-size: var(--text-base);
                font-weight: var(--font-semibold);
                color: var(--color-neutral-900);
                margin-bottom: var(--space-xs);
            }
            
            .verify-result-item-meta {
                display: flex;
                gap: var(--space-md);
                font-size: var(--text-xs);
                color: var(--color-neutral-500);
            }
            
            .verify-result-item-btn {
                background: none;
                border: none;
                cursor: pointer;
                color: var(--color-primary);
                padding: var(--space-xs);
                transition: color var(--transition-fast);
            }
            
            .verify-result-item-btn:hover {
                color: var(--color-primary-dark);
            }
            
            .verify-result-item-btn .icon {
                width: 18px;
                height: 18px;
            }
            
            /* No Results */
            .verify-no-results {
                text-align: center;
                padding: var(--space-xl);
                background-color: var(--color-white);
                border-radius: var(--radius-lg);
                box-shadow: var(--shadow-sm);
            }
            
            .verify-no-results .icon {
                width: 64px;
                height: 64px;
                color: var(--color-neutral-400);
                margin-bottom: var(--space-md);
            }
            
            .verify-no-results-title {
                font-size: var(--text-xl);
                font-weight: var(--font-bold);
                color: var(--color-neutral-900);
                margin-bottom: var(--space-sm);
            }
            
            .verify-no-results-text {
                font-size: var(--text-base);
                color: var(--color-neutral-500);
                margin-bottom: var(--space-lg);
            }
            
            .verify-no-results-actions {
                display: flex;
                justify-content: center;
                gap: var(--space-md);
            }
            
            .verify-no-results-btn {
                min-width: 180px;
            }
            
            /* Error */
            .verify-error {
                text-align: center;
                padding: var(--space-xl);
                background-color: #f8d7da;
                border-radius: var(--radius-lg);
                color: #721c24;
            }
            
            .verify-error .icon {
                width: 48px;
                height: 48px;
                margin-bottom: var(--space-md);
            }
            
            .verify-error-title {
                font-size: var(--text-lg);
                font-weight: var(--font-bold);
                margin-bottom: var(--space-sm);
            }
            
            .verify-error-text {
                font-size: var(--text-base);
            }
            
            /* Suggestions */
            .verify-suggestions {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background-color: var(--color-white);
                border: 2px solid var(--color-neutral-200);
                border-top: none;
                border-radius: 0 0 var(--radius-md) var(--radius-md);
                box-shadow: var(--shadow-md);
                z-index: 1000;
                animation: fadeIn 0.2s ease forwards;
            }
            
            .verify-suggestion {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                padding: var(--space-sm) var(--space-md);
                background: none;
                border: none;
                cursor: pointer;
                text-align: left;
                transition: background-color var(--transition-fast);
            }
            
            .verify-suggestion:hover {
                background-color: var(--color-neutral-50);
            }
            
            .verify-suggestion-name {
                font-size: var(--text-sm);
                color: var(--color-neutral-900);
            }
            
            .verify-suggestion-code {
                font-size: var(--text-xs);
                color: var(--color-neutral-500);
            }
        `;
        
        document.head.appendChild(style);
    }
    
    function addSuggestionStyles() {
        if (document.getElementById('suggestion-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'suggestion-styles';
        style.textContent = `
            .verify-suggestions {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background-color: var(--color-white);
                border: 2px solid var(--color-neutral-200);
                border-top: none;
                border-radius: 0 0 var(--radius-md) var(--radius-md);
                box-shadow: var(--shadow-md);
                z-index: 1000;
                max-height: 300px;
                overflow-y: auto;
            }
            
            .verify-suggestion {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                padding: var(--space-sm) var(--space-md);
                background: none;
                border: none;
                cursor: pointer;
                text-align: left;
                transition: background-color var(--transition-fast);
            }
            
            .verify-suggestion:hover {
                background-color: var(--color-neutral-50);
            }
            
            .verify-suggestion-name {
                font-size: var(--text-sm);
                color: var(--color-neutral-900);
            }
            
            .verify-suggestion-code {
                font-size: var(--text-xs);
                color: var(--color-neutral-500);
            }
        `;
        
        document.head.appendChild(style);
    }
    
    // Expor função para limpar pesquisa
    window.clearSearch = clearSearch;
});

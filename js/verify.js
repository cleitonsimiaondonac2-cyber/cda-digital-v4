/**
 * CDA Digital V4 - Funcionalidade de Verificação
 * ================================================
 * 
 * Este arquivo contém a funcionalidade de verificação de despachantes, empresas e documentos
 */

// ============================================
// DOM Content Loaded
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initVerificationPage();
});

// ============================================
// Inicializar Página de Verificação
// ============================================

function initVerificationPage() {
    const verifyForm = document.getElementById('verify-form');
    const verifyResult = document.getElementById('verify-result');
    
    if (!verifyForm) return;
    
    // Form submission
    verifyForm.addEventListener('submit', function(e) {
        e.preventDefault();
        performVerification(verifyForm, verifyResult);
    });
    
    // Clear result when input changes
    const codeInput = document.getElementById('verify-code');
    if (codeInput) {
        codeInput.addEventListener('input', function() {
            if (verifyResult && !verifyResult.hidden) {
                verifyResult.hidden = true;
            }
        });
    }
    
    // Type change
    const typeInputs = document.querySelectorAll('input[name="verify-type"]');
    typeInputs.forEach(input => {
        input.addEventListener('change', function() {
            if (verifyResult && !verifyResult.hidden) {
                verifyResult.hidden = true;
            }
            
            // Update placeholder based on type
            if (codeInput) {
                switch (this.value) {
                    case 'professional':
                        codeInput.placeholder = 'Código profissional, nome ou nº da cédula';
                        break;
                    case 'company':
                        codeInput.placeholder = 'Nome ou código da empresa';
                        break;
                    case 'document':
                        codeInput.placeholder = 'Número ou referência do documento';
                        break;
                }
            }
        });
    });
}

// ============================================
// Realizar Verificação
// ============================================

function performVerification(form, resultContainer) {
    const codeInput = form.querySelector('#verify-code');
    const typeInput = form.querySelector('input[name="verify-type"]:checked');
    
    if (!codeInput || !codeInput.value.trim()) {
        window.CDA.Utils.setError(codeInput, 'Por favor, introduza um código, nome ou número');
        return;
    }
    
    window.CDA.Utils.clearError(codeInput);
    
    const query = codeInput.value.trim();
    const type = typeInput?.value || 'professional';
    
    // Show loading state
    if (resultContainer) {
        resultContainer.innerHTML = '<div class="loading"></div>';
        resultContainer.hidden = false;
    }
    
    // Perform verification (replace with actual API call)
    window.CDA.Home.simulateVerification(query, type)
        .then(data => {
            if (resultContainer) {
                displayVerificationResult(data, resultContainer);
            }
        })
        .catch(error => {
            if (resultContainer) {
                displayVerificationError(error, resultContainer);
            }
        });
}

// ============================================
// Exibir Resultado da Verificação
// ============================================

function displayVerificationResult(data, container) {
    const resultHeader = container.querySelector('.verify-result-header');
    const resultIcon = resultHeader?.querySelector('.icon');
    const resultTitle = resultHeader?.querySelector('h3');
    const resultBody = container.querySelector('.verify-result-body');
    const resultDate = container.querySelector('.verify-date');
    
    // Update header
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
    
    // Build body based on type
    let html = '';
    
    switch (data.type) {
        case 'professional':
            html = `
                <div class="verify-result-item">
                    <span class="verify-result-label">Nome:</span>
                    <span class="verify-result-value">${data.name || 'N/A'}</span>
                </div>
                <div class="verify-result-item">
                    <span class="verify-result-label">Código Profissional:</span>
                    <span class="verify-result-value">${data.code || 'N/A'}</span>
                </div>
                <div class="verify-result-item">
                    <span class="verify-result-label">Cédula:</span>
                    <span class="verify-result-value">${data.cedula || 'N/A'}</span>
                </div>
                <div class="verify-result-item">
                    <span class="verify-result-label">Estado:</span>
                    <span class="verify-result-value">
                        <strong style="color: ${getStatusColor(data.status)}">${data.status || 'N/A'}</strong>
                    </span>
                </div>
                ${data.delegation ? `
                    <div class="verify-result-item">
                        <span class="verify-result-label">Delegação:</span>
                        <span class="verify-result-value">${data.delegation}</span>
                    </div>
                ` : ''}
                ${data.category ? `
                    <div class="verify-result-item">
                        <span class="verify-result-label">Categoria:</span>
                        <span class="verify-result-value">${data.category}</span>
                    </div>
                ` : ''}
                ${data.registrationDate ? `
                    <div class="verify-result-item">
                        <span class="verify-result-label">Data de Registo:</span>
                        <span class="verify-result-value">${window.CDA.Utils.formatDate(data.registrationDate)}</span>
                    </div>
                ` : ''}
                ${data.expiryDate ? `
                    <div class="verify-result-item">
                        <span class="verify-result-label">Validade:</span>
                        <span class="verify-result-value">${window.CDA.Utils.formatDate(data.expiryDate)}</span>
                    </div>
                ` : ''}
            `;
            break;
            
        case 'company':
            html = `
                <div class="verify-result-item">
                    <span class="verify-result-label">Nome:</span>
                    <span class="verify-result-value">${data.name || 'N/A'}</span>
                </div>
                <div class="verify-result-item">
                    <span class="verify-result-label">Código:</span>
                    <span class="verify-result-value">${data.code || 'N/A'}</span>
                </div>
                <div class="verify-result-item">
                    <span class="verify-result-label">Estado:</span>
                    <span class="verify-result-value">
                        <strong style="color: ${getStatusColor(data.status)}">${data.status || 'N/A'}</strong>
                    </span>
                </div>
                ${data.registrationDate ? `
                    <div class="verify-result-item">
                        <span class="verify-result-label">Data de Registo:</span>
                        <span class="verify-result-value">${window.CDA.Utils.formatDate(data.registrationDate)}</span>
                    </div>
                ` : ''}
                ${data.linkedProfessionals ? `
                    <div class="verify-result-item">
                        <span class="verify-result-label">Profissionais Ligados:</span>
                        <span class="verify-result-value">${data.linkedProfessionals.length}</span>
                    </div>
                ` : ''}
            `;
            break;
            
        case 'document':
            html = `
                <div class="verify-result-item">
                    <span class="verify-result-label">Título:</span>
                    <span class="verify-result-value">${data.title || 'N/A'}</span>
                </div>
                <div class="verify-result-item">
                    <span class="verify-result-label">Tipo:</span>
                    <span class="verify-result-value">${data.type || 'N/A'}</span>
                </div>
                ${data.date ? `
                    <div class="verify-result-item">
                        <span class="verify-result-label">Data:</span>
                        <span class="verify-result-value">${window.CDA.Utils.formatDate(data.date)}</span>
                    </div>
                ` : ''}
                <div class="verify-result-item">
                    <span class="verify-result-label">Estado:</span>
                    <span class="verify-result-value">
                        <strong style="color: ${getStatusColor(data.status)}">${data.status || 'N/A'}</strong>
                    </span>
                </div>
                ${data.reference ? `
                    <div class="verify-result-item">
                        <span class="verify-result-label">Referência:</span>
                        <span class="verify-result-value">${data.reference}</span>
                    </div>
                ` : ''}
            `;
            break;
    }
    
    if (resultBody) {
        resultBody.innerHTML = html;
    }
    
    if (resultDate && data.lastUpdated) {
        resultDate.textContent = window.CDA.Utils.formatDate(data.lastUpdated);
    }
    
    container.hidden = false;
    
    // Scroll to result
    container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ============================================
// Exibir Erro de Verificação
// ============================================

function displayVerificationError(error, container) {
    const resultHeader = container.querySelector('.verify-result-header');
    const resultIcon = resultHeader?.querySelector('.icon');
    const resultTitle = resultHeader?.querySelector('h3');
    const resultBody = container.querySelector('.verify-result-body');
    
    // Update header
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
    
    // Build error body
    if (resultBody) {
        resultBody.innerHTML = `
            <div class="verify-result-item">
                <span class="verify-result-value" style="color: var(--color-error)">
                    ${error.message || 'Nenhum registo encontrado com os critérios especificados.'}
                </span>
            </div>
            <div class="verify-result-item">
                <span class="verify-result-value">
                    Verifique se os dados introduzidos estão correctos e tente novamente.
                </span>
            </div>
        `;
    }
    
    container.hidden = false;
    
    // Scroll to result
    container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ============================================
// Cor do Estado
// ============================================

function getStatusColor(status) {
    const statusColors = {
        'REGISTADO': 'var(--color-success)',
        'ACTIVO': 'var(--color-success)',
        'ACTIVA': 'var(--color-success)',
        'VÁLIDO': 'var(--color-success)',
        'SUSPENSO': 'var(--color-warning)',
        'INACTIVO': 'var(--color-error)',
        'INACTIVA': 'var(--color-error)',
        'EXPIRADO': 'var(--color-error)',
        'CANCELADO': 'var(--color-error)',
        'PENDENTE': 'var(--color-info)'
    };
    
    return statusColors[status.toUpperCase()] || 'var(--color-neutral-700)';
}

// ============================================
// Verificação por URL (para links directos)
// ============================================

function initVerificationFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const type = urlParams.get('type') || 'professional';
    
    if (code) {
        const verifyForm = document.getElementById('verify-form');
        const verifyResult = document.getElementById('verify-result');
        
        if (verifyForm && verifyResult) {
            const codeInput = verifyForm.querySelector('#verify-code');
            const typeInput = verifyForm.querySelector(`input[name="verify-type"][value="${type}"]`);
            
            if (codeInput) {
                codeInput.value = code;
            }
            
            if (typeInput) {
                typeInput.checked = true;
            }
            
            // Trigger verification
            performVerification(verifyForm, verifyResult);
        }
    }
}

// ============================================
// Gerar QR Code
// ============================================

function generateQRCode(data) {
    // This would use a QR code library in a real implementation
    // For now, we'll just return a placeholder
    
    const qrCodeData = {
        professional: `CDA-VERIFY:PRO:${data.code || data.cedula}`,
        company: `CDA-VERIFY:COMP:${data.code}`,
        document: `CDA-VERIFY:DOC:${data.reference || data.title}`
    };
    
    return qrCodeData[data.type] || '';
}

// ============================================
// Verificação por Cédula (leitura de QR Code)
// ============================================

function verifyByCard(cardData) {
    // Parse card data from QR code
    // Format: CDA-VERIFY:TYPE:ID
    const parts = cardData.split(':');
    if (parts.length >= 3) {
        const type = parts[1].toLowerCase();
        const id = parts.slice(2).join(':');
        
        // Redirect to verification page with pre-filled data
        const url = new URL('verificar.html', window.location.origin);
        url.searchParams.set('code', id);
        url.searchParams.set('type', type);
        window.location.href = url.toString();
    }
}

// ============================================
// Verificação em Lote
// ============================================

function verifyBatch(codes, type = 'professional') {
    return Promise.all(
        codes.map(code => 
            window.CDA.Home.simulateVerification(code, type)
                .then(data => ({ code, data, success: true }))
                .catch(error => ({ code, error, success: false }))
        )
    );
}

// ============================================
// Exportar Funções
// ============================================

window.CDA = window.CDA || {};
window.CDA.Verify = {
    initVerificationPage,
    performVerification,
    displayVerificationResult,
    displayVerificationError,
    getStatusColor,
    initVerificationFromURL,
    generateQRCode,
    verifyByCard,
    verifyBatch
};

// Initialize if on verification page
if (window.location.pathname.includes('verificar.html')) {
    window.CDA.Verify.initVerificationFromURL();
}

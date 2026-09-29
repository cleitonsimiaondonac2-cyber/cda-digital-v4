/**
 * CDA Digital - Counter Animation
 * Animação de contagem para números
 */

document.addEventListener('DOMContentLoaded', function() {
    const counters = document.querySelectorAll('.numero-value[data-count]');
    
    if (counters.length === 0) return;

    // Verificar se já estamos na viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.textContent.replace(/[^0-9]/g, '')) || parseInt(target.dataset.count);
                
                if (!isNaN(finalValue)) {
                    animateCounter(target, finalValue);
                }
                
                observer.unobserve(target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        observer.observe(counter);
    });

    function animateCounter(element, targetValue) {
        const duration = 2000; // 2 seconds
        const startTime = performance.now();
        const startValue = 0;
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out-cubic)
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOutCubic);
            
            // Atualizar o elemento
            const currentText = element.textContent;
            const hasPlus = currentText.includes('+');
            const hasPrefix = currentText.match(/^[^0-9]+/);
            
            let newText = currentValue.toString();
            
            if (hasPlus) {
                newText += '+';
            }
            
            if (hasPrefix) {
                newText = hasPrefix[0] + newText;
            }
            
            element.textContent = newText;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        requestAnimationFrame(updateCounter);
    }

    // Adicionar estilos para o counter
    const style = document.createElement('style');
    style.textContent = `
        .numero-value {
            transition: transform 0.3s ease;
        }
        
        .numero-value:hover {
            transform: scale(1.05);
        }
    `;
    document.head.appendChild(style);
});

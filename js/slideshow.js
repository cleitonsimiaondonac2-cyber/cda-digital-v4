/**
 * CDA Digital - Slideshow
 * Hero section slideshow with fade and slide animations
 */

document.addEventListener('DOMContentLoaded', function() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    const prevBtn = document.querySelector('.hero-prev');
    const nextBtn = document.querySelector('.hero-next');
    const counter = document.querySelector('.hero-counter');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoPlayInterval;
    const autoPlayDelay = 6000; // 6 seconds
    let isTransitioning = false;

    // Initialize
    function init() {
        if (slides.length === 0) return;
        
        // Show first slide
        showSlide(0);
        
        // Start auto-play
        startAutoPlay();
        
        // Add event listeners
        if (prevBtn) {
            prevBtn.addEventListener('click', prevSlide);
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', nextSlide);
        }
        
        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => showSlide(index));
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            }
        });
        
        // Pause on hover
        hero.addEventListener('mouseenter', pauseAutoPlay);
        hero.addEventListener('mouseleave', startAutoPlay);
        
        // Touch support
        let touchStartX = 0;
        let touchEndX = 0;
        
        hero.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        hero.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
    }
    
    function handleSwipe() {
        const swipeThreshold = 50; // Minimum swipe distance
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                nextSlide();
            } else {
                // Swipe right - previous slide
                prevSlide();
            }
        }
    }
    
    function showSlide(index) {
        if (isTransitioning) return;
        isTransitioning = true;
        
        // Validate index
        if (index < 0) {
            currentSlide = totalSlides - 1;
        } else if (index >= totalSlides) {
            currentSlide = 0;
        } else {
            currentSlide = index;
        }
        
        // Update slides
        slides.forEach((slide, i) => {
            if (i === currentSlide) {
                slide.classList.add('active');
                slide.classList.remove('slide-in', 'slide-out');
            } else {
                slide.classList.remove('active', 'slide-in');
                slide.classList.add('slide-out');
            }
        });
        
        // Update dots
        dots.forEach((dot, i) => {
            if (i === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        // Update counter
        if (counter) {
            const counterCurrent = counter.querySelector('.hero-counter-current');
            const counterTotal = counter.querySelector('.hero-counter-total');
            if (counterCurrent && counterTotal) {
                counterCurrent.textContent = String(currentSlide + 1).padStart(2, '0');
                counterTotal.textContent = String(totalSlides).padStart(2, '0');
            }
        }
        
        // Allow transition to complete
        setTimeout(() => {
            isTransitioning = false;
        }, 800);
    }
    
    function nextSlide() {
        if (isTransitioning) return;
        showSlide(currentSlide + 1);
        resetAutoPlay();
    }
    
    function prevSlide() {
        if (isTransitioning) return;
        showSlide(currentSlide - 1);
        resetAutoPlay();
    }
    
    function startAutoPlay() {
        clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(() => {
            nextSlide();
        }, autoPlayDelay);
    }
    
    function pauseAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    function resetAutoPlay() {
        pauseAutoPlay();
        startAutoPlay();
    }
    
    // Initialize slideshow
    init();
});

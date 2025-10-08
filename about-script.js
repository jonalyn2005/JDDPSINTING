/**
 * ===============================
 * ABOUT PAGE - Enhanced JavaScript Functionality
 * Ultra-smooth animations and progressive loading
 * ===============================
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ===============================
    // ENHANCED SMOOTH SCROLL FOR ABOUT PAGE
    // ===============================
    
    const scrollBtn = document.querySelector('.scroll-btn');
    const header = document.querySelector('.header');
    
    if (scrollBtn) {
        scrollBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                // Ultra-smooth scroll with easing
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Premium click effect
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }
        });
    }

    // ===============================
    // Individual Element Animations Only
    // (Section animations removed as requested)
    // ===============================
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    // NO section observers - only individual elements will animate

    // ===============================
    // Progressive Timeline Loading
    // ===============================
    
    const timelineItems = document.querySelectorAll('.timeline__item');
    const cardObserverOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -30px 0px'
    };

    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Progressive delay for timeline items while scrolling
                const allItems = Array.from(timelineItems);
                const itemIndex = allItems.indexOf(entry.target);
                
                setTimeout(() => {
                    entry.target.classList.add('visible');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, itemIndex * 150); // 150ms delay between items
            }
        });
    }, cardObserverOptions);

    // Observe timeline items
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });

    // ===============================
    // Enhanced Card Animations
    // ===============================
    
    const cardElements = document.querySelectorAll('.mission-vision__card, .certification__item, .team__card');
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, cardObserverOptions);

    cardElements.forEach(card => {
        cardObserver.observe(card);
    });

    // ===============================
    // Stats/Logros Number Animation
    // ===============================
    
    const statItems = document.querySelectorAll('.stat-about__item');
    const statNumbers = document.querySelectorAll('.stat-about__number');
    
    function animateNumber(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
            element.classList.add('counting');
        }, 16);
    }
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const numberElement = entry.target.querySelector('.stat-about__number');
                const targetNumber = parseInt(numberElement.getAttribute('data-number'));
                
                // Animate the stat item entrance
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                    
                    // Start number animation after item appears
                    setTimeout(() => {
                        animateNumber(numberElement, targetNumber);
                    }, 300);
                }, index * 200);
            }
        });
    }, { threshold: 0.3 });
    
    statItems.forEach(item => {
        statsObserver.observe(item);
    });

    // ===============================
    // Performance-Optimized Parallax
    // ===============================
    
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-about');
        
        if (hero && scrolled < window.innerHeight) {
            const yPos = -(scrolled * 0.3);
            hero.style.transform = `translateY(${yPos}px)`;
        }
        ticking = false;
    }

    function requestParallax() {
        if (!ticking && window.innerWidth > 768) { // Only on desktop
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestParallax, { passive: true });

    // ===============================
    // Enhanced Hover Effects - Simplified (no particles)
    // ===============================
    
    const allCards = document.querySelectorAll('.timeline__item, .mission-vision__card, .certification__item, .team__card');
    
    allCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('hovering')) {
                this.classList.add('hovering');
                this.style.transform = 'translateY(-12px) scale(1.02)';
                this.style.boxShadow = '0 24px 60px rgba(0, 0, 0, 0.15)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hovering');
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
        
        // Simple click effect without particles
        card.addEventListener('click', function() {
            this.style.animation = 'simplePulse 0.6s ease-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
    });

    // Simple pulse animation for clicks (no particles)
    const style = document.createElement('style');
    style.textContent = `
        @keyframes simplePulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);

    console.log('About page enhanced animations loaded successfully! 🎨✨');
});
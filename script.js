/**
 * JDD PAINTING - JavaScript Functionality
 * Modern, clean interactions for the landing page
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ===============================
    // Navigation & Header
    // ===============================
    
    const header = document.getElementById('header');
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav__link');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show-menu');
            document.body.style.overflow = 'hidden';
        });
    }

    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
            document.body.style.overflow = '';
        });
    }

    // Close menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
            document.body.style.overflow = '';
        });
    });

    // Header scroll effect
    function scrollHeader() {
        if (this.scrollY >= 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', scrollHeader);

    // ===============================
    // Smooth Scrolling
    // ===============================
    
    function smoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    smoothScroll();

    // ===============================
    // Active Navigation Link
    // ===============================
    
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + header.offsetHeight + 50;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);

    // ===============================
    // Gallery Filters
    // ===============================
    
    function initGalleryFilters() {
        const filterButtons = document.querySelectorAll('.gallery__filter');
        const galleryItems = document.querySelectorAll('.gallery__item');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                // Update active filter button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter gallery items
                galleryItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    
                    if (filter === 'all' || filter === category) {
                        item.style.display = 'block';
                        item.style.animation = 'fadeInUp 0.5s ease-out forwards';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    initGalleryFilters();

    // ===============================
    // FAQ Accordion
    // ===============================
    
    function initFAQAccordion() {
        const faqItems = document.querySelectorAll('.faq__item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq__question');
            
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all FAQ items
                faqItems.forEach(faqItem => {
                    faqItem.classList.remove('active');
                });
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }
    
    initFAQAccordion();

    // ===============================
    // Form Validation
    // ===============================
    
    function initFormValidation() {
        const form = document.getElementById('contact-form');
        const inputs = form.querySelectorAll('input, select, textarea');
        
        // Real-time validation
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    validateField(input);
                }
            });
        });
        
        // Form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });
            
            if (isValid) {
                submitForm(form);
            }
        });
    }
    
    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        const errorElement = document.getElementById(`${fieldName}-error`);
        let isValid = true;
        let errorMessage = '';
        
        // Clear previous error state
        field.classList.remove('error');
        if (errorElement) errorElement.textContent = '';
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'Este campo es obligatorio';
        }
        
        // Specific field validations
        if (value && fieldName === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Ingresa un email válido';
            }
        }
        
        if (value && fieldName === 'phone') {
            const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Ingresa un teléfono válido';
            }
        }
        
        if (fieldName === 'name' && value && value.length < 2) {
            isValid = false;
            errorMessage = 'El nombre debe tener al menos 2 caracteres';
        }
        
        // Privacy checkbox validation
        if (fieldName === 'privacy' && field.type === 'checkbox' && !field.checked) {
            isValid = false;
            errorMessage = 'Debes aceptar la política de privacidad';
        }
        
        // Show error if validation failed
        if (!isValid) {
            field.classList.add('error');
            if (errorElement) errorElement.textContent = errorMessage;
        }
        
        return isValid;
    }
    
    function submitForm(form) {
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        // Show loading state
        submitButton.innerHTML = '<i class="fas fa-spinner loading"></i> Enviando...';
        submitButton.disabled = true;
        
        // Get form data
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        // Create email body
        const emailBody = `
Nuevo mensaje desde JDD PAINTING:

Nombre: ${data.name}
Email: ${data.email}
Teléfono: ${data.phone}
Servicio: ${data.service}
Mensaje: ${data.message}

Enviado desde: ${window.location.href}
Fecha: ${new Date().toLocaleDateString('es-ES')}
        `;
        
        // Create mailto link
        const mailtoLink = `mailto:jonathan.moreno.17.20@gmail.com?subject=Solicitud de Cotización - JDD PAINTING&body=${encodeURIComponent(emailBody)}`;
        
        // Simulate form submission delay
        setTimeout(() => {
            // Open email client
            window.location.href = mailtoLink;
            
            // Reset form after opening email
            setTimeout(() => {
                form.reset();
                
                // Show success message
                showNotification('¡Gracias! Se ha abierto tu cliente de email. Por favor envía el mensaje.', 'success');
                
                // Reset button
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
                // Clear any error states
                const errorFields = form.querySelectorAll('.error');
                const errorMessages = form.querySelectorAll('.form__error');
                
                errorFields.forEach(field => field.classList.remove('error'));
                errorMessages.forEach(msg => msg.textContent = '');
            }, 1000);
            
        }, 1500);
    }
    
    initFormValidation();

    // ===============================
    // Scroll Animations
    // ===============================
    
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.service__card, .gallery__item, .testimonial__card, .faq__item');
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-on-scroll', 'animated');
                }
            });
        }, observerOptions);
        
        animatedElements.forEach(element => {
            element.classList.add('animate-on-scroll');
            observer.observe(element);
        });
    }
    
    initScrollAnimations();

    // ===============================
    // Counter Animation
    // ===============================
    
    function initCounterAnimation() {
        const counters = document.querySelectorAll('.hero__stat-number');
        let animatedCounters = false;
        
        const observerOptions = {
            threshold: 0.5
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animatedCounters) {
                    animatedCounters = true;
                    animateCounters();
                }
            });
        }, observerOptions);
        
        const heroStats = document.querySelector('.hero__stats');
        if (heroStats) {
            observer.observe(heroStats);
        }
        
        function animateCounters() {
            counters.forEach(counter => {
                const target = parseInt(counter.textContent);
                const increment = target / 100;
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    counter.textContent = Math.floor(current) + (counter.textContent.includes('+') ? '+' : '') + (counter.textContent.includes('%') ? '%' : '');
                }, 20);
            });
        }
    }
    
    initCounterAnimation();

    // ===============================
    // Animated Text in Hero
    // ===============================
    
    function initAnimatedText() {
        // Try both selectors to cover different implementations
        const animatedElement = document.querySelector('.hero__title--animated') || document.querySelector('.animated-text');
        if (!animatedElement) return;
        
        const wordsString = animatedElement.getAttribute('data-words');
        if (!wordsString) return;
        
        const words = wordsString.split(',');
        let currentIndex = 0;
        
        function changeWord() {
            // Add fade out class
            animatedElement.classList.add('fade-out');
            
            setTimeout(() => {
                // Change to next word
                currentIndex = (currentIndex + 1) % words.length;
                animatedElement.textContent = words[currentIndex];
                
                // Remove fade out class to fade in
                animatedElement.classList.remove('fade-out');
            }, 200);
        }
        
        // Start animation after 2 seconds, then every 3 seconds
        setTimeout(() => {
            setInterval(changeWord, 3000);
        }, 2000);
    }
    
    initAnimatedText();

    // ===============================
    // About Page Counter Animation
    // ===============================
    
    function initAboutCounters() {
        const counters = document.querySelectorAll('.stat-about__number');
        if (counters.length === 0) return;
        
        let animatedCounters = false;
        
        const observerOptions = {
            threshold: 0.5
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animatedCounters) {
                    animatedCounters = true;
                    animateAboutCounters();
                }
            });
        }, observerOptions);
        
        const statsSection = document.querySelector('.stats-about');
        if (statsSection) {
            observer.observe(statsSection);
        }
        
        function animateAboutCounters() {
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-number'));
                const increment = target / 100;
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    
                    // Add + or % suffix based on content
                    let suffix = '';
                    const label = counter.parentElement.querySelector('.stat-about__label').textContent;
                    if (label.includes('Proyectos') || label.includes('Clientes')) {
                        suffix = '+';
                    } else if (label.includes('%') || label.includes('Pinturas')) {
                        suffix = '%';
                    }
                    
                    counter.textContent = Math.floor(current) + suffix;
                }, 25);
            });
        }
    }
    
    initAboutCounters();

    // ===============================
    // Notification System
    // ===============================
    
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification__content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification__close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Add styles for notification
        if (!document.querySelector('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    background: white;
                    padding: 1rem 1.5rem;
                    border-radius: 0.5rem;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
                    z-index: 10000;
                    max-width: 400px;
                    border-left: 4px solid var(--color-primary);
                    animation: slideInRight 0.3s ease-out;
                }
                
                .notification--success {
                    border-left-color: #28a745;
                }
                
                .notification--error {
                    border-left-color: #dc3545;
                }
                
                .notification__content {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }
                
                .notification__content i {
                    color: var(--color-primary);
                }
                
                .notification--success .notification__content i {
                    color: #28a745;
                }
                
                .notification--error .notification__content i {
                    color: #dc3545;
                }
                
                .notification__close {
                    position: absolute;
                    top: 0.5rem;
                    right: 0.5rem;
                    background: none;
                    border: none;
                    cursor: pointer;
                    color: #6c757d;
                    padding: 0.25rem;
                }
                
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes slideOutRight {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(styles);
        }
        
        document.body.appendChild(notification);
        
        // Close button functionality
        const closeButton = notification.querySelector('.notification__close');
        closeButton.addEventListener('click', () => {
            notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // ===============================
    // Testimonials Carousel (Optional Enhancement)
    // ===============================
    
    function initTestimonialsCarousel() {
        const testimonialsGrid = document.querySelector('.testimonials__grid');
        if (!testimonialsGrid) return;
        
        // Add navigation dots if more than 3 testimonials on mobile
        const testimonials = testimonialsGrid.querySelectorAll('.testimonial__card');
        
        if (window.innerWidth <= 768 && testimonials.length > 1) {
            let currentIndex = 0;
            
            // Create navigation dots
            const navigation = document.createElement('div');
            navigation.className = 'testimonials__navigation';
            navigation.innerHTML = testimonials.map((_, index) => 
                `<button class="testimonials__dot ${index === 0 ? 'active' : ''}" data-index="${index}"></button>`
            ).join('');
            
            // Add styles for navigation
            const navStyles = document.createElement('style');
            navStyles.textContent = `
                .testimonials__navigation {
                    display: flex;
                    justify-content: center;
                    gap: 0.5rem;
                    margin-top: 2rem;
                }
                
                .testimonials__dot {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    border: none;
                    background: #e9ecef;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }
                
                .testimonials__dot.active {
                    background: var(--color-primary);
                }
                
                @media (min-width: 769px) {
                    .testimonials__navigation {
                        display: none;
                    }
                }
            `;
            document.head.appendChild(navStyles);
            
            testimonialsGrid.parentNode.appendChild(navigation);
            
            // Hide all testimonials except first on mobile
            testimonials.forEach((testimonial, index) => {
                if (index !== 0) {
                    testimonial.style.display = 'none';
                }
            });
            
            // Navigation functionality
            const dots = navigation.querySelectorAll('.testimonials__dot');
            dots.forEach(dot => {
                dot.addEventListener('click', () => {
                    const index = parseInt(dot.getAttribute('data-index'));
                    
                    // Hide current testimonial
                    testimonials[currentIndex].style.display = 'none';
                    dots[currentIndex].classList.remove('active');
                    
                    // Show new testimonial
                    testimonials[index].style.display = 'block';
                    dots[index].classList.add('active');
                    
                    currentIndex = index;
                });
            });
            
            // Auto-slide every 5 seconds
            setInterval(() => {
                const nextIndex = (currentIndex + 1) % testimonials.length;
                dots[nextIndex].click();
            }, 5000);
        }
    }
    
    initTestimonialsCarousel();

    // ===============================
    // Search Engine Optimization Enhancements
    // ===============================
    
    function initSEOEnhancements() {
        // Update page title dynamically based on scroll position
        const sections = document.querySelectorAll('section[id]');
        const originalTitle = document.title;
        
        function updatePageTitle() {
            const scrollPosition = window.scrollY + header.offsetHeight + 100;
            let currentSection = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentSection = sectionId;
                }
            });
            
            const sectionTitles = {
                'hero': 'JDD PAINTING - Pintura Profesional y Ecológica',
                'servicios': 'Servicios de Pintura - JDD PAINTING',
                'galeria': 'Galería de Proyectos - JDD PAINTING',
                'testimonios': 'Testimonios de Clientes - JDD PAINTING',
                'faq': 'Preguntas Frecuentes - JDD PAINTING',
                'contacto': 'Contacto - JDD PAINTING'
            };
            
            if (currentSection && sectionTitles[currentSection]) {
                document.title = sectionTitles[currentSection];
            } else {
                document.title = originalTitle;
            }
        }
        
        window.addEventListener('scroll', updatePageTitle);
        
        // Add structured data for FAQ
        const faqItems = document.querySelectorAll('.faq__item');
        if (faqItems.length > 0) {
            const faqSchema = {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": []
            };
            
            faqItems.forEach(item => {
                const question = item.querySelector('[itemprop="name"]').textContent;
                const answer = item.querySelector('[itemprop="text"]').textContent;
                
                faqSchema.mainEntity.push({
                    "@type": "Question",
                    "name": question,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": answer
                    }
                });
            });
            
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.textContent = JSON.stringify(faqSchema);
            document.head.appendChild(script);
        }
    }
    
    initSEOEnhancements();

    // ===============================
    // Performance Optimizations
    // ===============================
    
    function initPerformanceOptimizations() {
        // Lazy load images
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        }
        
        // Preload critical resources
        const criticalResources = [
            'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap'
        ];
        
        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource;
            link.as = 'style';
            document.head.appendChild(link);
        });
    }
    
    initPerformanceOptimizations();

    // ===============================
    // Accessibility Enhancements
    // ===============================
    
    function initAccessibilityEnhancements() {
        // Keyboard navigation for gallery filters
        const filterButtons = document.querySelectorAll('.gallery__filter');
        filterButtons.forEach(button => {
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    button.click();
                }
            });
        });
        
        // Keyboard navigation for FAQ items
        const faqQuestions = document.querySelectorAll('.faq__question');
        faqQuestions.forEach(question => {
            question.setAttribute('tabindex', '0');
            question.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    question.click();
                }
            });
        });
        
        // Skip to main content link
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.textContent = 'Saltar al contenido principal';
        skipLink.className = 'skip-link';
        
        const skipStyles = document.createElement('style');
        skipStyles.textContent = `
            .skip-link {
                position: absolute;
                top: -40px;
                left: 6px;
                background: var(--color-primary);
                color: white;
                padding: 8px;
                text-decoration: none;
                border-radius: 4px;
                z-index: 10001;
                transition: top 0.3s;
            }
            
            .skip-link:focus {
                top: 6px;
            }
        `;
        document.head.appendChild(skipStyles);
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Add ID to main element
        const main = document.querySelector('.main');
        if (main) main.setAttribute('id', 'main');
    }
    
    initAccessibilityEnhancements();

    // ===============================
    // Error Handling & Fallbacks
    // ===============================
    
    // Global error handler
    window.addEventListener('error', (e) => {
        console.error('JavaScript Error:', e.error);
        // You could send this to an error tracking service
    });
    
    // Check for required features and provide fallbacks
    if (!('IntersectionObserver' in window)) {
        // Fallback for older browsers without IntersectionObserver
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach(element => {
            element.classList.add('animated');
        });
    }
    
    console.log('🎨 JDD PAINTING website initialized successfully!');
});

// ===============================
// External API Integration (Optional)
// ===============================

// WhatsApp Integration
function openWhatsApp() {
    const phone = '1234567890'; // Replace with actual phone number
    const message = encodeURIComponent('Hola, me interesa solicitar un presupuesto para un proyecto de pintura.');
    const whatsappURL = `https://wa.me/${phone}?text=${message}`;
    window.open(whatsappURL, '_blank');
}

// Add WhatsApp floating button
document.addEventListener('DOMContentLoaded', function() {
    const whatsappButton = document.createElement('a');
    whatsappButton.href = '#';
    whatsappButton.className = 'whatsapp-float';
    whatsappButton.innerHTML = '<i class="fab fa-whatsapp"></i>';
    whatsappButton.setAttribute('aria-label', 'Contactar por WhatsApp');
    whatsappButton.addEventListener('click', (e) => {
        e.preventDefault();
        openWhatsApp();
    });
    
    const whatsappStyles = document.createElement('style');
    whatsappStyles.textContent = `
        .whatsapp-float {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: #25d366;
            color: white;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            text-decoration: none;
            box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
            z-index: 1000;
            transition: all 0.3s ease;
            animation: pulse 2s infinite;
        }
        
        .whatsapp-float:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(37, 211, 102, 0.4);
        }
        
        @keyframes pulse {
            0% {
                box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7);
            }
            70% {
                box-shadow: 0 0 0 10px rgba(37, 211, 102, 0);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
            }
        }
        
        @media (max-width: 768px) {
            .whatsapp-float {
                bottom: 20px;
                right: 20px;
                width: 50px;
                height: 50px;
                font-size: 1.25rem;
            }
        }
    `;
    document.head.appendChild(whatsappStyles);
    document.body.appendChild(whatsappButton);

    // Advanced Scroll Animations
    // ===============================
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                
                // Staggered animations for card grids
                if (entry.target.classList.contains('services__grid')) {
                    const cards = entry.target.querySelectorAll('.service__card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.animation = `slideInUp 0.6s ease forwards`;
                            card.style.animationDelay = `${index * 0.1}s`;
                        }, index * 100);
                    });
                }
                
                if (entry.target.classList.contains('gallery__grid')) {
                    const items = entry.target.querySelectorAll('.gallery__item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.animation = `zoomIn 0.6s ease forwards`;
                            item.style.animationDelay = `${index * 0.05}s`;
                        }, index * 80);
                    });
                }
                
                if (entry.target.classList.contains('testimonials__grid')) {
                    const testimonials = entry.target.querySelectorAll('.testimonial__card');
                    testimonials.forEach((testimonial, index) => {
                        setTimeout(() => {
                            testimonial.style.animation = `fadeInLeft 0.6s ease forwards`;
                            testimonial.style.animationDelay = `${index * 0.1}s`;
                        }, index * 150);
                    });
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Initialize scroll animations
    const animatedSections = document.querySelectorAll('.services__grid, .gallery__grid, .testimonials__grid');
    animatedSections.forEach(section => {
        animationObserver.observe(section);
    });

    // ===============================
    // Scroll Features Initialization
    // ===============================
    
    // Initialize scroll features immediately to prevent flicker
    const initializeScrollFeatures = () => {
        // Create scroll indicator
        if (!document.querySelector('.scroll-indicator')) {
            const indicator = document.createElement('div');
            indicator.className = 'scroll-indicator';
            indicator.innerHTML = '<div class="scroll-progress"></div>';
            document.body.appendChild(indicator);
        }
        
        // Create back to top button
        if (!document.querySelector('.back-to-top')) {
            const backToTop = document.createElement('button');
            backToTop.className = 'back-to-top';
            backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
            backToTop.setAttribute('aria-label', 'Volver arriba');
            backToTop.setAttribute('title', 'Volver arriba');
            
            backToTop.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
            
            document.body.appendChild(backToTop);
        }
    };
    
    // Initialize immediately
    initializeScrollFeatures();

    // ===============================
    // Smooth parallax effect for hero section
    // ===============================
    // ===============================
    // NEW Simple Scroll Animations
    // ===============================
    
    const createScrollAnimations = () => {
        // Crear el observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Simplemente agregar la clase de animación
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Seleccionar todos los elementos a animar
        const elementsToAnimate = document.querySelectorAll(
            '.service__card, .gallery__item, .testimonial__card, .section__title, .section__subtitle, .faq__item'
        );
        
        // Agregar clase inicial y observar
        elementsToAnimate.forEach((el, index) => {
            el.classList.add('fade-in');
            el.style.animationDelay = `${index * 0.1}s`;
            observer.observe(el);
        });
    };
    
    // Inicializar las animaciones
    setTimeout(createScrollAnimations, 500);

    // ===============================
    // Counter Animation
    // ===============================
    
    const initCounters = () => {
        const counters = document.querySelectorAll('.counter, [data-counter]');
        
        const countObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.textContent) || 100;
                    let current = 0;
                    const increment = target / 50;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            counter.textContent = target;
                            clearInterval(timer);
                        } else {
                            counter.textContent = Math.floor(current);
                        }
                    }, 40);
                    
                    countObserver.unobserve(counter);
                }
            });
        });
        
        counters.forEach(counter => countObserver.observe(counter));
    };
    
    initCounters();

    // ===============================
    // Optimized scroll handler
    // ===============================
    let ticking = false;
    
    const handleScroll = () => {
        const scrolled = window.pageYOffset;
        
        // Parallax effect for hero (only if hero exists)
        const heroElements = document.querySelectorAll('.hero .container > *');
        if (heroElements.length > 0) {
            heroElements.forEach((element, index) => {
                const rate = scrolled * -0.5 * (index + 1) * 0.1;
                element.style.transform = `translateY(${rate}px)`;
            });
        }
        
        // Update scroll progress
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = documentHeight > 0 ? (scrolled / documentHeight) * 100 : 0;
        
        const progressBar = document.querySelector('.scroll-progress');
        if (progressBar) {
            progressBar.style.width = Math.min(100, Math.max(0, scrollPercentage)) + '%';
        }
        
        // Show/hide back to top button
        const backToTop = document.querySelector('.back-to-top');
        if (backToTop) {
            if (scrolled > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }
        
        ticking = false;
    };
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(handleScroll);
            ticking = true;
        }
    });
    
    // Initial call to set correct states
    handleScroll();
    
    // ===============================
    // Typewriter Animation
    // ===============================
    
    const initTypewriterEffect = () => {
        const typewriterElements = document.querySelectorAll('.typewriter, .hero__title .animated-text');
        
        const typewriterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startTypewriter(entry.target);
                    typewriterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        typewriterElements.forEach(element => {
            typewriterObserver.observe(element);
        });
    };
    
    const startTypewriter = (element) => {
        const text = element.textContent;
        element.textContent = '';
        element.style.opacity = '1';
        
        let index = 0;
        const timer = setInterval(() => {
            element.textContent += text.charAt(index);
            index++;
            
            if (index >= text.length) {
                clearInterval(timer);
            }
        }, 50);
    };
    
    // Inicializar efecto typewriter
    initTypewriterEffect();

    // ===============================
    // Enhanced Smooth Scrolling
    // ===============================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===============================
    // Wave Effect on Buttons
    // ===============================
    
    const initWaveEffects = () => {
        const buttons = document.querySelectorAll('.btn, .cta__button');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const wave = document.createElement('div');
                wave.classList.add('wave-effect');
                
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                wave.style.width = wave.style.height = size + 'px';
                wave.style.left = x + 'px';
                wave.style.top = y + 'px';
                
                this.appendChild(wave);
                
                setTimeout(() => {
                    wave.remove();
                }, 600);
            });
        });
    };
    
    // Inicializar efectos de onda
    initWaveEffects();
});

// Simple CSS for animations
const simpleAnimationCSS = document.createElement('style');
simpleAnimationCSS.textContent = `
    /* Simple fade in animation */
    .fade-in {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Service cards */
    .service__card.fade-in {
        transform: translateY(50px) scale(0.9);
    }
    
    .service__card.fade-in.visible {
        transform: translateY(0) scale(1);
    }
    
    /* Gallery items */
    .gallery__item.fade-in {
        transform: scale(0.8);
    }
    
    .gallery__item.fade-in.visible {
        transform: scale(1);
    }
    
    /* Testimonials */
    .testimonial__card.fade-in {
        transform: translateX(-50px);
    }
    
    .testimonial__card.fade-in.visible {
        transform: translateX(0);
    }
    
    /* Titles */
    .section__title.fade-in {
        transform: translateY(-20px);
    }
    
    .section__title.fade-in.visible {
        transform: translateY(0);
    }
    
    .back-to-top {
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .back-to-top.visible {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }
`;
document.head.appendChild(simpleAnimationCSS);

// Estilos adicionales para efectos
const scrollAnimationCSS = document.createElement('style');
scrollAnimationCSS.textContent = `
    .wave-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: wave 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes wave {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(scrollAnimationCSS);

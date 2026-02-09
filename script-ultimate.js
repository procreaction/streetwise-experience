// ==========================================
// SUPERMEDIA ULTIMATE JAVASCRIPT
// Scroll Reveals + 3D Tilt + Parallax
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // SCROLL REVEAL ANIMATIONS (Spaceship.com Style)
    // ==========================================
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                // Fade out when scrolling past (spaceship.com style)
                if (entry.boundingClientRect.top < 0) {
                    entry.target.classList.remove('visible');
                }
            }
        });
    }, revealOptions);
    
    // Observe all reveal sections
    document.querySelectorAll('.reveal-section').forEach(section => {
        revealObserver.observe(section);
    });
    
    // ==========================================
    // 3D TILT EFFECT (like v1)
    // ==========================================
    
    const tiltCards = document.querySelectorAll('[data-tilt]');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
    
    // ==========================================
    // PARALLAX ON HERO
    // ==========================================
    
    let ticking = false;
    const hero = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image');
    const heroContent = document.querySelector('.hero-content');
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const scrolled = window.pageYOffset;
                
                if (hero && scrolled < hero.offsetHeight) {
                    // Parallax for hero image
                    if (heroImage) {
                        heroImage.style.transform = `translateY(${scrolled * 0.5}px) scale(1.1)`;
                    }
                    
                    // Fade out hero content
                    if (heroContent) {
                        const opacity = 1 - (scrolled / (hero.offsetHeight * 0.7));
                        heroContent.style.opacity = Math.max(0, opacity);
                    }
                    
                    // Hide scroll indicator
                    const scrollIndicator = document.querySelector('.scroll-indicator');
                    if (scrollIndicator) {
                        scrollIndicator.style.opacity = scrolled > 100 ? '0' : '1';
                    }
                }
                
                ticking = false;
            });
            
            ticking = true;
        }
    });
    
    // ==========================================
    // SMOOTH SCROLL FOR SCROLL INDICATOR
    // ==========================================
    
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const problemSection = document.querySelector('.problem-section');
            if (problemSection) {
                problemSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // ==========================================
    // STAGGER ANIMATION FOR SOLUTION STEPS
    // ==========================================
    
    const solutionSteps = document.querySelectorAll('.solution-step');
    
    if (solutionSteps.length > 0) {
        const solutionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    solutionSteps.forEach((step, index) => {
                        setTimeout(() => {
                            step.style.opacity = '1';
                            step.style.transform = 'translateY(0)';
                        }, index * 200);
                    });
                }
            });
        }, { threshold: 0.3 });
        
        const solutionIntro = document.querySelector('.solution-intro');
        if (solutionIntro) {
            // Set initial state
            solutionSteps.forEach(step => {
                step.style.opacity = '0';
                step.style.transform = 'translateY(30px)';
                step.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            });
            
            solutionObserver.observe(solutionIntro);
        }
    }
    
    // ==========================================
    // STAGGER ANIMATION FOR SERVICE CARDS
    // ==========================================
    
    const serviceCards = document.querySelectorAll('.service-card');
    
    if (serviceCards.length > 0) {
        const servicesObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    serviceCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 150);
                    });
                }
            });
        }, { threshold: 0.2 });
        
        const servicesSection = document.querySelector('.services-section');
        if (servicesSection) {
            // Set initial state
            serviceCards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(40px)';
                card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            });
            
            servicesObserver.observe(servicesSection);
        }
    }
    
    // ==========================================
    // STAGGER ANIMATION FOR TESTIMONIALS
    // ==========================================
    
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    if (testimonialCards.length > 0) {
        const testimonialsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    testimonialCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 150);
                    });
                }
            });
        }, { threshold: 0.2 });
        
        const testimonialsSection = document.querySelector('.testimonials-section');
        if (testimonialsSection) {
            // Set initial state
            testimonialCards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            });
            
            testimonialsObserver.observe(testimonialsSection);
        }
    }
    
    // ==========================================
    // PARALLAX ON PROBLEM IMAGE
    // ==========================================
    
    const problemImage = document.querySelector('.problem-image');
    const problemSection = document.querySelector('.problem-section');
    
    if (problemImage && problemSection) {
        window.addEventListener('scroll', function() {
            const rect = problemSection.getBoundingClientRect();
            const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
            
            if (scrollPercent >= 0 && scrollPercent <= 1) {
                const translateY = (scrollPercent - 0.5) * 50;
                problemImage.style.transform = `translateY(${translateY}px)`;
            }
        });
    }
    
    // ==========================================
    // PARALLAX ON WHY IMAGE
    // ==========================================
    
    const whyImage = document.querySelector('.why-visual img');
    const whySection = document.querySelector('.why-section');
    
    if (whyImage && whySection) {
        window.addEventListener('scroll', function() {
            const rect = whySection.getBoundingClientRect();
            const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
            
            if (scrollPercent >= 0 && scrollPercent <= 1) {
                const translateY = (scrollPercent - 0.5) * 80;
                whyImage.style.transform = `translateY(${translateY}px) scale(1.1)`;
            }
        });
    }
    
    // ==========================================
    // SMOOTH SCROLL FOR ALL ANCHOR LINKS
    // ==========================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

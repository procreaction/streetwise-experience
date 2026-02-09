// ==========================================
// SUPERMEDIA CINEMATIC SCROLL EFFECTS
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
    // ==========================================
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('.split-section, .decorative-break, .fullscreen-moment, .challenge-section, .why-section, .projects-teaser, .final-cta');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // ==========================================
    // PARALLAX EFFECT ON HERO
    // ==========================================
    
    let ticking = false;
    const hero = document.querySelector('.hero-fullscreen');
    const heroImage = document.querySelector('.hero-bg');
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const scrolled = window.pageYOffset;
                
                if (hero && scrolled < hero.offsetHeight) {
                    // Parallax for hero image
                    if (heroImage) {
                        heroImage.style.transform = `translateY(${scrolled * 0.5}px) scale(1.1)`;
                    }
                    
                    // Fade out hero text
                    const heroText = document.querySelector('.hero-text');
                    if (heroText) {
                        const opacity = 1 - (scrolled / (hero.offsetHeight * 0.8));
                        heroText.style.opacity = Math.max(0, opacity);
                    }
                    
                    // Hide scroll hint
                    const scrollHint = document.querySelector('.scroll-hint');
                    if (scrollHint) {
                        scrollHint.style.opacity = scrolled > 100 ? '0' : '1';
                    }
                }
                
                ticking = false;
            });
            
            ticking = true;
        }
    });
    
    // ==========================================
    // PARALLAX FOR SPLIT IMAGES
    // ==========================================
    
    const splitImages = document.querySelectorAll('.split-image img');
    
    splitImages.forEach(img => {
        const parent = img.closest('.split-section');
        
        if (parent) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        window.addEventListener('scroll', function() {
                            const rect = parent.getBoundingClientRect();
                            const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
                            
                            if (scrollPercent >= 0 && scrollPercent <= 1) {
                                const translateY = (scrollPercent - 0.5) * 100;
                                img.style.transform = `translateY(${translateY}px) scale(1.1)`;
                            }
                        });
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(parent);
        }
    });
    
    // ==========================================
    // SMOOTH SCROLL FOR SCROLL HINT
    // ==========================================
    
    const scrollHint = document.querySelector('.scroll-hint');
    
    if (scrollHint) {
        scrollHint.addEventListener('click', function() {
            const firstSection = document.querySelector('.split-section');
            if (firstSection) {
                firstSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // ==========================================
    // FADE IN DECORATIVE BREAKS ON SCROLL
    // ==========================================
    
    const decorativeBreaks = document.querySelectorAll('.decorative-break img');
    
    decorativeBreaks.forEach(img => {
        const parent = img.closest('.decorative-break');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    img.style.opacity = '0.6';
                    img.style.transform = 'scale(1)';
                    img.style.transition = 'opacity 1.5s ease, transform 1.5s ease';
                } else {
                    img.style.opacity = '0.3';
                    img.style.transform = 'scale(1.2)';
                }
            });
        }, { threshold: 0.3 });
        
        if (parent) {
            observer.observe(parent);
        }
    });
    
    // ==========================================
    // STAGGER ANIMATION FOR CHALLENGE ITEMS
    // ==========================================
    
    const challengeItems = document.querySelectorAll('.challenge-item');
    
    if (challengeItems.length > 0) {
        const challengeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    challengeItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 150);
                    });
                }
            });
        }, { threshold: 0.3 });
        
        const challengeSection = document.querySelector('.challenge-section');
        if (challengeSection) {
            // Set initial state
            challengeItems.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(30px)';
                item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            });
            
            challengeObserver.observe(challengeSection);
        }
    }
    
    // ==========================================
    // STAGGER ANIMATION FOR PROJECT ITEMS
    // ==========================================
    
    const projectItems = document.querySelectorAll('.project-item');
    
    if (projectItems.length > 0) {
        const projectObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    projectItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, index * 200);
                    });
                }
            });
        }, { threshold: 0.2 });
        
        const projectsSection = document.querySelector('.projects-teaser');
        if (projectsSection) {
            // Set initial state
            projectItems.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.9)';
                item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            });
            
            projectObserver.observe(projectsSection);
        }
    }
    
    // ==========================================
    // PERFORMANCE: PAUSE GIFS WHEN NOT VISIBLE
    // ==========================================
    
    const gifImages = document.querySelectorAll('img[src$=".gif"]');
    
    const gifObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const img = entry.target;
            
            if (!entry.isIntersecting) {
                // Store original src
                if (!img.dataset.originalSrc) {
                    img.dataset.originalSrc = img.src;
                }
                // Pause by loading static version (if available) or just hide
                // This is optional - GIFs will keep playing in background
            }
        });
    }, { threshold: 0.1 });
    
    gifImages.forEach(img => {
        gifObserver.observe(img);
    });
    
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

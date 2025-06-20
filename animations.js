// Advanced animations and interactions
document.addEventListener('DOMContentLoaded', function() {
    initAdvancedAnimations();
    initParticleBackground();
    initHoverEffects();
    initProgressCounters();
    initTimelineAnimations();
});

// Advanced scroll animations with stagger effect
function initAdvancedAnimations() {
    // Staggered animations for project cards
    const projectCards = document.querySelectorAll('.project-card');
    const projectObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.2 });

    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.6s ease';
        projectObserver.observe(card);
    });

    // Skill category animations
    const skillCategories = document.querySelectorAll('.skill-category');
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 150);
            }
        });
    }, { threshold: 0.3 });

    skillCategories.forEach(category => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(30px) scale(0.95)';
        category.style.transition = 'all 0.5s ease';
        skillObserver.observe(category);
    });
}

// Particle background for hero section
function initParticleBackground() {
    const hero = document.querySelector('.hero');
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 2;
        overflow: hidden;
    `;

    // Create particles
    for (let i = 0; i < 50; i++) {
        createParticle(particleContainer);
    }

    hero.appendChild(particleContainer);
}

function createParticle(container) {
    const particle = document.createElement('div');
    const size = Math.random() * 4 + 1;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const duration = Math.random() * 20 + 10;

    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        left: ${x}px;
        top: ${y}px;
        animation: float ${duration}s infinite linear;
    `;

    container.appendChild(particle);

    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, duration * 1000);
}

// Advanced hover effects
function initHoverEffects() {
    // Project card 3D tilt effect
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });

    // Skill bar glow effect
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        bar.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 20px rgba(56, 178, 172, 0.6)';
        });
        
        bar.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });

    // Button magnetic effect
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        
        button.addEventListener('mouseleave', function() {
            button.style.transform = 'translate(0, 0)';
        });
    });
}

// Animated counters for achievements
function initProgressCounters() {
    const counters = [
        { element: '.projects-count', target: 3, suffix: '+' },
        { element: '.publications-count', target: 3, suffix: '' },
        { element: '.experience-years', target: 2, suffix: '+' }
    ];

    // Create counter elements if they don't exist
    const aboutSection = document.querySelector('.about');
    if (aboutSection && !document.querySelector('.stats-container')) {
        const statsContainer = document.createElement('div');
        statsContainer.className = 'stats-container';
        statsContainer.style.cssText = `
            display: flex;
            justify-content: center;
            gap: 3rem;
            margin: 3rem 0;
            flex-wrap: wrap;
        `;

        const stats = [
            { label: 'AI Projects', count: 3, class: 'projects-count' },
            { label: 'Publications', count: 3, class: 'publications-count' },
            { label: 'Years Experience', count: 2, class: 'experience-years' }
        ];

        stats.forEach(stat => {
            const statElement = document.createElement('div');
            statElement.className = 'stat-item';
            statElement.style.cssText = `
                text-align: center;
                padding: 1.5rem;
                background: white;
                border-radius: 15px;
                box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
                min-width: 150px;
            `;
            
            statElement.innerHTML = `
                <div class="${stat.class}" style="font-size: 2.5rem; font-weight: 700; color: #38b2ac; margin-bottom: 0.5rem;">0</div>
                <div style="color: #4a5568; font-weight: 500;">${stat.label}</div>
            `;
            
            statsContainer.appendChild(statElement);
        });

        aboutSection.appendChild(statsContainer);
    }

    // Animate counters
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsContainer = document.querySelector('.stats-container');
    if (statsContainer) {
        counterObserver.observe(statsContainer);
    }
}

function animateCounters() {
    const counters = [
        { selector: '.projects-count', target: 3, suffix: '+' },
        { selector: '.publications-count', target: 3, suffix: '' },
        { selector: '.experience-years', target: 2, suffix: '+' }
    ];

    counters.forEach(counter => {
        const element = document.querySelector(counter.selector);
        if (element) {
            animateCounter(element, 0, counter.target, counter.suffix, 2000);
        }
    });
}

function animateCounter(element, start, end, suffix, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 16);
}

// Timeline animations
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.3 });

    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
        item.style.transition = 'all 0.6s ease';
        timelineObserver.observe(item);
    });
}

// Mouse trail effect
function initMouseTrail() {
    const trail = [];
    const trailLength = 10;

    document.addEventListener('mousemove', function(e) {
        trail.push({ x: e.clientX, y: e.clientY });
        
        if (trail.length > trailLength) {
            trail.shift();
        }
        
        updateTrail();
    });

    function updateTrail() {
        const existingTrails = document.querySelectorAll('.mouse-trail');
        existingTrails.forEach(t => t.remove());
        
        trail.forEach((point, index) => {
            const trailElement = document.createElement('div');
            trailElement.className = 'mouse-trail';
            trailElement.style.cssText = `
                position: fixed;
                width: ${(index + 1) * 2}px;
                height: ${(index + 1) * 2}px;
                background: rgba(56, 178, 172, ${(index + 1) / trailLength * 0.5});
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: ${point.x}px;
                top: ${point.y}px;
                transform: translate(-50%, -50%);
                transition: all 0.1s ease;
            `;
            
            document.body.appendChild(trailElement);
            
            setTimeout(() => {
                if (trailElement.parentNode) {
                    trailElement.parentNode.removeChild(trailElement);
                }
            }, 100);
        });
    }
}

// Intersection Observer for reveal animations
function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

// Add CSS for animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes float {
        0% {
            transform: translateY(0px) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .timeline-item.animate-in {
        opacity: 1 !important;
        transform: translateX(0) !important;
    }
    
    .reveal {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.6s ease;
    }
    
    .reveal.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .project-card {
        transition: all 0.3s ease;
    }
    
    .skill-progress {
        transition: all 0.3s ease;
    }
    
    .btn {
        transition: all 0.3s ease;
    }
    
    @media (prefers-reduced-motion: reduce) {
        .project-card,
        .skill-progress,
        .btn,
        .timeline-item,
        .reveal {
            transition: none !important;
            animation: none !important;
        }
    }
`;
document.head.appendChild(animationStyles);

// Initialize mouse trail (optional - can be enabled/disabled)
// initMouseTrail();

// Initialize reveal animations
document.addEventListener('DOMContentLoaded', function() {
    initRevealAnimations();
});

// Smooth page transitions
function initPageTransitions() {
    // Add loading animation
    const loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #1a365d, #38b2ac);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `;
    
    loader.innerHTML = `
        <div style="text-align: center; color: white;">
            <div style="width: 50px; height: 50px; border: 3px solid rgba(255,255,255,0.3); border-top: 3px solid white; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 1rem;"></div>
            <p style="font-size: 1.2rem; font-weight: 500;">Loading Portfolio...</p>
        </div>
    `;
    
    document.body.appendChild(loader);
    
    // Hide loader when page is loaded
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                if (loader.parentNode) {
                    loader.parentNode.removeChild(loader);
                }
            }, 500);
        }, 1000);
    });
}

// Add spin animation for loader
const loaderStyles = document.createElement('style');
loaderStyles.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(loaderStyles);

// Initialize page transitions
initPageTransitions();


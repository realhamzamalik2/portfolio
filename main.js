// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initTypingAnimation();
    initScrollAnimations();
    initSkillBars();
    initProjectModals();
    initContactForm();
    initSmoothScrolling();
    initScrollIndicator();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Active link highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Typing animation for hero section
function initTypingAnimation() {
    const typedTextElement = document.getElementById('typed-text');
    const texts = [
        'Senior SEO Analyst',
        'AI Researcher',
        'Computer Vision Expert',
        'Machine Learning Engineer',
        'Deep Learning Specialist'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typedTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typedTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before next text
        }

        setTimeout(typeText, typeSpeed);
    }

    typeText();
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.section-header, .about-story, .highlight-item, .timeline-item, .project-card, .skill-category, .publication-item, .contact-item');
    
    animatedElements.forEach((element, index) => {
        element.classList.add('fade-in');
        element.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(element);
    });
}

// Skill bars animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                setTimeout(() => {
                    skillBar.style.width = width + '%';
                }, 200);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Project modals
function initProjectModals() {
    const modal = document.getElementById('projectModal');
    const modalContent = document.getElementById('modalContent');
    const closeBtn = document.querySelector('.close');
    const projectCards = document.querySelectorAll('.project-card');

    const projectDetails = {
        1: {
            title: 'ATSLA: Attention-driven Temporal-Spatial Learning Architecture',
            status: 'Submitted to Neurocomputing',
            role: 'First Author',
            overview: 'Developed a novel architecture for dynamic facial expression recognition that incorporates attention-driven temporal-spatial learning mechanisms. The proposed ATSLA framework demonstrates improved accuracy in real-time facial expression analysis through innovative temporal processing techniques.',
            technical: [
                'Framework: PyTorch',
                'Core Technologies: Deep Learning, Computer Vision',
                'Architecture: Attention Mechanism, CNN, LSTM',
                'Data Processing: Real-time Video Analysis'
            ],
            achievements: [
                'Improved accuracy in dynamic facial expression recognition',
                'Real-time processing capability',
                'Novel attention mechanism implementation',
                'Enhanced temporal-spatial feature learning'
            ],
            challenges: 'The main challenge was developing an efficient attention mechanism that could process temporal sequences while maintaining real-time performance. We solved this by implementing a novel temporal-spatial learning architecture that balances accuracy with computational efficiency.',
            impact: 'This research contributes to the advancement of human-computer interaction systems and has potential applications in emotion recognition, security systems, and healthcare monitoring.'
        },
        2: {
            title: 'SA: Lightweight Neural Network with Shuffle Attention',
            status: 'Published - ICCAAS 2024',
            role: 'Co-author',
            overview: 'Developed an efficient lightweight neural network for facial expression recognition with focus on model optimization and performance validation. The SA architecture incorporates shuffle attention mechanisms to achieve high accuracy while maintaining computational efficiency.',
            technical: [
                'Framework: PyTorch',
                'Architecture: Shuffle Attention Mechanism',
                'Optimization: Network architecture efficiency',
                'Testing: Comprehensive performance validation'
            ],
            achievements: [
                'Published in ICCAAS conference 2024',
                'Achieved optimal balance between accuracy and efficiency',
                'Successful model optimization',
                'Comprehensive performance validation'
            ],
            challenges: 'The primary challenge was optimizing the network architecture for efficiency without compromising accuracy. We addressed this through innovative shuffle attention mechanisms and extensive performance testing.',
            impact: 'This work demonstrates the potential for deploying efficient AI models in resource-constrained environments, making facial expression recognition more accessible for mobile and edge computing applications.'
        },
        3: {
            title: 'FRU-Adapter: Frame Recalibration Unit',
            status: 'Submitted to Electronics',
            role: 'Co-author',
            overview: 'Developed a frame recalibration system for dynamic facial expression recognition with advanced data preprocessing pipeline. The FRU-Adapter focuses on improving the quality and consistency of input data for better recognition performance.',
            technical: [
                'Framework: PyTorch',
                'Data Processing: Advanced preprocessing pipeline',
                'Performance: Evaluation and optimization',
                'Architecture: System design collaboration'
            ],
            achievements: [
                'Implemented comprehensive data preprocessing pipeline',
                'Conducted performance evaluation and optimization',
                'Collaborated on innovative system architecture design',
                'Improved data quality for recognition systems'
            ],
            challenges: 'The main challenge was developing a robust preprocessing pipeline that could handle various lighting conditions and image qualities. We solved this through adaptive frame recalibration techniques.',
            impact: 'This research improves the reliability and accuracy of facial expression recognition systems by ensuring consistent data quality, which is crucial for real-world applications.'
        }
    };

    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const project = projectDetails[projectId];
            
            if (project) {
                modalContent.innerHTML = `
                    <h2>${project.title}</h2>
                    <div class="modal-status ${project.status.toLowerCase().includes('published') ? 'published' : 'submitted'}">
                        ${project.status}
                    </div>
                    <div class="modal-role">Role: ${project.role}</div>
                    
                    <h3>Project Overview</h3>
                    <p>${project.overview}</p>
                    
                    <h3>Technical Implementation</h3>
                    <ul>
                        ${project.technical.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                    
                    <h3>Key Achievements</h3>
                    <ul>
                        ${project.achievements.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                    
                    <h3>Challenges & Solutions</h3>
                    <p>${project.challenges}</p>
                    
                    <h3>Impact & Applications</h3>
                    <p>${project.impact}</p>
                `;
                
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Thank you for your message! I will get back to you soon.', 'success');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#48bb78' : '#f56565'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Smooth scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll indicator
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    });
}

// Parallax effect for hero background
function initParallaxEffect() {
    const heroBackground = document.querySelector('.hero-background');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Initialize parallax effect
document.addEventListener('DOMContentLoaded', function() {
    initParallaxEffect();
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(function() {
    // Scroll-dependent functions can be called here
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', function() {
    initLazyLoading();
});

// Add CSS animations for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
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
document.head.appendChild(notificationStyles);


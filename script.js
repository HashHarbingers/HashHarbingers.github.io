// ==================== //
// HashHarbingers Web3 Website
// ==================== //

// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

function toggleMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

hamburger.addEventListener('click', toggleMenu);

// Close menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed nav
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Animation Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements and observe them
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.about-card, .team-card, .social-btn');
    elements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
};

// Initialize animations when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animateOnScroll);
} else {
    animateOnScroll();
}

// Navbar Background on Scroll
let lastScroll = 0;
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.style.background = 'rgba(10, 10, 10, 0.98)';
        nav.style.boxShadow = '0 5px 20px rgba(0, 217, 255, 0.1)';
    } else {
        nav.style.background = 'rgba(10, 10, 10, 0.95)';
        nav.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Cursor Effect (Optional - Enhanced Experience)
const createCursorEffect = () => {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-glow';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(0, 217, 255, 0.3), transparent);
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s ease;
        display: none;
    `;
    document.body.appendChild(cursor);

    // Only show cursor effect on larger screens
    if (window.innerWidth > 768) {
        cursor.style.display = 'block';
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
        });

        // Enhance cursor on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .team-card, .about-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2)';
                cursor.style.background = 'radial-gradient(circle, rgba(178, 75, 243, 0.4), transparent)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.background = 'radial-gradient(circle, rgba(0, 217, 255, 0.3), transparent)';
            });
        });
    }
};

createCursorEffect();

// Parallax Effect for Hero Section
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = hero.querySelector('.hero-bg');
        if (parallax) {
            parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Dynamic Year in Footer
const updateFooterYear = () => {
    const yearElement = document.querySelector('.footer-right p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = `&copy; ${currentYear} HashHarbingers. All rights reserved.`;
    }
};

updateFooterYear();

// Easter Egg: Konami Code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    // Add special effect
    document.body.style.animation = 'rainbow 2s linear infinite';
    
    // Create style for rainbow animation if it doesn't exist
    if (!document.getElementById('easter-egg-style')) {
        const style = document.createElement('style');
        style.id = 'easter-egg-style';
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Show message
    const message = document.createElement('div');
    message.textContent = '🎉 You found the secret! Welcome, true Harbinger! 🎉';
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #00d9ff, #b24bf3);
        padding: 2rem 3rem;
        border-radius: 15px;
        font-size: 1.5rem;
        font-weight: bold;
        z-index: 10000;
        animation: fadeInUp 0.5s ease;
        text-align: center;
        box-shadow: 0 10px 50px rgba(0, 217, 255, 0.5);
    `;
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.animation = 'fadeOut 0.5s ease';
        setTimeout(() => {
            message.remove();
            document.body.style.animation = '';
        }, 500);
    }, 3000);
}

// Performance: Reduce animations on low-end devices
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable or reduce animations for users who prefer reduced motion
    document.documentElement.style.setProperty('--transition-fast', '0.05s ease');
    document.documentElement.style.setProperty('--transition-medium', '0.1s ease');
    document.documentElement.style.setProperty('--transition-slow', '0.15s ease');
}

// Log initialization
console.log('%c HashHarbingers ', 'background: linear-gradient(135deg, #00d9ff, #b24bf3); color: #000; font-size: 20px; font-weight: bold; padding: 10px;');
console.log('%c Building the Future of Web3 ', 'color: #00d9ff; font-size: 14px;');
console.log('%c Try the Konami Code for a surprise! ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA ', 'color: #b24bf3; font-size: 12px;');

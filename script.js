// Initialize interactions when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeInteractions();
    updateStats();
});

// Initialize Chart.js charts - REMOVED (only tracker table remains)

// KONFIGURACJA - zmień tylko te wartości:
const STATS_CONFIG = {
    totalModded: 2,      // Ilość zmodowanych kont
    totalBanned: 0,        // Ilość zbanowanych kont
    completedMods: 4     // Ilość wykonanych modyfikacji
};

// Animate statistics counters
function updateStats() {
    const total = STATS_CONFIG.totalModded;
    const banned = STATS_CONFIG.totalBanned;
    const completed = STATS_CONFIG.completedMods;
    const successPercent = total > 0 ? ((total - banned) / total * 100) : 0;
    const banPercent = total > 0 ? (banned / total * 100) : 0;

    animateCounter('stat-total', 0, total, 2000);
    animateCounter('stat-success', 0, successPercent, 2000, true);
    animateCounter('stat-banned', 0, banPercent, 2000, true);
    animateCounter('stat-completed', 0, completed, 2000);
}

function animateCounter(elementId, start, end, duration, isPercentage = false) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const increment = (end - start) / (duration / 16);
    let current = start;

    const counter = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(counter);
        }
        
        if (isPercentage) {
            element.textContent = current.toFixed(1) + '%';
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}


function initializeInteractions() {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // CTA Button interaction
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            const contactSection = document.getElementById('contact');
            contactSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Form submission
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('Wiadomość wysłana pomyślnie!', 'success');
            form.reset();
        });
    }

    // Purchase buttons
    document.querySelectorAll('.purchase-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            showNotification('Przekierowuję do strony płatności...', 'success');
            // Tu będzie link do serwisu płatniczego
            // window.location.href = 'https://payment-service.com/...';
        });
    });

    // Service cards animation on scroll
    observeElements('.service-card');
    observeElements('.faq-item');
    observeElements('.offer-card');
}

// Intersection Observer for animations
function observeElements(selector) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll(selector).forEach(el => {
        observer.observe(el);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? 'rgba(0, 255, 65, 0.2)' : 'rgba(0, 212, 255, 0.2)'};
        border: 1px solid ${type === 'success' ? 'rgba(0, 255, 65, 0.5)' : 'rgba(0, 212, 255, 0.5)'};
        color: ${type === 'success' ? '#00ff41' : '#00d4ff'};
        border-radius: 8px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add hover effects to stat cards
document.querySelectorAll('.stat-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) rotateY(5deg)';
    });
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotateY(0deg)';
    });
});

// Parallax effect on hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-bg');
    if (hero) {
        const scrollPosition = window.pageYOffset;
        hero.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
});

console.log('GTA Mod Pro - strona główna załadowana! 🚀');

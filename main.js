// Smooth Scroll for anchor links
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

// Intersection Observer for fade-in animations
const setupAnimations = () => {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    });

    fadeElements.forEach(el => fadeObserver.observe(el));
};

// Subtle 3D tilt effect for Glass Cards
const setupTilt = () => {
    const cards = document.querySelectorAll('.glass-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -4;
            const rotateY = ((x - centerX) / centerX) * 4;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
        });
    });
};

// Background Parallax
const setupParallax = () => {
    window.addEventListener('mousemove', e => {
        const x = (e.clientX / window.innerWidth) * 20;
        const y = (e.clientY / window.innerHeight) * 20;
        
        document.querySelector('.orb-1').style.transform = `translate(${x}px, ${y}px)`;
        document.querySelector('.orb-2').style.transform = `translate(${-x}px, ${-y}px)`;
    });
};

// Init
document.addEventListener('DOMContentLoaded', () => {
    setupAnimations();
    setupTilt();
    setupParallax();
});

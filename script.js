// Portfolio Website JavaScript

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all features
    initNavbar();
    initMobileMenu();
    initTypingEffect();
    initScrollAnimations();
    initSmoothScroll();
    initContactForm();
});

// Navbar scroll effect
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Add/remove scrolled class
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = mobileMenu.querySelectorAll('a');

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('hidden');
    });

    // Close menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            mobileMenu.classList.add('hidden');
        });
    });
}

// Typing effect
function initTypingEffect() {
    const typedElement = document.getElementById('typed-text');
    const texts = [
        'Pen Tester',
        'Information Technology Student',
        'Problem Solver',
        'Creative Thinker'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            typedElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typedElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500; // Pause before typing next
        }

        setTimeout(type, typingSpeed);
    }

    // Start typing effect
    setTimeout(type, 1000);
}

// Scroll animations using Intersection Observer
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.scroll-animate');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contact form handling
function initContactForm() {
    const form = document.getElementById('contact-form');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.innerHTML = 'กำลังส่ง...';

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Reset form
            form.reset();

            // Show success state
            submitBtn.classList.remove('loading');
            submitBtn.innerHTML = 'ส่งสำเร็จ! ✓';
            submitBtn.style.background = 'linear-gradient(to right, #10b981, #059669)';

            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
            }, 3000);
        }, 1500);
    });
}

// Add parallax effect to hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.getElementById('home');
    if (hero) {
        const parallaxElements = hero.querySelectorAll('.animate-float');
        parallaxElements.forEach(el => {
            el.style.transform = `translateY(${scrolled * 0.1}px)`;
        });
    }
});

// Add cursor glow effect (optional enhancement)
document.addEventListener('mousemove', (e) => {
    const cursor = document.createElement('div');
    cursor.style.cssText = `
        position: fixed;
        width: 300px;
        height: 300px;
        border-radius: 50%;
        pointer-events: none;
        background: radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%);
        left: ${e.clientX - 150}px;
        top: ${e.clientY - 150}px;
        z-index: 9999;
        transition: opacity 0.3s;
    `;
    cursor.className = 'cursor-glow';

    // Remove existing cursor glow
    const existing = document.querySelector('.cursor-glow');
    if (existing) existing.remove();

    document.body.appendChild(cursor);
});

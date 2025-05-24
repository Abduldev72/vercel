document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.classList.contains('no-scroll')) return;
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            }
        });
    });
    
    // Animate Stats Counter
    const statsSection = document.querySelector('.impact');
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;
    
    function animateStats() {
        if (animated) return;
        
        const rect = statsSection.getBoundingClientRect();
        const isVisible = (rect.top <= window.innerHeight / 2) && 
                         (rect.bottom >= window.innerHeight / 2);
        
        if (isVisible) {
            animated = true;
            
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const counter = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        stat.textContent = target;
                        clearInterval(counter);
                    } else {
                        stat.textContent = Math.floor(current);
                    }
                }, 16);
            });
        }
    }
    
    window.addEventListener('scroll', animateStats);
    animateStats(); // Check on load in case stats are already visible
    
    // Form Submission
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            
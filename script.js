document.addEventListener('DOMContentLoaded', function() {
    // Menu Mobile
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.classList.contains('no-scroll')) return;
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Fechar menu mobile se aberto
                if (navLinks && navLinks.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            }
        });
    });
    
    // Animação dos Números
    const statsSection = document.querySelector('.impact');
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;
    
    function animateStats() {
        if (statsAnimated || !statsSection || !statNumbers.length) return;
        
        const rect = statsSection.getBoundingClientRect();
        const isVisible = (rect.top <= window.innerHeight / 2) && 
                         (rect.bottom >= window.innerHeight / 2);
        
        if (isVisible) {
            statsAnimated = true;
            
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count')) || 0;
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const counter = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        stat.textContent = target.toLocaleString();
                        clearInterval(counter);
                    } else {
                        stat.textContent = Math.floor(current).toLocaleString();
                    }
                }, 16);
            });
        }
    }
    
    // Verificar ao carregar e ao scrollar
    window.addEventListener('scroll', animateStats);
    animateStats();

    // Exemplo de novo elemento - CORRIGIDO
    const novoElemento = document.createElement('div');
    novoElemento.textContent = 'Novo conteúdo dinâmico';
    novoElemento.style.cssText = `
        padding: 10px;
        background: #4a934a;
        color: white;
        text-align: center;
        margin: 20px 0;
        border-radius: 4px;
    `;
    document.body.prepend(novoElemento);
});
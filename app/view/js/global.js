document.addEventListener('DOMContentLoaded', function() {
    // CÓDIGO DAS ESTRELAS - só executa se o container existir
    const container = document.getElementById('stars-container');
    
    if (container) { // ⬅️ VERIFICA SE O ELEMENTO EXISTE
        const starCount = 900;
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            const starType = Math.floor(Math.random() * 3) + 1;
            star.classList.add('star', `star${starType}`);
            
            const left = Math.random() * 150;
            const top = Math.random() * 100;
            const driftDelay = Math.random() * -100;
            const twinkleDelay = Math.random() * -8;
            
            star.style.left = `${left}vw`;
            star.style.top = `${top}vh`;
            star.style.animationDelay = `${driftDelay}s, ${twinkleDelay}s`;
            
            container.appendChild(star);
        }
    }
});

/*botao menu */
document.addEventListener('DOMContentLoaded', function() {
    const menuToggleButton = document.getElementById('menu-toggle-btn');
    const sideMenu = document.getElementById('side_menu');

    // ⬇️ VERIFICA SE OS ELEMENTOS EXISTEM ANTES DE ADICIONAR EVENT LISTENERS
    if (menuToggleButton && sideMenu) {
        menuToggleButton.addEventListener('click', function() {
            sideMenu.classList.toggle('show');
        });
    }
});
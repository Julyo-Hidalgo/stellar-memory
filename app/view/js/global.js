        document.addEventListener('DOMContentLoaded', function() 
        {
           //espera documento carregar e garante que o js só sera executado ds que o html carregar

            const container = document.getElementById('stars-container');
            const starCount = 900; // Numero total de estrelas
            
            // Criar estrelas
            for (let i = 0; i < starCount; i++) 
            {
                const star = document.createElement('div');
                
                // Escolher aleatoriamente o tipo de estrela (1, 2 ou 3)
                const starType = Math.floor(Math.random() * 3) + 1;
                star.classList.add('star', `star${starType}`);
                //aplica o css
                
                // Posição aleatória na tela
                const left = Math.random() * 150;
                const top = Math.random() * 100;
                
                // Atraso aleatório para animação
                const driftDelay = Math.random() * -100; // delay negativo para começar em posições diferentes
                const twinkleDelay = Math.random() * -8; // delay negativo para piscar em tempos diferentes
                // Gera valores de atraso aleatórios e negativos. 
                //O atraso negativo faz com que a animação pareça já ter começado quando a página carrega, 
                // fazendo as estrelas piscarem e se moverem em ritmos diferentes desde o início, em vez de começarem todas ao mesmo tempo
                //da um efeito mais natural
                
                star.style.left = `${left}vw`;
                star.style.top = `${top}vh`;
                star.style.animationDelay = `${driftDelay}s, ${twinkleDelay}s`;
                
                container.appendChild(star);

            } 
            
        });

        
/*botao menu */
  document.addEventListener('DOMContentLoaded', function() {
     //espera documento carregar e garante que o js só sera executado ds que o html carregar

    const menuToggleButton = document.getElementById('menu-toggle-btn');
    const sideMenu = document.getElementById('side_menu');

    menuToggleButton.addEventListener('click', function() {
        //ouvinte, onde o codigo esera a ação do usuario (clicar) para o ouvinte ser executado

        sideMenu.classList.toggle('show');
        //altera a classe show do css
        //se show estver ativada, o ouvinte meio q fecha
        //se show estiver desativada, o ouvinte meio q abre
    });
});
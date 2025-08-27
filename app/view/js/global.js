        document.addEventListener('DOMContentLoaded', function() 
        {
           

            const container = document.getElementById('stars-container');
            const starCount = 900; // Num total de estrelas
            
            // Criar estrelas
            for (let i = 0; i < starCount; i++) 
            {
                const star = document.createElement('div');
                
                // Escolher aleatoriamente o tipo de estrela (1, 2 ou 3)
                const starType = Math.floor(Math.random() * 3) + 1;
                star.classList.add('star', `star${starType}`);
                
                // Posição aleatória
                const left = Math.random() * 150;
                const top = Math.random() * 100;
                
                // Atraso aleatório para animação
                const driftDelay = Math.random() * -100; // delay negativo para começar em posições diferentes
                const twinkleDelay = Math.random() * -8; // delay negativo para piscar em tempos diferentes
                
                star.style.left = `${left}vw`;
                star.style.top = `${top}vh`;
                star.style.animationDelay = `${driftDelay}s, ${twinkleDelay}s`;
                
                container.appendChild(star);

                
                 /*espiral*//*
                star.style.setProperty('--distance', Math.random() * 0.9 + 0.1);
                star.style.animation = `spiralGalaxy ${120 + Math.random() * 60}s linear infinite, twinkle${starType} ${5 + Math.random() * 4}s ease-in-out infinite`;
                */


            }
        });
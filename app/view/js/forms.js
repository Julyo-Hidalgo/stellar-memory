document.addEventListener('DOMContentLoaded', function() {
    //Espera a página carregar
    // garantindo que o código só vai rodar depois que todo o HTML estiver carregado/pronto.

    const togglePasswordButton = document.querySelector('.toggle-password');
    //seleciona o botao de olho na senha
    const passwordInput = document.getElementById('password');
    
    togglePasswordButton.addEventListener('click', function() {
        //é adicionado um ouvinte de clique de botao,
        //onde espera o usuario clicar no "olho" para mostrar a senha

        if (passwordInput.type === 'password') { //se campo for tipo password
            passwordInput.type = 'text'; //muda para text, para mostrar a senha
            togglePasswordButton.innerHTML = '<img src="../../img/cadeado.png" alt="Ocultar senha" width="20">'; 
            //imagem muda para cadeado
        } else {//caso campo seja do tipo text
            passwordInput.type = 'password'; //muda para password
            togglePasswordButton.innerHTML = '<img src="../../img/red-eyes.png" alt="Mostrar senha" width="20">';
            //muda imagem para olho
        }
    });
    
    document.getElementById('profile-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Alterações salvas com sucesso!');
    });
});



document.addEventListener('DOMContentLoaded', function () {
    //novamente espera html e pag inteira carregarem
    const form = document.querySelector('form');
    const submitButton = form.querySelector('button[type="submit"]');
    //seleciona o botao de enviar na pag de login ou cadastro

    submitButton.addEventListener('click', function (e) {
    //adiciona um ouvinte de clique, para quando o usuario clicsr é redirecionado para a pag certa 
        e.preventDefault(); 
        // Evita que o formulário seja enviado

        const isLoginPage = document.body.classList.contains('login-page');
        //verifica se o body analisado tem loginpage (pagina de login)
        if (isLoginPage) {
            // Se estiver na página de login, redireciona para o jogo
            window.location.href = '../jogo/jogo.html';
        } else {
            // Se estiver na página de cadastro, redireciona para o login
            window.location.href = '../login/login.html';
        }
    });
});

/*OU*/
/*
//seleciona o botao de login
        const botaoLogin = document.querySelector('button[type="submit"]');

        botaoLogin.addEventListener('click', function (e) {
            e.preventDefault(); // evita que o formulário seja enviado
            window.location.href = '../jogo/jogo.html'; // redireciona para o jogo
        });
        // pega o botão "Cadastrar"
        const botaoCadastrar = document.querySelector('button[type="submit"]');

        botaoCadastrar.addEventListener('click', function (e) {
            e.preventDefault(); // evita o envio do formulário
            window.location.href = '../login/login.html'; // ajuste o caminho se o login não estiver na mesma pasta
        });
        */

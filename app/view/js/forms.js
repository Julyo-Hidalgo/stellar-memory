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
    
    const path = window.location.pathname;
	if (path.includes('edicao_perfil.html')) {
		const form = document.querySelector('form');
		const submitButton = form.querySelector('button[type="submit"]');

		// Se estiver na página de edição de perfil, adiciona o ouvinte de evento ao formulário
		submitButton.addEventListener('click', function(e) {
			e.preventDefault();
			alert('Alterações salvas com sucesso!');
		});
	}
});

// Solução temporária para redirecionar entre páginas de login e cadastro
document.addEventListener('DOMContentLoaded', function () {
	const form = document.querySelector('form');
	const submitButton = form.querySelector('button[type="submit"]');
    //novamente espera html e pag inteira carregarem
    submitButton.addEventListener('click', function (e) {
        e.preventDefault();

        // Obtém o caminho do arquivo da URL atual
        const path = window.location.pathname;

        // Verifica se o caminho do arquivo inclui 'login.html'
        if (path.includes('login.html')) {
            // Se estiver na página de login, redireciona para o jogo
            window.location.href = '../jogo/jogo.html';
        }
        if (path.includes('cadastro.html')) {
            // Se estiver na página de cadastro, redireciona para o login 
            window.location.href = '../login/login.html';
        }
    });
});

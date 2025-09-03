document.addEventListener('DOMContentLoaded', function() {
    const togglePasswordButton = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');
    
    togglePasswordButton.addEventListener('click', function() {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            togglePasswordButton.innerHTML = '<img src="../../../../app/view/img/cadeado.png" alt="Ocultar senha" width="20">'; 
        } else {
            passwordInput.type = 'password';
            togglePasswordButton.innerHTML = '<img src="../../../../app/view/img/red-eyes.png" alt="Mostrar senha" width="20">';
        }
    });
    
    document.getElementById('profile-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Alterações salvas com sucesso!');
    });
});

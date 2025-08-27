 document.addEventListener('DOMContentLoaded', function() {
            const togglePasswordButton = document.querySelector('.toggle-password');
            const passwordInput = document.getElementById('password');
            
            togglePasswordButton.addEventListener('click', function() {
                if (passwordInput.type === 'password') {
                    passwordInput.type = 'text';
                    togglePasswordButton.textContent = '🔒';
                } else {
                    passwordInput.type = 'password';
                    togglePasswordButton.textContent = '👁️';
                }
            });
            
            document.getElementById('profile-form').addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Alterações salvas com sucesso!');
            });
        });

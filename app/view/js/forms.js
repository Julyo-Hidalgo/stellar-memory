document.addEventListener('DOMContentLoaded', function() {
    const togglePasswordButton = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');
    const path = window.location.pathname;

    if (togglePasswordButton && passwordInput) {
        togglePasswordButton.addEventListener('click', function() {
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                togglePasswordButton.innerHTML = '<img src="../../img/cadeado.png" alt="Ocultar senha" width="20">';
            } else {
                passwordInput.type = 'password';
                togglePasswordButton.innerHTML = '<img src="../../img/red-eyes.png" alt="Mostrar senha" width="20">';
            }
        });
    }

    // Função para exibir mensagem de erro abaixo do container
    function displayError(inputElement, message) {
        const inputBox = inputElement.closest(".input-box");
        let errorElement = inputBox.querySelector(".error-message");
        
        // Garantir que o input-box tenha position relative para o posicionamento absoluto funcionar
        if (getComputedStyle(inputBox).position === 'static') {
            inputBox.style.position = 'relative';
        }
        
        if (!errorElement) {
            errorElement = document.createElement("div");
            errorElement.classList.add("error-message");
            inputBox.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        errorElement.style.color = "red";
        errorElement.style.fontSize = "0.8em";
        errorElement.style.position = "absolute";
        errorElement.style.bottom = "-20px"; // Posiciona abaixo do container
        errorElement.style.left = "10px"; // Padding esquerdo
        errorElement.style.display = "block";
        errorElement.style.width = "calc(100% - 20px)"; // Para garantir que o texto não saia do container
        errorElement.style.textAlign = "left";
        errorElement.style.zIndex = "10"; // Para garantir que fique visível
    }

    // Função para remover mensagem de erro
    function removeError(inputElement) {
        const inputBox = inputElement.closest('.input-box');
        const errorElement = inputBox.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }

    // Função para aplicar máscara de telefone automaticamente
    function applyPhoneMask(value) {
        // Remove tudo que não é dígito
        const cleanValue = value.replace(/\D/g, '');
        
        if (cleanValue.length <= 2) {
            return cleanValue.replace(/(\d{0,2})/, '($1');
        } else if (cleanValue.length <= 6) {
            return cleanValue.replace(/(\d{2})(\d{0,4})/, '($1) $2');
        } else if (cleanValue.length <= 10) {
            return cleanValue.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
        } else {
            return cleanValue.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
        }
    }

    // Função para aplicar máscara de data automaticamente
    function applyDateMask(value) {
        // Remove tudo que não é dígito
        const cleanValue = value.replace(/\D/g, '');
        
        if (cleanValue.length <= 2) {
            return cleanValue;
        } else if (cleanValue.length <= 4) {
            return cleanValue.replace(/(\d{2})(\d{0,2})/, '$1/$2');
        } else {
            return cleanValue.replace(/(\d{2})(\d{2})(\d{0,4})/, '$1/$2/$3');
        }
    }

    // Função para validar e-mail
    function validateEmail(email) {
        const re = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)*(\.[a-z]{2,})$/i;
        return re.test(String(email).toLowerCase());
    }

    // Função para validar telefone
    function validatePhone(phone) {
        const cleanPhone = phone.replace(/\D/g, '');
        return cleanPhone.length >= 10 && cleanPhone.length <= 11;
    }

    // Função para validar data
    function validateDate(date) {
        const cleanDate = date.replace(/\D/g, '');
        if (cleanDate.length !== 8) return false;
        
        const day = parseInt(cleanDate.substring(0, 2));
        const month = parseInt(cleanDate.substring(2, 4));
        const year = parseInt(cleanDate.substring(4, 8));
        
        if (day < 1 || day > 31) return false;
        if (month < 1 || month > 12) return false;
        if (year < 1900 || year > new Date().getFullYear()) return false;
        
        return true;
    }

    // Preenchimento de dados fictícios e validações para edicao_perfil.html
    if (path.includes('edicao_perfil.html')) {
        const form = document.getElementById('profile-form');
        const inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="password"]');
        const submitButton = form.querySelector('button[type="submit"]');

        // Dados fictícios
        const fictitiousData = {
            'nome_completo': 'João da Silva',
            'data_nascimento': '01/01/1990',
            'cpf': '123.456.789-00',
            'telefone': '(11) 98765-4321',
            'email': 'joao.silva@example.com',
            'username': 'joaosilva',
            'senha': 'senha123'
        };

        // Preencher campos com dados fictícios
        inputs.forEach(input => {
            const name = input.name;
            if (fictitiousData[name]) {
                input.value = fictitiousData[name];
            }
            input.maxLength = 100; // Limite de 100 caracteres
        });

        // Armazenar valores originais para detectar mudanças
        const originalValues = {};
        inputs.forEach(input => {
            originalValues[input.name] = input.value;
        });

        // Função para verificar se houve alterações
        function hasChanges() {
            return Array.from(inputs).some(input => {
                return originalValues[input.name] !== input.value;
            });
        }

        // Função para verificar a validade do formulário
        function checkFormValidity() {
            let formIsValid = true;
            let hasErrors = false;

            inputs.forEach(input => {
                // Pular campos readonly
                if (input.readOnly) return;

                // Verificar se campo obrigatório está vazio
                if (input.value.trim() === '' && input.required) {
                    formIsValid = false;
                }
                
                // Validar e-mail
                if (input.type === 'email' && input.value.trim() !== '' && !validateEmail(input.value.trim())) {
                    formIsValid = false;
                }

                // Validar telefone
                if (input.type === 'tel' && input.value.trim() !== '' && !validatePhone(input.value)) {
                    formIsValid = false;
                }

                // Verificar se há mensagens de erro visíveis
                const inputBox = input.closest('.input-box');
                const errorElement = inputBox.querySelector('.error-message');
                if (errorElement && errorElement.textContent.trim() !== '') {
                    hasErrors = true;
                    formIsValid = false;
                }
            });

            // Botão só fica habilitado se:
            // 1. Formulário é válido (sem erros)
            // 2. Houve alterações nos campos
            const shouldEnable = formIsValid && !hasErrors && hasChanges();
            submitButton.disabled = !shouldEnable;
            
            // Adicionar estilo visual para botão desabilitado
            if (submitButton.disabled) {
                submitButton.style.opacity = '0.5';
                submitButton.style.cursor = 'not-allowed';
            } else {
                submitButton.style.opacity = '1';
                submitButton.style.cursor = 'pointer';
            }
        }

        // Adicionar event listeners para todos os campos editáveis
        inputs.forEach(input => {
            // Pular campos readonly
            if (input.readOnly) return;

            // Event listener para validação em tempo real
            input.addEventListener('input', function() {
                // Aplicar máscaras automáticas
                if (input.type === 'tel') {
                    // Permitir apenas números para telefone
                    const cursorPosition = input.selectionStart;
                    const oldValue = input.value;
                    input.value = applyPhoneMask(input.value);
                    
                    // Ajustar posição do cursor
                    const newCursorPosition = cursorPosition + (input.value.length - oldValue.length);
                    input.setSelectionRange(newCursorPosition, newCursorPosition);
                }

                // Validações específicas
                if (input.value.trim() === '' && input.required) {
                    displayError(input, 'Este campo não pode estar vazio.');
                } else if (input.type === 'email' && input.value.trim() !== '' && !validateEmail(input.value.trim())) {
                    displayError(input, 'E-mail deve ter um formato válido (ex: usuario@exemplo.com)');
                } else if (input.type === 'tel' && input.value.trim() !== '' && !validatePhone(input.value)) {
                    displayError(input, 'Telefone deve ter 8 ou 9 dígitos + DDD (ex: (11) 98765-4321)');
                } else {
                    removeError(input);
                }

                checkFormValidity();
            });

            // Event listener para restringir caracteres em campos numéricos
            if (input.type === 'tel') {
                input.addEventListener('keypress', function(e) {
                    // Permitir apenas números, backspace, delete, tab, escape, enter
                    if (!/[0-9]/.test(e.key) && 
                        !['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                        e.preventDefault();
                    }
                });
            }
        });

        // Função salvarPerfil
        function salvarPerfil() {
            // Coletar dados do formulário
            const formData = {};
            inputs.forEach(input => {
                formData[input.name] = input.value;
            });

            // Simular envio para o backend
            console.log('Dados a serem salvos:', formData);
            
            // Simulação por enquanto
            alert('Perfil salvo com sucesso! (Simulação)');
            
            // Atualizar valores originais após "salvar"
            inputs.forEach(input => {
                originalValues[input.name] = input.value;
            });
            checkFormValidity();
        }

        // Event listener para o submit do formulário
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (!submitButton.disabled) {
                salvarPerfil();
            }
        });

        // Verificar validade inicial do formulário
        checkFormValidity();
    }

    // Solução temporária para redirecionar entre páginas de login e cadastro
    if (path.includes('login.html') || path.includes('cadastro.html')) {
        const form = document.querySelector('form');
        const submitButton = form.querySelector('button[type="submit"]');

        if (form && submitButton) {
            submitButton.addEventListener('click', function(e) {
                e.preventDefault();
                if (path.includes('login.html')) {
                    window.location.href = '../jogo/jogo.html';
                } else if (path.includes('cadastro.html')) {
                    window.location.href = '../login/login.html';
                }
            });
        }
    }
});

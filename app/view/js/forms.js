document.addEventListener('DOMContentLoaded', function() {
    const togglePasswordButton = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');
    const path = window.location.pathname;

    // Funcionalidade de mostrar/esconder senha
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

    // Função para exibir mensagem de erro
    function displayError(inputElement, message) {
        const inputBox = inputElement.closest(".input-box");
        let errorElement = inputBox.querySelector(".error-message");
        
        // Garantir que o input-box tenha position relative
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
        errorElement.style.bottom = "-20px";
        errorElement.style.left = "10px";
        errorElement.style.display = "block";
        errorElement.style.width = "calc(100% - 20px)";
        errorElement.style.textAlign = "left";
        errorElement.style.zIndex = "10";
    }

    // Função para remover mensagem de erro
    function removeError(inputElement) {
        const inputBox = inputElement.closest('.input-box');
        const errorElement = inputBox.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }

    // Função para aplicar máscara de telefone
    function applyPhoneMask(value) {
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

    // Função para aplicar máscara de data
    function applyDateMask(value) {
        const cleanValue = value.replace(/\D/g, '');
        
        if (cleanValue.length <= 2) {
            return cleanValue;
        } else if (cleanValue.length <= 4) {
            return cleanValue.replace(/(\d{2})(\d{0,2})/, '$1/$2');
        } else {
            return cleanValue.replace(/(\d{2})(\d{2})(\d{0,4})/, '$1/$2/$3');
        }
    }

    // Função para aplicar máscara de CPF
    function applyCpfMask(value) {
        const cleanValue = value.replace(/\D/g, '');
        
        if (cleanValue.length <= 3) {
            return cleanValue;
        } else if (cleanValue.length <= 6) {
            return cleanValue.replace(/(\d{3})(\d{0,3})/, '$1.$2');
        } else if (cleanValue.length <= 9) {
            return cleanValue.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
        } else {
            return cleanValue.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
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

    // Função para validar CPF
    function validateCpf(cpf) {
        const cleanCpf = cpf.replace(/\D/g, '');
        
        if (cleanCpf.length !== 11) return false;
        if (/^(\d)\1{10}$/.test(cleanCpf)) return false; // Números iguais
        
        // Validação do primeiro dígito verificador
        let sum = 0;
        for (let i = 0; i < 9; i++) {
            sum += parseInt(cleanCpf.charAt(i)) * (10 - i);
        }
        let remainder = 11 - (sum % 11);
        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cleanCpf.charAt(9))) return false;
        
        // Validação do segundo dígito verificador
        sum = 0;
        for (let i = 0; i < 10; i++) {
            sum += parseInt(cleanCpf.charAt(i)) * (11 - i);
        }
        remainder = 11 - (sum % 11);
        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cleanCpf.charAt(10))) return false;
        
        return true;
    }

    // Função para validar username (sem espaços)
    function validateUsername(username) {
        return username.trim() !== '' && !/\s/.test(username);
    }

    // Função para validar nome (sem números)
    function validateName(name) {
        return name.trim() !== '' && !/\d/.test(name);
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
            input.maxLength = 100;
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
                if (input.readOnly) return;

                if (input.value.trim() === '' && input.required) {
                    formIsValid = false;
                }
                
                if (input.type === 'email' && input.value.trim() !== '' && !validateEmail(input.value.trim())) {
                    formIsValid = false;
                }

                if (input.type === 'tel' && input.value.trim() !== '' && !validatePhone(input.value)) {
                    formIsValid = false;
                }

                // Validar nome (sem números)
                if (input.name === 'nome_completo' && input.value.trim() !== '' && !validateName(input.value)) {
                    formIsValid = false;
                }

                // Validar username (sem espaços)
                if (input.name === 'username' && input.value.trim() !== '' && !validateUsername(input.value)) {
                    formIsValid = false;
                }

                const inputBox = input.closest('.input-box');
                const errorElement = inputBox.querySelector('.error-message');
                if (errorElement && errorElement.textContent.trim() !== '') {
                    hasErrors = true;
                    formIsValid = false;
                }
            });

            const shouldEnable = formIsValid && !hasErrors && hasChanges();
            submitButton.disabled = !shouldEnable;
            
            if (submitButton.disabled) {
                submitButton.style.opacity = '0.5';
                submitButton.style.cursor = 'not-allowed';
            } else {
                submitButton.style.opacity = '1';
                submitButton.style.cursor = 'pointer';
            }
        }

        // Event listeners para campos editáveis
        inputs.forEach(input => {
            if (input.readOnly) return;

            input.addEventListener('input', function() {
                // Aplicar máscaras
                if (input.type === 'tel') {
                    const cursorPosition = input.selectionStart;
                    const oldValue = input.value;
                    input.value = applyPhoneMask(input.value);
                    
                    const newCursorPosition = cursorPosition + (input.value.length - oldValue.length);
                    input.setSelectionRange(newCursorPosition, newCursorPosition);
                }

                // Validações específicas
                if (input.value.trim() === '' && input.required) {
                    displayError(input, 'Não pode estar vazio.');
                } else if (input.type === 'email' && input.value.trim() !== '' && !validateEmail(input.value.trim())) {
                    displayError(input, 'E-mail inválido');
                } else if (input.type === 'tel' && input.value.trim() !== '' && !validatePhone(input.value)) {
                    displayError(input, 'Telefone inválido');
                } else if (input.name === 'nome_completo' && input.value.trim() !== '' && !validateName(input.value)) {
                    displayError(input, 'Nome não pode conter números');
                } else if (input.name === 'username' && input.value.trim() !== '' && !validateUsername(input.value)) {
                    displayError(input, 'Não pode conter espaços');
                } else {
                    removeError(input);
                }

                checkFormValidity();
            });

            // Restringir caracteres em campos numéricos
            if (input.type === 'tel') {
                input.addEventListener('keypress', function(e) {
                    if (!/[0-9]/.test(e.key) && 
                        !['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                        e.preventDefault();
                    }
                });
            }
        });

        // Função salvarPerfil
        function salvarPerfil() {
            const formData = {};
            inputs.forEach(input => {
                formData[input.name] = input.value;
            });

            console.log('Dados a serem salvos:', formData);
            alert('Perfil salvo com sucesso! (Simulação)');
            
            inputs.forEach(input => {
                originalValues[input.name] = input.value;
            });
            checkFormValidity();
        }

        // Event listener para submit
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (!submitButton.disabled) {
                salvarPerfil();
            }
        });

        checkFormValidity();
    }

    // Validações para cadastro.html
    if (path.includes('cadastro.html')) {
        const form = document.getElementById('form-cadastro');
        const inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="password"]');
        const submitButton = form.querySelector('button[type="submit"]');

        // Função para verificar a validade do formulário
        function checkFormValidity() {
            let formIsValid = true;
            let hasErrors = false;

            inputs.forEach(input => {
                if (input.readOnly) return;

                if (input.value.trim() === '' && input.required) {
                    formIsValid = false;
                }
                
                if (input.type === 'email' && input.value.trim() !== '' && !validateEmail(input.value.trim())) {
                    formIsValid = false;
                }

                if (input.type === 'tel' && input.value.trim() !== '' && !validatePhone(input.value)) {
                    formIsValid = false;
                }

                // Validar nome (sem números)
                if (input.placeholder === 'Nome Completo' && input.value.trim() !== '' && !validateName(input.value)) {
                    formIsValid = false;
                }

                // Validar username (sem espaços)
                if (input.placeholder === 'Username' && input.value.trim() !== '' && !validateUsername(input.value)) {
                    formIsValid = false;
                }

                // Validar CPF
                if (input.placeholder === 'CPF' && input.value.trim() !== '' && !validateCpf(input.value)) {
                    formIsValid = false;
                }

                // Validar data
                if (input.id === 'nascimento' && input.value.trim() !== '' && !validateDate(input.value)) {
                    formIsValid = false;
                }

                const inputBox = input.closest('.input-box');
                const errorElement = inputBox.querySelector('.error-message');
                if (errorElement && errorElement.textContent.trim() !== '') {
                    hasErrors = true;
                    formIsValid = false;
                }
            });

            submitButton.disabled = !formIsValid || hasErrors;
            
            if (submitButton.disabled) {
                submitButton.style.opacity = '0.5';
                submitButton.style.cursor = 'not-allowed';
            } else {
                submitButton.style.opacity = '1';
                submitButton.style.cursor = 'pointer';
            }
        }

        // Event listeners para todos os campos
        inputs.forEach(input => {
            if (input.readOnly) return;

            input.maxLength = 100;

            input.addEventListener('input', function() {
                // Aplicar máscaras
                if (input.type === 'tel') {
                    const cursorPosition = input.selectionStart;
                    const oldValue = input.value;
                    input.value = applyPhoneMask(input.value);
                    
                    const newCursorPosition = cursorPosition + (input.value.length - oldValue.length);
                    input.setSelectionRange(newCursorPosition, newCursorPosition);
                }

                if (input.id === 'nascimento') {
                    const cursorPosition = input.selectionStart;
                    const oldValue = input.value;
                    input.value = applyDateMask(input.value);
                    
                    const newCursorPosition = cursorPosition + (input.value.length - oldValue.length);
                    input.setSelectionRange(newCursorPosition, newCursorPosition);
                }

                if (input.placeholder === 'CPF') {
                    const cursorPosition = input.selectionStart;
                    const oldValue = input.value;
                    input.value = applyCpfMask(input.value);
                    
                    const newCursorPosition = cursorPosition + (input.value.length - oldValue.length);
                    input.setSelectionRange(newCursorPosition, newCursorPosition);
                }

                // Validações específicas
                if (input.value.trim() === '' && input.required) {
                    displayError(input, 'Não pode estar vazio.');
                } else if (input.type === 'email' && input.value.trim() !== '' && !validateEmail(input.value.trim())) {
                    displayError(input, 'E-mail inválido');
                } else if (input.type === 'tel' && input.value.trim() !== '' && !validatePhone(input.value)) {
                    displayError(input, 'Telefone inválido');
                } else if (input.placeholder === 'Nome Completo' && input.value.trim() !== '' && !validateName(input.value)) {
                    displayError(input, 'Não pode conter números');
                } else if (input.placeholder === 'Username' && input.value.trim() !== '' && !validateUsername(input.value)) {
                    displayError(input, 'Não pode conter espaços');
                } else if (input.placeholder === 'CPF' && input.value.trim() !== '' && !validateCpf(input.value)) {
                    displayError(input, 'CPF deve ter um formato válido');
                } else if (input.id === 'nascimento' && input.value.trim() !== '' && !validateDate(input.value)) {
                    displayError(input, 'Deve ser válido (DD/MM/AAAA)');
                } else {
                    removeError(input);
                }

                checkFormValidity();
            });

            // Restringir caracteres em campos numéricos
            if (input.type === 'tel' || input.id === 'nascimento' || input.placeholder === 'CPF') {
                input.addEventListener('keypress', function(e) {
                    if (!/[0-9]/.test(e.key) && 
                        !['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                        e.preventDefault();
                    }
                });
            }
        });

        // Event listener para submit
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Verificar erros visuais
            const erros = document.querySelectorAll(".error-message");
            const temErro = Array.from(erros).some(e => e.textContent.trim() !== "");
            if (temErro) {
                alert("Corrija os campos antes de prosseguir.");
                return;
            }

            // Verificar campos obrigatórios
            const camposObrigatorios = form.querySelectorAll("input[required]");
            for (let campo of camposObrigatorios) {
                if (!campo.value.trim()) {
                    alert("Preencha todos os campos obrigatórios.");
                    campo.focus();
                    return;
                }
            }

            if (!submitButton.disabled) {
                alert("Cadastro realizado com sucesso!");
                window.location.href = "../login/login.html";
            }
        });

        checkFormValidity();
    }

    // Validações para login.html
    if (path.includes('login.html')) {
        const form = document.querySelector('form');
        const inputs = form.querySelectorAll('input[type="text"], input[type="password"]');
        const submitButton = form.querySelector('button[type="submit"]');

        // Adicionar ID ao formulário se não existir
        if (!form.id) {
            form.id = 'form-login';
        }

        // Função para verificar a validade do formulário
        function checkFormValidity() {
            let formIsValid = true;
            let hasErrors = false;

            inputs.forEach(input => {
                if (input.value.trim() === '' && input.required) {
                    formIsValid = false;
                }

                // Validar username (sem espaços)
                if (input.placeholder === 'Username' && input.value.trim() !== '' && !validateUsername(input.value)) {
                    formIsValid = false;
                }

                const inputBox = input.closest('.input-box');
                const errorElement = inputBox.querySelector('.error-message');
                if (errorElement && errorElement.textContent.trim() !== '') {
                    hasErrors = true;
                    formIsValid = false;
                }
            });

            submitButton.disabled = !formIsValid || hasErrors;
            
            if (submitButton.disabled) {
                submitButton.style.opacity = '0.5';
                submitButton.style.cursor = 'not-allowed';
            } else {
                submitButton.style.opacity = '1';
                submitButton.style.cursor = 'pointer';
            }
        }

        // Event listeners para todos os campos
        inputs.forEach(input => {
            input.maxLength = 100;

            input.addEventListener('input', function() {
                // Validações específicas
                if (input.value.trim() === '' && input.required) {
                    displayError(input, 'Este campo não pode estar vazio.');
                } else if (input.placeholder === 'Username' && input.value.trim() !== '' && !validateUsername(input.value)) {
                    displayError(input, 'Username não pode conter espaços');
                } else {
                    removeError(input);
                }

                checkFormValidity();
            });
        });

        // Event listener para submit
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const usuario = document.querySelector('input[placeholder="Username"]');
            const senha = document.getElementById("password");

            if (!usuario.value.trim() || !senha.value.trim()) {
                alert("Preencha todos os campos.");
                return;
            }

            if (!submitButton.disabled) {
                alert("Login realizado com sucesso!");
                //adicionar lógica de autenticação p proxima entrega
                window.location.href = '../jogo/jogo.html';
            }
        });

        checkFormValidity();
    }
});

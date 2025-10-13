document.addEventListener("DOMContentLoaded", () => {

    // Alternância de visibilidade da senha 
    document.querySelectorAll(".toggle-password").forEach((btn) => {
        btn.addEventListener("click", () => {
            const input = btn.parentElement.querySelector("input[type='password'], input[type='text']");
            if (!input) return;
            if (input.type === "password") {
                input.type = "text";
                btn.querySelector("img").src = "../../img/cadeado.png";
            } else {
                input.type = "password";
                btn.querySelector("img").src = "../../img/red-eyes.png";
            }
        });
    });

    // Criação do objeto global formUtils
    // Ele agrupa todas as funções usadas pelos formulários do site
    window.formUtils = {

        /* Exibição e remoção de mensagens de erro */
        displayError(input, message) {
            if (!input) return;
            const box = input.closest(".input-box") || input.parentElement;
            if (!box) return;
            let error = box.querySelector(".error-message");
            if (!error) {
                error = document.createElement("div");
                error.className = "error-message";
                box.appendChild(error);
            }
            error.textContent = message;
            Object.assign(error.style, {
                color: "red",
                fontSize: "0.8em",
                position: "absolute",
                bottom: "-20px",
                left: "10px",
            });
        },

        removeError(input) {
            const box = input.closest(".input-box") || input.parentElement;
            if (!box) return;
            const error = box.querySelector(".error-message");
            if (error) error.remove();
        },
        /*Funções auxiliares de formatação*/
        onlyDigits(v) {
            return String(v || "").replace(/\D/g, "");
        },

        /* Máscaras para campos específicos */
        applyCpfMask(v) {
            const d = window.formUtils.onlyDigits(v).slice(0, 11);
            if (d.length <= 3) return d;
            if (d.length <= 6) return d.replace(/(\d{3})(\d{0,3})/, "$1.$2");
            if (d.length <= 9) return d.replace(/(\d{3})(\d{3})(\d{0,3})/, "$1.$2.$3");
            return d.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, "$1.$2.$3-$4");
        },

        applyDateMask(v) {
            const d = window.formUtils.onlyDigits(v).slice(0, 8);
            if (d.length <= 2) return d;
            if (d.length <= 4) return d.replace(/(\d{2})(\d{0,2})/, "$1/$2");
            return d.replace(/(\d{2})(\d{2})(\d{0,4})/, "$1/$2/$3");
        },

        applyPhoneMask(v) {
            const d = window.formUtils.onlyDigits(v).slice(0, 11);
            if (d.length <= 2) return d ? `(${d}` : d;
            if (d.length <= 6) return d.replace(/(\d{2})(\d{0,4})/, "($1) $2");
            if (d.length <= 10) return d.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
            return d.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
        },

        /* Validações de campos */
        validateName(name) {
            return /^[A-Za-zÀ-ÿ\s]+$/.test(name.trim());
        },
        validateUsername(u) {
            return /^[A-Za-z0-9!@#$%^&*()_\-+=.?]{2,10}$/.test(u.trim());
        },
        validatePassword(p) {
            return /^[A-Za-z0-9!@#$%^&*()_\-+=.?]{8,10}$/.test(p.trim());
        },
        validateEmail(e) {
            return /^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(e.trim());
        },
        validateCpf(cpf) {
            return window.formUtils.onlyDigits(cpf).length === 11;
        },
        validatePhone(tel) {
            const len = window.formUtils.onlyDigits(tel).length;
            return len === 10 || len === 11;
        },
        validateDate(date) {
            const d = window.formUtils.onlyDigits(date);

            // Se o campo estiver vazio, não mostra erro ainda
            if (d.length === 0) return true;

            // Se tiver menos de 8 dígitos, já é considerado inválido
            if (d.length < 8) return false;

            // Verifica formato completo
            const day = +d.substring(0, 2);
            const month = +d.substring(2, 4);
            const year = +d.substring(4, 8);

            // Valida faixas possíveis
            if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1900 || year > 2025) return false;

            const obj = new Date(year, month - 1, day);
            const valid =
                obj.getFullYear() === year &&
                obj.getMonth() === month - 1 &&
                obj.getDate() === day;

            return valid;
        },

        /* Configuração de inputs interativos */
        setupInteractiveInputs(form) {
            const inputs = form.querySelectorAll("input");

            inputs.forEach((input) => {
                const name = input.name;
                const id = input.id;

                // máscaras dinâmicas
                input.addEventListener("input", () => {
                    if (name === "cpf") input.value = window.formUtils.applyCpfMask(input.value);
                    if (name === "telefone") input.value = window.formUtils.applyPhoneMask(input.value);
                    if (id === "nascimento" || name === "data_nascimento")
                        input.value = window.formUtils.applyDateMask(input.value);
                });

                // Restrições de caracteres durante a digitação
                input.addEventListener("keypress", (e) => {
                    if (["cpf", "telefone", "data_nascimento"].includes(name) || id === "nascimento") {
                        // assume que o Enter sempre é permitido
                        if (e.key === "Enter") return;

                        // Permite apenas números
                        if (!/[0-9]/.test(e.key)) {
                            e.preventDefault();
                            window.formUtils.displayError(input, "Apenas números permitidos.");
                            setTimeout(() => window.formUtils.removeError(input), 1500);
                            return;
                        }

                        const max =
                            name === "cpf"
                                ? 11
                                : name === "telefone"
                                    ? 11
                                    : name === "data_nascimento" || id === "nascimento"
                                        ? 8
                                        : null;

                        if (max && window.formUtils.onlyDigits(input.value).length >= max) {
                            e.preventDefault();
                            window.formUtils.displayError(input, `Limite de ${max} números atingido.`);
                            setTimeout(() => window.formUtils.removeError(input), 1500);
                        }
                    }

                    if (name === "nome_completo" && !/[A-Za-zÀ-ÿ\s]/.test(e.key)) {
                        e.preventDefault();
                        window.formUtils.displayError(input, "Apenas letras permitidas.");
                        setTimeout(() => window.formUtils.removeError(input), 1500);
                    }

                    if ((name === "username" || name === "senha") && input.value.length >= 10) {
                        e.preventDefault();
                        window.formUtils.displayError(input, "Limite máximo de 10 caracteres atingido.");
                        setTimeout(() => window.formUtils.removeError(input), 1500);
                    }
                });

                // Navegação com Enter
                input.addEventListener("keydown", (e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        const form = input.form;
                        if (!form) return;

                        const focusable = Array.from(form.querySelectorAll("input, select, textarea"))
                            .filter(el => !el.disabled && el.offsetParent !== null);

                        const index = focusable.indexOf(input);
                        if (index !== -1 && index + 1 < focusable.length) {
                            focusable[index + 1].focus();
                        } else {
                            form.querySelector("button, input[type='submit']")?.focus();
                        }
                    }
                });

                // Validação ao sair do campo
                input.addEventListener("blur", () => {
                    const val = input.value.trim();
                    window.formUtils.removeError(input);
                    if (!val) return;

                    if (name === "nome_completo" && !window.formUtils.validateName(val))
                        window.formUtils.displayError(input, "O nome deve conter apenas letras.");
                    else if (name === "username" && !window.formUtils.validateUsername(val))
                        window.formUtils.displayError(input, "Mínimo 2 caracteres.");
                    else if (name === "senha" && !window.formUtils.validatePassword(val))
                        window.formUtils.displayError(input, "Mínimo 8 caracteres.");
                    else if (name === "cpf" && !window.formUtils.validateCpf(val))
                        window.formUtils.displayError(input, "CPF deve ter 11 números.");
                    else if (name === "telefone" && !window.formUtils.validatePhone(val))
                        window.formUtils.displayError(input, "Telefone inválido.");
                    else if ((id === "nascimento" || name === "data_nascimento") && !window.formUtils.validateDate(val))
                        window.formUtils.displayError(input, "Data inválida.");
                    else if (input.type === "email" && !window.formUtils.validateEmail(val))
                        window.formUtils.displayError(input, "E-mail inválido.");
                });
            });
        },

        /* Envio unificado de formulários */
        setupFormSubmission(selector, options = {}) {
            const form = document.querySelector(selector);
            if (!form) return;

            form.addEventListener("submit", (e) => {
                e.preventDefault();
                let valid = true;

                const inputs = form.querySelectorAll("input");
                inputs.forEach((input) => {
                    const val = input.value.trim();
                    window.formUtils.removeError(input);
                    // Validações específicas
                    if (input.required && !val) {
                        window.formUtils.displayError(input, "Campo obrigatório.");
                        valid = false;
                    } else if (input.name === "nome_completo" && !window.formUtils.validateName(val)) {
                        window.formUtils.displayError(input, "Nome deve conter apenas letras.");
                        valid = false;
                    } else if (input.name === "username" && !window.formUtils.validateUsername(val)) {
                        window.formUtils.displayError(input, "Mínimo 2 caracteres.");
                        valid = false;
                    } else if (input.name === "senha" && !window.formUtils.validatePassword(val)) {
                        window.formUtils.displayError(input, "Mínimo 8 caracteres.");
                        valid = false;
                    } else if (input.name === "cpf" && !window.formUtils.validateCpf(val)) {
                        window.formUtils.displayError(input, "CPF inválido.");
                        valid = false;
                    } else if (input.name === "telefone" && !window.formUtils.validatePhone(val)) {
                        window.formUtils.displayError(input, "Telefone inválido.");
                        valid = false;
                    } else if (input.name === "data_nascimento" && !window.formUtils.validateDate(val)) {
                        window.formUtils.displayError(input, "Data inválida.");
                        valid = false;
                    } else if (input.type === "email" && !window.formUtils.validateEmail(val)) {
                        window.formUtils.displayError(input, "E-mail inválido.");
                        valid = false;
                    }
                });
                
                if (valid) {
                    alert(options.successMessage || "Form submitted successfully!");
                    if (options.redirect) window.location.href = options.redirect;
                }
            });
        },
    };

    // Aplica funcionalidades específicas dependente da página
    const path = window.location.pathname;

    const setupPageForm = (selector) => {
        const form = document.querySelector(selector);
        if (!form) return;
        window.formUtils.setupInteractiveInputs(form);
    };

    if (path.includes("cadastro.html")) setupPageForm("form");
    if (path.includes("edicao_perfil.html")) setupPageForm("#profile-form");
    if (path.includes("login.html")) setupPageForm("#form-login");

    // Garante que as máscaras permaneçam aplicadas ao enviar qualquer formulário
    document.querySelectorAll("form").forEach((form) => {
        form.addEventListener("submit", () => {
            // intencionalmente vazio - as máscaras sãi aplicadas em tempo real
        });
    });
});

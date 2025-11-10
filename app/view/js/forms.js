document.addEventListener("DOMContentLoaded", () => {

    // Alternância de visibilidade da senha 
    document.querySelectorAll(".toggle-password").forEach((btn) => {
        btn.addEventListener("click", () => {
            const input = btn.parentElement.querySelector("input[type='password'], input[type='text']");
            if (!input) return;
            if (input.type === "password") {
                input.type = "text";
                btn.querySelector("img").src = "/view/img/cadeado.png";
            } else {
                input.type = "password";
                btn.querySelector("img").src = "/view/img/red-eyes.png";
            }
        });
    });

    // === Objeto global com todas as funções ===
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

        /* Funções auxiliares */
        onlyDigits(v) {
            return String(v || "").replace(/\D/g, "");
        },

        /* Máscaras */
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

        /* Validações */
        validateName(name) {
            return /^[A-Za-zÀ-ÿ\s]+$/.test(name.trim());
        },
        validateUsername(val, input) {
            const invalidCharMatch = val.match(/[^A-Za-z0-9ç!@#$%^&*()_\-+=.?]/);
            if (val.length < 3) {
                window.formUtils.displayError(input, "Mínimo 3 caracteres.");
            } else if (invalidCharMatch) {
                window.formUtils.displayError(input, `Caractere inválido: "${invalidCharMatch[0]}"`);
            } else if (val.length > 100) {
                window.formUtils.displayError(input, "Limite máximo de 100 caracteres.");
            } else {
                return true;
            }
            return false;
        },
        validatePassword(val, input) {
            const invalidCharMatch = val.match(/[^A-Za-z0-9ç!@#$%^&*()_\s\-+=.?\/]/);
            if (val.length < 8) {
                window.formUtils.displayError(input, "Mínimo 8 caracteres.");
            } else if (invalidCharMatch) {
                window.formUtils.displayError(input, `Caractere inválido: "${invalidCharMatch[0]}"`);
            } else if (val.length > 100) {
                window.formUtils.displayError(input, "Limite máximo de 100 caracteres.");
            } else {
                return true;
            }
            return false;
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
            if (d.length === 0) return true;
            if (d.length < 8) return false;
            const day = +d.substring(0, 2);
            const month = +d.substring(2, 4);
            const year = +d.substring(4, 8);
            if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1900 || year > 2025) return false;
            const obj = new Date(year, month - 1, day);
            return obj.getFullYear() === year && obj.getMonth() === month - 1 && obj.getDate() === day;
        },

        /* Configuração de inputs interativos */
        setupInteractiveInputs(form) {
            const inputs = form.querySelectorAll("input");
            inputs.forEach((input) => {
                const name = input.name;
                const id = input.id;

                input.addEventListener("input", () => {
                    if (name === "cpf") input.value = window.formUtils.applyCpfMask(input.value);
                    if (name === "telefone") input.value = window.formUtils.applyPhoneMask(input.value);
                    if (id === "nascimento" || name === "data_nascimento")
                        input.value = window.formUtils.applyDateMask(input.value);
                });

                input.addEventListener("blur", () => {
                    const val = input.value.trim();
                    window.formUtils.removeError(input);
                    if (!val) return;

                    if (name === "nome_completo" && !window.formUtils.validateName(val))
                        window.formUtils.displayError(input, "O nome deve conter apenas letras.");
                    else if (name === "username") window.formUtils.validateUsername(val, input);
                    else if (name === "senha") window.formUtils.validatePassword(val, input);
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

        /* Modal de Sucesso */
        mostrarModalSucesso(message, redirectUrl) {
            const modal = document.createElement('div');
            modal.className = 'modal-sucesso';
            modal.innerHTML = `
                <div class="modal-conteudo-sucesso">
                    <h2>Sucesso!</h2>
                    <p>${message}</p>
                    <button class="btn-modal-sucesso" id="btn-modal-fechar">FECHAR</button>
                </div>
            `;
            document.body.appendChild(modal);

            modal.querySelector('#btn-modal-fechar').addEventListener('click', () => {
                modal.remove();
                if (redirectUrl) window.location.href = redirectUrl;
            });

            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                    if (redirectUrl) window.location.href = redirectUrl;
                }
            });
        },
    };

    const path = window.location.pathname;
    if (path.includes("/cadastro")) {
        const form = document.querySelector("#form-cadastro");
        if (form) window.formUtils.setupInteractiveInputs(form);
    }
    if (path.includes("/login")) {
        const form = document.querySelector("#form-login");
        if (form) window.formUtils.setupInteractiveInputs(form);
    }

    const params = new URLSearchParams(window.location.search);
    if (params.get("sucesso") === "true" || params.get("sucesso") === "1") {
        let msg = "Operação realizada com sucesso!";
        if (path.includes("cadastro")) msg = "Cadastro realizado com sucesso!";
        if (path.includes("editar")) msg = "Perfil atualizado com sucesso!";
        window.formUtils.mostrarModalSucesso(msg, "/login");
    }

    if (params.get("erro")) {
        const mensagem = decodeURIComponent(params.get("erro"));
        const box = document.createElement("div");
        box.className = "erro-cadastro-box";
        box.innerHTML = `
            <div class="erro-cadastro">
                <p>${mensagem}</p>
            </div>
        `;
        document.body.appendChild(box);
    }

});

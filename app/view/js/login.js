document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-login");
    if (!form) return; // Se o formulário não existir, sai da função
    // Utiliza as funções de validação do utilitário global
    const { validateUsername, validatePassword } = window.formUtils;
    // Configura o evento de submissão do formulário
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        // Obtém os valores dos campos e remove espaços em branco
        const username = form.querySelector("input[name='usuario']").value.trim();
        const senha = form.querySelector("input[name='senha']").value.trim();
        // Valida os campos e exibe mensagens de erro conforme necessário
        if (!username || !senha) {
            alert("Preencha todos os campos!");
            return;
        }
        // Validações específicas
        if (!validateUsername(username)) {
            alert("Mínimo 2 caracteres.\nMáximo 10 caracteres.");
            return;
        }
        // Validação de senha
        if (!validatePassword(senha)) {
            alert("Mínimo 8 caracteres.\nMáximo 10 caracteres.");
            return;
        }
        // Se todas as validações passarem, simula o login bem-sucedido
        alert("Login realizado com sucesso!");
        window.location.href = "../jogo/jogo.html";
    });
});

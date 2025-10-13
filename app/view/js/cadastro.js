// Aguarda o carregamento completo do DOM antes de executar o script
document.addEventListener("DOMContentLoaded", () => {
// Usa a função utilitária global 'setupFormSubmission' definida em forms.js
// Essa função cuida da validação, exibição de mensagens e redirecionamento após o envio do formulário
  window.formUtils.setupFormSubmission("#form-cadastro", {
    successMessage: "Cadastro realizado com sucesso!",
    redirect: "../../modules/login/login.html"
  });
});

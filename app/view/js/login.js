// Aguarda o carregamento completo do DOM antes de executar o script
document.addEventListener("DOMContentLoaded", () => {
  window.formUtils.setupFormSubmission("#form-login", {
    redirect: "../jogo/jogo.html"
  });
});

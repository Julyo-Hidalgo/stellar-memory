// Executa o código apenas depois que todo o conteúdo da página for carregado
document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById('profile-form');
  if (form) {
    // Aplica máscaras e validações em tempo real (CPF, telefone, data, etc.)
    window.formUtils.setupInteractiveInputs(form);
  }
});
// Executa o código apenas depois que todo o conteúdo da página for carregado
document.addEventListener("DOMContentLoaded", () => {
// Configura o envio do formulário de edição de perfil usando o utilitário central
// A função setupFormSubmission faz todas as verificações de validação e mostra alertas apropriados
  window.formUtils.setupFormSubmission("#profile-form", {
    successMessage: "Alterações salvas com sucesso!"
  });
});

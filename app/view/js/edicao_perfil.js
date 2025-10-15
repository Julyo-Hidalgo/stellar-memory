// Executa o código apenas depois que todo o conteúdo da página for carregado
document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById('profile-form');
  if (form) {
    // ✅ Aplica máscaras e validações em tempo real (CPF, telefone, data, etc.)
    window.formUtils.setupInteractiveInputs(form);
  }

  // Configura o envio do formulário de edição de perfil usando o utilitário central
  // A função setupFormSubmission faz todas as verificações de validação e mostra alertas apropriados
  window.formUtils.setupFormSubmission("#profile-form", {
    successMessage: "Alterações salvas com sucesso!"
  });

  const inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="password"]');

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
});

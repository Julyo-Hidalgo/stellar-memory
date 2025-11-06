document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#form-cadastro");
  if (form) {
    window.formUtils.setupInteractiveInputs(form);
  }

  window.formUtils.setupFormSubmission("#form-cadastro", {
    successMessage: "Cadastro realizado com sucesso!",
    redirect: "/login"
  });
});

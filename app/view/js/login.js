document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#form-login");
  if (form) {
    window.formUtils.setupInteractiveInputs(form);
  }

  window.formUtils.setupFormSubmission("#form-login", {
    redirect: "/jogo"
  });
});


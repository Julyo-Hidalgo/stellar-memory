
/*adicionando um script js para fazer a repetição das cartas*/

document.addEventListener("DOMContentLoaded", () => {
    const cartasContainer = document.getElementById("cartas-container");

    const verso = "../../img/1.png";

    const quantidadeCartas = 16;

    for (let i = 0; i < quantidadeCartas; i++) {
      const carta = document.createElement("div");
      carta.classList.add("carta");

      const img = document.createElement("img");
      img.src = verso;
      img.alt = "Verso da Carta";

      carta.appendChild(img);
      cartasContainer.appendChild(carta);
    }
  });
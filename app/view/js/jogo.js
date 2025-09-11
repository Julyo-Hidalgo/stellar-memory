/*adicionando um script js para fazer a repetição das cartas*/
function loadCards() {
  const cartasContainer = document.getElementById("cartas-container");

  cartasContainer.innerHTML = "";
  const verso = "../../img/1.png";

  const quantitySelector = document.getElementById(
    "configuracao-tabuleiro"
  ).value;

  let quantidadeCartas = 16;

  let linhas = 4;
  let colunas = 4;

  if (quantitySelector !== "selecione") {
    const splitQuantity = quantitySelector.split("x");
    linhas = parseInt(splitQuantity[0]);
    colunas = parseInt(splitQuantity[1]);
    quantidadeCartas = linhas * colunas;
  }

  cartasContainer.style.gridTemplateColumns = `repeat(${colunas}, 1fr)`;
  cartasContainer.style.gridTemplateRows = `repeat(${linhas}, 1fr)`;

  for (let i = 0; i < quantidadeCartas; i++) {
    const carta = document.createElement("div");
    carta.classList.add("carta");

    const img = document.createElement("img");
    img.src = verso;
    img.alt = "Verso da Carta";

    carta.appendChild(img);
    cartasContainer.appendChild(carta);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadCards();
});

document.getElementById("botao-jogar").addEventListener("click", () => {
  loadCards();
});

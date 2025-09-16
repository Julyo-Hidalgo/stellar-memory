/*adicionando um script js para fazer a repetição das cartas*/
function loadCards() {
  const cartasContainer = document.getElementById("cartas-container");

  cartasContainer.innerHTML = "";
  const verso = "../../img/1.png";
  //limpa todo o conteudo html dentro do cointainer, 
  //assim ele pode ser reiniciado ou ter o tamanho alterado

  const quantitySelector = document.getElementById(
    "configuracao-tabuleiro"
  ).value;
  //pega o valor selecionado pelo usuario no select configuração do tabuleiro
  let quantidadeCartas = 16;
  let linhas = 4;
  let colunas = 4;

  if (quantitySelector !== "selecione") {
    const splitQuantity = quantitySelector.split("x");
    //divide a string como marco desse divisão sendo o x
    //ou seja um lado fica como coluna e outro como linha 
    linhas = parseInt(splitQuantity[0]);
    colunas = parseInt(splitQuantity[1]);
    //converte a string em inteiros
    quantidadeCartas = linhas * colunas;
    //calcula a qntd de cartas que deve aparecer
    //de acordo com o que o usuario seleciona
    //multiplicando as linhas e as colunas
  }

  cartasContainer.style.gridTemplateColumns = `repeat(${colunas}, 1fr)`;
  cartasContainer.style.gridTemplateRows = `repeat(${linhas}, 1fr)`;
  //cada coluna e cada linha vao ter o mesmo tamanho

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
//espera pag e html carregadartotalmente

document.getElementById("botao-jogar").addEventListener("click", () => {
  loadCards();
});
//adiciona um ouvinte,  clicar botao (no caso o botao jogar)
//quando o botao "jogar" é clicado
// (apos o usuairo selecionar as configurações/modalidade do tabuleiro), 
//o tabuleiro muda suas confgigurações, mostrando a quantidade d cartas selecionadas
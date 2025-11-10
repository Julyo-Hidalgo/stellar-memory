let cartas = []; //armazena as cartas
let cartasViradas = [];//armazena as cartas q foram clicadas e viradas
let paresEncontrados = 0;//conta os pares que foram escontrados
let podeVirar = true;
let modoTrapacaAtivo = false;//ver se a trapaça esta ativada ou n
let contadorJogadas = 0;

function tempoParaSegundos(tempoStr, modalidade) {
  if (!tempoStr || !tempoStr.includes(':')) return 0;

  const [min, seg] = tempoStr.split(':').map(Number);
  let totalSegundos = (min * 60) + seg;

  // No modo "contra o tempo", o cronômetro vai descendo — então precisamos calcular o tempo usado.
  // se o tempo total era 10:00 (600s) e terminou em 08:30 (510s), o jogador usou 90s.
  if (modalidade === 'contra_tempo') {
    let tempoTotal = 0;
    switch (document.getElementById("configuracao-tabuleiro").value) {
      case '2x2': tempoTotal = 20; break;
      case '4x4': tempoTotal = 120; break;
      case '6x6': tempoTotal = 300; break;
      case '8x8': tempoTotal = 600; break;
      default: tempoTotal = 0;
    }
    totalSegundos = tempoTotal - totalSegundos;
  }

  return Math.max(0, totalSegundos); 
}


async function salvarPartidaApi(vitoria = false) {
  const tempoStr = document.getElementById("tempo-partida").textContent;
  const jogadas = parseInt(document.getElementById("numero-jogadas").textContent);
  const modalidade = document.getElementById("modalidade").value;
  const tamanho = document.getElementById("configuracao-tabuleiro").value;

  // Converte modalidade para formato ('C' ou 'T')
  const modalidadeCodigo = modalidade === "classico" ? "C" : "T";

  // Extrai o número do formato "2x2" para  2
  const tamanhoNumero = parseInt(tamanho);

  // Converte tempo para segundos
  const tempo = tempoParaSegundos(tempoStr, modalidade);

  const formData = new FormData();
  formData.append("tempo_partida", tempo);
  formData.append("total_jogadas", jogadas);
  formData.append("modalidade", modalidadeCodigo);
  formData.append("tamanho_tabuleiro", tamanhoNumero);
  formData.append("vitoria", vitoria ? 1 : 0);

  try {
    const response = await fetch("/partida/salvar", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      console.log("Partida salva com sucesso.", data.partida_id);
    } else {
      console.error("Erro ao salvar partida:", data.message);
    }
  } catch (error) {
    console.error("Erro de comunicação com o servidor:", error);
  }
}

// Sistema de notificações
function mostrarNotificacao(mensagem, tipo = 'info') {
  // Remove notificações existentes para evitar duplicação
  document.querySelectorAll('.notificacao').forEach(notif => notif.remove());
  
  const notificacao = document.createElement('div');
  notificacao.className = `notificacao notificacao-${tipo}`;
  notificacao.innerHTML = `
    <div class="notificacao-conteudo">
      <span class="notificacao-mensagem">${mensagem}</span>
      <button class="notificacao-fechar">&times;</button>
    </div>
  `;
  
  document.body.appendChild(notificacao);
  
  setTimeout(() => {
    notificacao.classList.add('notificacao-ativa');
  }, 10);
  
  const timeout = setTimeout(() => {
    fecharNotificacao(notificacao);
  }, 4000);
  
  const btnFechar = notificacao.querySelector('.notificacao-fechar');
  btnFechar.addEventListener('click', () => {
    clearTimeout(timeout);
    fecharNotificacao(notificacao);
  });
}

function fecharNotificacao(notificacao) {
  notificacao.classList.remove('notificacao-ativa');
  notificacao.classList.add('notificacao-saindo');
  
  setTimeout(() => {
    if (notificacao.parentNode) {
      notificacao.parentNode.removeChild(notificacao);
    }
  }, 500);
}

// vitoria
function mostrarModalVitoria() {
  const modal = document.getElementById('modal-vitoria');
  salvarPartidaApi(true);
  // Preenche as estatísticas da vitória com os valores atuais
  document.getElementById('modal-tempo-partida').textContent = document.getElementById('tempo-partida').textContent;
  document.getElementById('modal-numero-jogadas').textContent = document.getElementById('numero-jogadas').textContent;

  // Mostra o modal
  modal.style.display = 'flex';

  // Event Listeners
  document.getElementById('btn-jogar-novamente').onclick = () => {
    modal.style.display = 'none';
    loadCards();
  };
  
  document.getElementById('btn-voltar-menu').onclick = () => {
    modal.style.display = 'none';
    desistirJogo();
  };
  
  // Fechar se clicar fora
  modal.onclick = (e) => {
    if (e.target === modal) modal.style.display = 'none';
  };
}

function criarParesParaTabuleiro(quantidadeCartas) {
  //lista de cartas
  const todasCartas = [
   { nome: "alien1", imagem: "alien.png", valorPar: 1 },
    { nome: "alien2", imagem: "alien (2).png", valorPar: 2 },
    { nome: "buraconegro1", imagem: "buraconegro.png", valorPar: 3 },
    { nome: "buraconegro2", imagem: "buraconegro (2).png", valorPar: 4 },
    { nome: "cometa1", imagem: "cometa ou asteroide.png", valorPar: 5 },
    { nome: "cometa2", imagem: "cometa ou asteroide (2).png", valorPar: 6 },
    { nome: "dino", imagem: "dino.png", valorPar: 7 }, 
    { nome: "disco", imagem: "disco.png", valorPar: 8 },
    { nome: "einstein", imagem: "einstein.png", valorPar: 9 },
    { nome: "galaga", imagem: "galaga nave.png", valorPar: 10 }, 
    { nome: "gato1", imagem: "gato.png", valorPar: 11 },
    { nome: "gato2", imagem: "gato (2).png", valorPar: 12 },
    { nome: "gato3", imagem: "gato (3).png", valorPar: 13 }, 
    { nome: "jupiter", imagem: "júpiter.png", valorPar: 14 },
    { nome: "lua", imagem: "lua.png", valorPar: 15 },
    { nome: "marte1", imagem: "marte.png", valorPar: 16 },
    { nome: "marte2", imagem: "marte (2).png", valorPar: 17 },
    { nome: "marte3", imagem: "marte (3).png", valorPar: 18 }, 
    { nome: "mercury", imagem: "mercury.png", valorPar: 19 },
    { nome: "netuno1", imagem: "netuno.png", valorPar: 20 },
    { nome: "netuno2", imagem: "netuno (2).png", valorPar: 21 },
    { nome: "saturn", imagem: "saturn.png", valorPar: 22 },
    { nome: "sun", imagem: "sun.png", valorPar: 23 },
    { nome: "terra", imagem: "terra.png", valorPar: 24 },
    { nome: "venus", imagem: "venus.png", valorPar: 25 },
    { nome: "nebulosa", imagem: "nebulosaa.png", valorPar: 26 }, 
    { nome: "ovni", imagem: "ovni.png", valorPar: 27 },
    { nome: "satélite", imagem: "satélite.png", valorPar: 28 },
    { nome: "supernova1", imagem: "supernova.png", valorPar: 29 },
    { nome: "supernova2", imagem: "supernova (2).png", valorPar: 30 },
    { nome: "telescope", imagem: "telescope.png", valorPar: 31 },
    { nome: "vialactea", imagem: "vialactea.png", valorPar: 32 } 
  ];

  //ve a qntd d carats e calcula quantos pares é necessario
  const paresNecessarios = quantidadeCartas / 2;
  
  //seleciona as cartas aleatórias para o jogo e evita duplicação
  const cartasSelecionadas = [];
  const indicesUsados = new Set();
  
  //loop para escolher as qntd de cartas certas para o jogo
  //para isso é gerado um valr aleatorio
  //caso o valor n tenha sido usado (ou seja, uma carta com aquele valor ja foi pega p/ usar no jogo
  //a carta é usado e marcada como usada
  while (cartasSelecionadas.length < paresNecessarios) {
    const randomIndex = Math.floor(Math.random() * todasCartas.length);
    if (!indicesUsados.has(randomIndex)) {
      indicesUsados.add(randomIndex);
      cartasSelecionadas.push(todasCartas[randomIndex]);
    }
  }

  //duplica as cartas selecionadas para formar pares
  const cartasComPares = []; //onde ficaram armazenadas as cartas que ja foram duplicadas
  cartasSelecionadas.forEach(carta => {
    cartasComPares.push({...carta});
    cartasComPares.push({...carta});
  });

  //embaralha as cartas (com fisher-yates)
  //embaralha a carta de trás para frente, gerando um valor aleatório j (antes da posição oficial i)
  //troca as cartas da posição i, com a posição aleatória j
  for (let i = cartasComPares.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cartasComPares[i], cartasComPares[j]] = [cartasComPares[j], cartasComPares[i]];
  }

  return cartasComPares;
}


//função para ativar o modo trapaça
function ativarModoTrapaca() {
  if (modoTrapacaAtivo) return
  
  modoTrapacaAtivo = true;
  
  //ve as cartas que estao sno tabuleiro, verifica se estao formadas par ou não
  //e só revea as carats que não estao com o par formado, buscando na pasta img
  cartas.forEach(carta => {
    if (!carta.encontrada) { // Só mostra as que não foram encontradas ainda
      const img = carta.elemento.querySelector('img');
      img.src = carta.imagemFrente;
    }
  });
  
  // muda aparência dos botões
  document.getElementById('botao_ativar_trapaca').classList.add('ativo');
  document.getElementById('botao_desativar_trapaca').classList.remove('ativo');
}

//desativar o modo trapaça
function desativarModoTrapaca() {
  if (!modoTrapacaAtivo) return;
  
  modoTrapacaAtivo = false;
  
  //percorre as cartas que estão no tabuleiro
  //e verifica as cartas q anteriormente não tinham seido achado par
  // voltar apenas as cartas que não estão viradas nem encontradas para o verso
  //busca a imagem do verso na pasta img
  cartas.forEach(carta => {
    if (!carta.virada && !carta.encontrada) {
      const img = carta.elemento.querySelector('img');
      img.src = "view/img/jogo/1.png";
    }
  });
  
  //muda a aparencia dos botoes
  document.getElementById('botao_ativar_trapaca').classList.remove('ativo');
  document.getElementById('botao_desativar_trapaca').classList.add('ativo');
}

let intervalo;

/*adicionando um script js para fazer a repetição das cartas*/
function loadCards() {
  const cartasContainer = document.getElementById("cartas-container");

  document.getElementById("numero-jogadas").textContent = 0;
  contadorJogadas = 0;

  const tempoPartida = document.getElementById("tempo-partida");
  const modalidade = document.getElementById("modalidade").value;
  clearInterval(intervalo);

  cartasContainer.innerHTML = "";
  const verso = "view/img/jogo/1.png";
  
  
  const quantitySelector = document.getElementById(
    "configuracao-tabuleiro"
  ).value;
  //pega o valor selecionado pelo usuario no select configuração do tabuleiro
  let quantidadeCartas = 16;
  let linhas = 4;
  let colunas = 4;
 // Calcula tempo baseado no tamanho do tabuleiro

 
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


let tempoBase;
if (quantidadeCartas <= 4) { //2x2
  tempoBase = 20; // 30segundos
} else if (quantidadeCartas <= 16) { // 4x4
  tempoBase = 120; // 2 minutos
} else if (quantidadeCartas <= 36) { //6x6
  tempoBase = 300; // 5 minutos
} else { // 8x8
  tempoBase = 600; // 10 minutos
}

let segundos = modalidade === "contra_tempo" ? tempoBase : 0;
  intervalo = setInterval(() => {
    // Atualiza o tempo da partida 
    const min = Math.floor(segundos / 60);
    const seg = segundos % 60;
    tempoPartida.textContent = `${min.toString().padStart(2, "0")}:${seg
      .toString()
      .padStart(2, "0")}`;
    
    // incrementa ou decrementa o tempo dependendo da modalidade
    if (modalidade === "classico") {
      segundos++;
    } else if (modalidade === "contra_tempo") {
      segundos--;
      if (segundos < 0) {
        clearInterval(intervalo);
        mostrarNotificacao('Tempo esgotado! Tente novamente.', 'erro');
      }
    }
  }, 800);

  //limpa todo o conteudo html dentro do cointainer, 
  //assim ele pode ser reiniciado ou ter o tamanho alterado



  cartasContainer.style.gridTemplateColumns = `repeat(${colunas}, 1fr)`;
  cartasContainer.style.gridTemplateRows = `repeat(${linhas}, 1fr)`;
  //cada coluna e cada linha vao ter o mesmo tamanho

    modoTrapacaAtivo = false;//garante q o modo trapaça esteja desativado quano jogo começar

const cartasDoJogo = criarParesParaTabuleiro(quantidadeCartas);

 cartas = [];
  cartasViradas = [];
  paresEncontrados = 0;
  podeVirar = true;

  for (let i = 0; i < quantidadeCartas; i++) {
    const carta = document.createElement("div");
    carta.classList.add("carta");
    carta.addEventListener('click', () => virarCarta(i));
 


    const img = document.createElement("img");
    img.src = verso;
    img.alt = "Verso da Carta";

    carta.appendChild(img);
    cartasContainer.appendChild(carta);

   //registro de cartas
     cartas.push({
      indice: i,//posição/valor dessa carta 
      valorPar: cartasDoJogo[i].valorPar, // Valor que define o par
      imagemFrente: `view/img/jogo/cartas/${cartasDoJogo[i].imagem}`,// Imagem da frente
      nome: cartasDoJogo[i].nome,// Nome da carta
      virada: false,  // Se está com frente visível
      encontrada: false, // Se já formou par
      elemento: carta// Referência ao elemento HTML
    });
  }

   document.getElementById('botao_ativar_trapaca').classList.remove('ativo');
  document.getElementById('botao_desativar_trapaca').classList.remove('ativo');
}

function virarCarta(indice) {
  //verificações  para garantir que a carta ja não esta virada ou o par ja foi encontardo
  if (!podeVirar || 
      cartas[indice].virada || 
      cartas[indice].encontrada || 
      cartasViradas.length >= 2 || 
       modoTrapacaAtivo)
      {
    return;
  }

  //vira a carta, buscando o elemento daquele verso clicado na pasta img
  const img = cartas[indice].elemento.querySelector('img');
  img.src = cartas[indice].imagemFrente;//muda a imagem
  
  cartas[indice].virada = true;//atualiza para virada
  cartasViradas.push(indice);
  
  // Verificar se temos duas cartas viradas
  //se sim, bloqueia ovos cliques por 1s e é verificado o par
  if (cartasViradas.length === 2) {
    podeVirar = false;
    setTimeout(verificarPar, 500);
  }

  //atualiza o contador de jogadas
  if (cartasViradas.length  === 2){
  contadorJogadas = document.getElementById("numero-jogadas").textContent;
  contadorJogadas = parseInt(contadorJogadas) + 1;
  document.getElementById("numero-jogadas").textContent = contadorJogadas;
  }
  
}

function verificarPar() {
  const [indice1, indice2] = cartasViradas; //tenta achar o valor das cartas viradas
  
  //compara o valor das cartas viradas, se forem iguais são pares
  if (cartas[indice1].valorPar === cartas[indice2].valorPar) {
    //cartas ficam viradas
    cartas[indice1].encontrada = true;
    cartas[indice2].encontrada = true;
    paresEncontrados++;
    
    //verifica se o numerodo de pares encontrados é igual a qntd total de pares
    if (paresEncontrados === cartas.length / 2) {//pares encontrados  cartas totais daquele jogo/2
      setTimeout(() => {
        clearInterval(intervalo);
        mostrarModalVitoria();
      }, 200);//espera 0,2s
    }
  } else {
    //caso as cartas viadas não sejam pares, é buscado a carta de verso na pasta img
    setTimeout(() => {
      const img1 = cartas[indice1].elemento.querySelector('img');
      const img2 = cartas[indice2].elemento.querySelector('img');
      
      img1.src = "view/img/jogo/1.png";
      img2.src = "view/img/jogo/1.png";
      
      cartas[indice1].virada = false;
      cartas[indice2].virada = false;
    }, 300);//espera 0,3s
  }
  
  //apaga dadosinormações para a proxima jogada, reativando cliques
  setTimeout(() => {
    cartasViradas = [];
    podeVirar = true;
  }, 600);//espera
}

function desistirJogo() {
  // Para qualquer temporizador ativo (se tiver)
  clearInterval(intervalo);
  
  //apaga/reseta todas as variáveis do jogo
  cartas = [];
  cartasViradas = [];
  paresEncontrados = 0;
  podeVirar = true;
  modoTrapacaAtivo = false;//desativa modo trapaça
  
  //limpa o tabuleiro/tira as cartas
  const cartasContainer = document.getElementById("cartas-container");
  cartasContainer.innerHTML = "";
  

  document.getElementById("configuracao-tabuleiro").value = "";
  document.getElementById("modalidade").value = "";

    //remove qualquer estilo de grid do container
  cartasContainer.style.gridTemplateColumns = "";
  cartasContainer.style.gridTemplateRows = "";

  //volta para a tela de configurações
  document.body.classList.remove("jogo-ativo");
  
  //verifica se botoes de trapaça estao inativados 
  document.getElementById('botao_ativar_trapaca').classList.remove('ativo');
  document.getElementById('botao_desativar_trapaca').classList.remove('ativo');
  
  //apaga/zera os textos, como movimentos, tempo restante e tempo da partida
  document.getElementById("numero-jogadas").textContent = "0";
  document.getElementById("tempo-partida").textContent = "00:00";
  document.getElementById("status-jogo").style.display = 'none'; // Esconde os status/controles
  document.getElementById("config-menu").style.display = 'flex'; // Mostra os selects/botão Jogar

}


function inicializarEventos() {
    //ocultar os status do jogo ao carregar
    document.getElementById("status-jogo").style.display = 'none';

    //event Listeners
    document.getElementById("botao_ativar_trapaca").addEventListener("click", ativarModoTrapaca);
    document.getElementById("botao_desativar_trapaca").addEventListener("click", desativarModoTrapaca);
    document.getElementById("botao-desistir").addEventListener("click", () =>{
      salvarPartidaApi(false);
      desistirJogo();
    });
    document.getElementById("botao-jogar").addEventListener("click", iniciarJogo);
}

function iniciarJogo() {
    const tabuleiroSelecionado = document.getElementById("configuracao-tabuleiro").value;
    const modalidadeSelecionada = document.getElementById("modalidade").value;

    if (!tabuleiroSelecionado || tabuleiroSelecionado === "Selecione..." || 
        !modalidadeSelecionada || modalidadeSelecionada === "Selecione...") {
        mostrarNotificacao('Por favor, selecione a Configuração do Tabuleiro e a Modalidade para começar.', 'erro');
        return;
    }

    //iniciar o jogo
    loadCards(); 
    
    // Troca de Telas/Containers
    document.getElementById("config-menu").style.display = 'none'; // Esconde os selects e botão Jogar
    document.getElementById("status-jogo").style.display = 'flex'; // Mostra os status e botões de controle
}

// Chama função de inicialização quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", inicializarEventos);

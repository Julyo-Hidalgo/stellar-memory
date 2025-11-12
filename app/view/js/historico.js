let xhttp;
let limit = 10;
let offset = 0;

function carregarPartidas(){
	console.log("Carregando mais partidas...");
	xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = preencherTabelaHistoricoPartidas;
	xhttp.open("GET", `/historico/carregar-partidas?offset=${offset}&limit=${limit}`);
	xhttp.send();
}

function preencherTabelaHistoricoPartidas(){
	try{
		if (xhttp.readyState === XMLHttpRequest.DONE){
			if (xhttp.status === 200){

				console.log("Resposta recebida com sucesso.");

				let resposta = JSON.parse(xhttp.responseText);

				console.log(resposta);

                let partidas = resposta.partidas;
                let existemMaisPartidas = resposta.existemMaisPartidas;

				for (let partida of partidas){
					console.log(partida);
				}

				if(partidas.length <= 0){
					const tbody = document.querySelector("tbody");

                    const tr = document.createElement("tr");
                    const td = document.createElement("td");
                    td.textContent = "Você não jogou NADA ainda!";
                    td.setAttribute("colspan", "7");
                    td.style = "text-align: center";

                    tr.appendChild(td);
                    tbody.appendChild(tr);

					return;
				}

				let tbody = document.querySelector('tbody');
				for (let i = 0; i < partidas.length; i++) {
					let partida = partidas[i];

					let linha = document.createElement("tr");

					let informacoesPartida = ["tamanho_tabuleiro", "modalidade", "tempo_partida", "total_jogadas", "resultado", "data", "hora"];

					for (let propriedade of informacoesPartida) {
						let celula = document.createElement("td");

						if ((propriedade === "tempo" || propriedade === "data" || propriedade === "hora") && partida["modo"] === "Contra o tempo") {
							let tagTime = document.createElement("time");
							tagTime.textContent = partida[propriedade];
							celula.appendChild(tagTime);
						}else{

							if (propriedade === "tamanho_tabuleiro"){
								partida["tamanho_tabuleiro"] = partida["tamanho_tabuleiro"] + "X" + partida["tamanho_tabuleiro"];
							}

							celula.textContent = partida[propriedade];
						}
						
						linha.appendChild(celula);
					}

					tbody.appendChild(linha);
				}

				if(!document.getElementById("carregar-mais")){
					if (existemMaisPartidas) {
						let botao = document.createElement("button");

						botao.textContent = "Carregar Mais";
						botao.setAttribute("id", "carregar-mais");
						botao.addEventListener("click", carregarPartidas);

						let secaoHistorico = document.getElementById("historico");

						secaoHistorico.appendChild(botao);
					}
				}else {
					if (!existemMaisPartidas) {
						let botaoCarregarMais = document.getElementById("carregar-mais");
						if (botaoCarregarMais) {
							botaoCarregarMais.remove();
						}
					}
				}

				offset += limit;
			}else{
				alert("Erro - Código de resposta HTTP: " + xhttp.status);
			}
		}
	}catch(e){
		alert("Ocorreu uma exceção: " +  e.name + e.message);
	}
}

document.addEventListener("DOMContentLoaded", carregarPartidas);

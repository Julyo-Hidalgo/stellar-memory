// Dados de exemplo do ranking (em uma aplicação real, estes dados viriam de uma API)
const rankingData = [
    { username: "Jogador1", tabuleiro: "4x4", jogadas: 25, modo: "Clássico", tempo: "05:30", data: "20/08/2025" },
    { username: "Jogador2", tabuleiro: "6x6", jogadas: 30, modo: "Contra o Tempo", tempo: "10:15", data: "21/08/2025" },
    { username: "Jogador3", tabuleiro: "2x2", jogadas: 15, modo: "Clássico", tempo: "02:45", data: "22/08/2025" },
    { username: "Jogador4", tabuleiro: "8x8", jogadas: 40, modo: "Contra o Tempo", tempo: "15:00", data: "23/08/2025" },
    { username: "Jogador5", tabuleiro: "4x4", jogadas: 20, modo: "Clássico", tempo: "04:50", data: "24/08/2025" },
    { username: "Jogador6", tabuleiro: "6x6", jogadas: 35, modo: "Contra o Tempo", tempo: "12:30", data: "25/08/2025" },
    { username: "Jogador7", tabuleiro: "2x2", jogadas: 18, modo: "Clássico", tempo: "03:10", data: "26/08/2025" },
    { username: "Jogador8", tabuleiro: "8x8", jogadas: 45, modo: "Contra o Tempo", tempo: "18:40", data: "27/08/2025" },
    { username: "Jogador9", tabuleiro: "4x4", jogadas: 22, modo: "Clássico", tempo: "05:55", data: "28/08/2025" },
    { username: "Jogador10", tabuleiro: "6x6", jogadas: 32, modo: "Contra o Tempo", tempo: "11:20", data: "29/08/2025" },
    { username: "Jogador11", tabuleiro: "2x2", jogadas: 12, modo: "Clássico", tempo: "02:15", data: "30/08/2025" },
    { username: "Jogador12", tabuleiro: "8x8", jogadas: 50, modo: "Contra o Tempo", tempo: "19:30", data: "31/08/2025" },
    { username: "Jogador13", tabuleiro: "4x4", jogadas: 28, modo: "Clássico", tempo: "06:40", data: "01/09/2025" },
    { username: "Jogador14", tabuleiro: "6x6", jogadas: 38, modo: "Contra o Tempo", tempo: "13:50", data: "02/09/2025" },
    { username: "Jogador15", tabuleiro: "2x2", jogadas: 16, modo: "Clássico", tempo: "03:00", data: "03/09/2025" }
];

// Função para renderizar a tabela do ranking
function renderRanking(data) {
    const tbody = document.getElementById('ranking-body');
    tbody.innerHTML = '';

    // Limita aos 10 primeiros jogadores
    const top10 = data.slice(0, 10);

    top10.forEach((jogador, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${jogador.username}</td>
            <td>${jogador.tabuleiro}</td>
            <td>${jogador.jogadas}</td>
<td>${jogador.modo}</td>
	            <td>${jogador.tempo}</td>
	            <td>${jogador.data}</td>
        `;
        tbody.appendChild(row);
    });
}

// Função para filtrar os dados
function filterRanking() {
    const modoSelecionado = document.getElementById('modo-jogo').value;
    const tamanhoSelecionado = document.getElementById('tamanho-tabuleiro').value;

    let dadosFiltrados = [...rankingData];

// Filtrar por modo de jogo
	    // O filtro 'all' foi removido, então o filtro é sempre aplicado
	    if (modoSelecionado) {
        dadosFiltrados = dadosFiltrados.filter(jogador => {
            if (modoSelecionado === 'classico') {
                return jogador.modo === 'Clássico';
            } else if (modoSelecionado === 'contra_tempo') {
                return jogador.modo === 'Contra o Tempo';
            }
            return true;
        });
    }

// Filtrar por tamanho do tabuleiro
	    // O filtro 'all' foi removido, então o filtro é sempre aplicado
	    if (tamanhoSelecionado) {
        dadosFiltrados = dadosFiltrados.filter(jogador => 
            jogador.tabuleiro === tamanhoSelecionado
        );
    }

    // Ordenar:
	    // 1. Por número de jogadas (menor número = melhor posição)
	    // 2. Em caso de empate, por tempo (menor tempo = melhor posição)
	    // Nota: Para ordenar por tempo, o campo 'tempo' deve ser um número (em segundos, por exemplo)
	    // ou um formato de tempo que possa ser comparado. Como o formato é 'MM:SS',
	    // a ordenação por string pode ser incorreta. Para simplificar, vamos manter a ordenação
	    // apenas por jogadas, mas o ideal seria ter o tempo em um formato numérico.
	    // Se o modo for 'Contra o Tempo', o ideal seria ordenar pelo tempo.
	    
	    // Função auxiliar para converter MM:SS para segundos
	    const timeToSeconds = (timeStr) => {
	        const [minutes, seconds] = timeStr.split(':').map(Number);
	        return minutes * 60 + seconds;
	    };
	
	    dadosFiltrados.sort((a, b) => {
	        // Se o modo for 'Contra o Tempo', ordena pelo tempo (menor tempo é melhor)
	        if (a.modo === 'Contra o Tempo' && b.modo === 'Contra o Tempo') {
	            const timeA = timeToSeconds(a.tempo);
	            const timeB = timeToSeconds(b.tempo);
	            if (timeA !== timeB) {
	                return timeA - timeB;
	            }
	        }
	        
	        // Para o modo 'Clássico' ou em caso de empate no tempo, ordena por jogadas (menor jogada é melhor)
	        return a.jogadas - b.jogadas;
	    });
    

    // Renderizar a tabela com os dados filtrados
    renderRanking(dadosFiltrados);
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
// Definir os valores padrão dos filtros (Clássico e 2x2)
	    const modoSelect = document.getElementById('modo-jogo');
	    const tamanhoSelect = document.getElementById('tamanho-tabuleiro');
	    
	    if (modoSelect) {
	        modoSelect.value = 'classico';
	    }
	    
	    if (tamanhoSelect) {
	        tamanhoSelect.value = '2x2';
	    }
	
	    // Renderizar o ranking inicial com os filtros padrão aplicados
	    filterRanking();

    // Adicionar event listener ao botão de atualizar
    const applyFiltersBtn = document.getElementById('apply-filters');
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', filterRanking);
    }

// Adicionar event listeners aos selects para filtrar automaticamente
    
    if (modoSelect) {
        modoSelect.addEventListener('change', filterRanking);
    }
    
    if (tamanhoSelect) {
        tamanhoSelect.addEventListener('change', filterRanking);
    }
});

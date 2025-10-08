// Dados de exemplo do ranking (em uma aplicação real, estes dados viriam de uma API)
const rankingData = [
    { username: "Jogador1", tabuleiro: "4x4", jogadas: 25, modo: "Clássico", data: "20/08/2025" },
    { username: "Jogador2", tabuleiro: "6x6", jogadas: 30, modo: "Contra o Tempo", data: "21/08/2025" },
    { username: "Jogador3", tabuleiro: "2x2", jogadas: 15, modo: "Clássico", data: "22/08/2025" },
    { username: "Jogador4", tabuleiro: "8x8", jogadas: 40, modo: "Contra o Tempo", data: "23/08/2025" },
    { username: "Jogador5", tabuleiro: "4x4", jogadas: 20, modo: "Clássico", data: "24/08/2025" },
    { username: "Jogador6", tabuleiro: "6x6", jogadas: 35, modo: "Contra o Tempo", data: "25/08/2025" },
    { username: "Jogador7", tabuleiro: "2x2", jogadas: 18, modo: "Clássico", data: "26/08/2025" },
    { username: "Jogador8", tabuleiro: "8x8", jogadas: 45, modo: "Contra o Tempo", data: "27/08/2025" },
    { username: "Jogador9", tabuleiro: "4x4", jogadas: 22, modo: "Clássico", data: "28/08/2025" },
    { username: "Jogador10", tabuleiro: "6x6", jogadas: 32, modo: "Contra o Tempo", data: "29/08/2025" },
    { username: "Jogador11", tabuleiro: "2x2", jogadas: 12, modo: "Clássico", data: "30/08/2025" },
    { username: "Jogador12", tabuleiro: "8x8", jogadas: 50, modo: "Contra o Tempo", data: "31/08/2025" },
    { username: "Jogador13", tabuleiro: "4x4", jogadas: 28, modo: "Clássico", data: "01/09/2025" },
    { username: "Jogador14", tabuleiro: "6x6", jogadas: 38, modo: "Contra o Tempo", data: "02/09/2025" },
    { username: "Jogador15", tabuleiro: "2x2", jogadas: 16, modo: "Clássico", data: "03/09/2025" }
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
    if (modoSelecionado !== 'all') {
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
    if (tamanhoSelecionado !== 'all') {
        dadosFiltrados = dadosFiltrados.filter(jogador => 
            jogador.tabuleiro === tamanhoSelecionado
        );
    }

    // Ordenar por número de jogadas (menor número = melhor posição)
    dadosFiltrados.sort((a, b) => a.jogadas - b.jogadas);

    // Renderizar a tabela com os dados filtrados
    renderRanking(dadosFiltrados);
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Renderizar o ranking inicial
    const dadosOrdenados = [...rankingData].sort((a, b) => a.jogadas - b.jogadas);
    renderRanking(dadosOrdenados);

    // Adicionar event listener ao botão de atualizar
    const applyFiltersBtn = document.getElementById('apply-filters');
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', filterRanking);
    }

    // Adicionar event listeners aos selects para filtrar automaticamente
    const modoSelect = document.getElementById('modo-jogo');
    const tamanhoSelect = document.getElementById('tamanho-tabuleiro');
    
    if (modoSelect) {
        modoSelect.addEventListener('change', filterRanking);
    }
    
    if (tamanhoSelect) {
        tamanhoSelect.addEventListener('change', filterRanking);
    }
});


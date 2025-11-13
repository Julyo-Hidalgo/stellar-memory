// URL da API de ranking (ajustar conforme o roteamento do index.php)
const RANKING_API_URL = '/api/ranking';

/**
 * Converte segundos para o formato MM:SS.
 * @param {number} totalSeconds - O tempo total em segundos.
 * @returns {string} O tempo formatado como MM:SS.
 */
function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

/**
 * Renderiza a tabela do ranking com os dados recebidos.
 * @param {Array<Object>} data - Array de objetos de partida.
 */
function renderRanking(data) {
    const tbody = document.getElementById('ranking-body');
    tbody.innerHTML = '';

    if (data.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="6" style="text-align: center;">Nenhuma partida encontrada para os filtros selecionados.</td>`;
        tbody.appendChild(row);
        return;
    }

    data.forEach((partida, index) => {
        const row = document.createElement('tr');
        // A procedure SQL já retorna os dados formatados (modo_jogo, data_partida, tempo_partida_formatado)
        // O tempo_partida_formatado é gerado no Controller

        partida.modo_jogo = (partida.modo_jogo === 'C') ? "Clássico" : "Contra o tempo";

        row.innerHTML = `
            <td>${partida.username}</td>
            <td>${partida.tamanho_tabuleiro_formatado}</td>
            <td>${partida.total_jogadas}</td>
            <td>${partida.modo_jogo}</td>
            <td>${partida.tempo_partida_formatado}</td>
            <td>${partida.data_partida}</td>
        `;
        tbody.appendChild(row);
    });
}

/**
 * Busca o ranking na API com base nos filtros selecionados.
 */
async function buscarRanking() {
    const modoSelecionado = document.getElementById('modo-jogo').value;
    const tamanhoSelecionado = document.getElementById('tamanho-tabuleiro').value;

    // Limpa a tabela enquanto carrega
    const tbody = document.getElementById('ranking-body');
    tbody.innerHTML = `<tr><td colspan="6" style="text-align: center;">Carregando Ranking...</td></tr>`;

    try {
        const url = `${RANKING_API_URL}?action=buscarRanking&modo_jogo=${modoSelecionado}&tamanho_tabuleiro=${tamanhoSelecionado}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const rankingData = await response.json();
        renderRanking(rankingData);

    } catch (error) {
        console.error("Erro ao buscar ranking:", error);
        const tbody = document.getElementById('ranking-body');
        tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: red;">Erro ao carregar o ranking. Verifique a conexão com o banco de dados.</td></tr>`;
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    const modoSelect = document.getElementById('modo-jogo');
    const tamanhoSelect = document.getElementById('tamanho-tabuleiro');
    
    // Inicializa o ranking com os filtros padrão (que já estão selecionados no HTML)
    buscarRanking();

    // Adiciona event listeners para buscar o ranking sempre que os filtros mudarem
    if (modoSelect) {
        modoSelect.addEventListener('change', buscarRanking);
    }
    
    if (tamanhoSelect) {
        tamanhoSelect.addEventListener('change', buscarRanking);
    }
});

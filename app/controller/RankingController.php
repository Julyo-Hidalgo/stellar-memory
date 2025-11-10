<?php
require_once 'dao/PartidaDAO.php';
require_once 'dao/DAO.php'; // Necessário para instanciar a conexão

class RankingController {

    private $partidaDAO;

    public function __construct() {
        // A classe DAO.php deve ser capaz de gerenciar a conexão com o banco de dados
        // Assumindo que a conexão é estabelecida ao instanciar o PartidaDAO (que herda de DAO)
        $this->partidaDAO = new PartidaDAO();
    }

    /**
     * Converte o formato do tabuleiro (ex: '4x4') para o formato do banco de dados (ex: 4).
     * @param string $tamanho_tabuleiro
     * @return int
     */
    private function formatarTamanhoTabuleiro($tamanho_tabuleiro) {
        // Espera-se um formato 'NxN', retorna N
        return (int)substr($tamanho_tabuleiro, 0, 1);
    }

    /**
     * Converte o formato do modo de jogo (ex: 'classico') para o formato do banco de dados (ex: 'C').
     * @param string $modo_jogo
     * @return string
     */
    private function formatarModalidade($modo_jogo) {
        switch ($modo_jogo) {
            case 'classico':
                return 'C';
            case 'contra_tempo':
                return 'T';
            default:
                return 'C'; // Padrão
        }
    }

    /**
     * Converte o tempo em segundos para o formato MM:SS.
     * @param int $segundos
     * @return string
     */
    private function formatarTempo($segundos) {
        $minutos = floor($segundos / 60);
        $segundos = $segundos % 60;
        return sprintf('%02d:%02d', $minutos, $segundos);
    }

    /**
     * Busca o ranking com base nos filtros e retorna como JSON.
     */
    public function buscarRanking() {
        // 1. Obter filtros da requisição (assumindo que são passados via GET)
        $modo_jogo_str = $_GET['modo_jogo'] ?? 'classico';
        $tamanho_tabuleiro_str = $_GET['tamanho_tabuleiro'] ?? '4x4';

        // 2. Formatar filtros para o formato do banco de dados
        $modalidade_db = $this->formatarModalidade($modo_jogo_str);
        $tamanho_db = $this->formatarTamanhoTabuleiro($tamanho_tabuleiro_str);

        // 3. Buscar dados do ranking
        $ranking_data = $this->partidaDAO->buscarRanking($modalidade_db, $tamanho_db);

        // 4. Formatar dados para a View (tempo de segundos para MM:SS)
        $ranking_formatado = array_map(function($partida) {
            $partida['tempo_partida_formatado'] = $this->formatarTempo($partida['tempo_partida']);
            // O tamanho do tabuleiro já vem formatado como 'NxN' da procedure, mas o JS espera 'NxN'
            $partida['tamanho_tabuleiro_formatado'] = $partida['tamanho_tabuleiro'] . 'x' . $partida['tamanho_tabuleiro'];
            return $partida;
        }, $ranking_data);

        // 5. Retornar como JSON
        header('Content-Type: application/json');
        echo json_encode($ranking_formatado);
    }
}

// Se o controller for chamado diretamente (ex: via rota)
if (isset($_GET['action']) && $_GET['action'] === 'buscarRanking') {
    $controller = new RankingController();
    $controller->buscarRanking();
}
?>

<?php
require_once 'dao/PartidaDAO.php';
require_once 'model/PartidaModel.php';

class PartidaController {
    private $partidaDAO;

    public function __construct() {
        $this->partidaDAO = new PartidaDAO();
    }

    public function salvarPartida() {
        header('Content-Type: application/json');
        
        try {
            //ver e verificar se usuario esta logado
            session_start();
            if (!isset($_SESSION['usuario'])) {
                http_response_code(401);
                echo json_encode(['success' => false, 'message' => 'Usuário não autenticado']);
                return;
            }

            $dados = json_decode(file_get_contents('php://input'), true);
            
            if (!$this->validarDadosPartida($dados)) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Dados inválidos']);
                return;
            }

            $partida = new PartidaModel();
            $partida->usuario_id = $_SESSION['usuario']['id'];           
            $partida->tempo_partida = (int)$dados['tempo_partida'];        
            $partida->modalidade = $dados['modalidade'];              
            $partida->tamanho_tabuleiro = (int)$dados['tamanho_tabuleiro'];
            $partida->total_jogadas = $dados['total_jogadas'];        
            $partida->vitoria = (bool)$dados['vitoria'];                    

            $partidaId = $this->partidaDAO->salvar($partida);

            echo json_encode([
                'success' => true,
                'message' => 'Partida salva com sucesso',
                'partida_id' => $partidaId
            ]);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
    }

    private function validarDadosPartida($dados) {
        return isset($dados['tempo_partida']) && is_numeric($dados['tempo_partida']) &&
               isset($dados['modalidade']) && in_array($dados['modalidade'], ['C', 'T']) &&
               isset($dados['tamanho_tabuleiro']) && in_array((int)$dados['tamanho_tabuleiro'], [2, 4, 6, 8]) &&
               isset($dados['total_jogadas']) && is_numeric($dados['total_jogadas']) &&
               isset($dados['vitoria']) && is_bool($dados['vitoria']);
    }
}

?>
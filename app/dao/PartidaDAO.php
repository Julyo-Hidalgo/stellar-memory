<?php
require_once 'dao/DAO.php';
require_once 'model/PartidaModel.php';

class PartidaDAO extends DAO {

	public function __construct() {
		parent::__construct();
	}
    
    public function salvar(PartidaModel $partida) {
        try {
            $sql = "INSERT INTO partida ( 
                usuario_id, 
                tempo_partida, 
                data_hora_partida, 
                modalidade, 
                tamanho_tabuleiro, 
                total_jogadas, 
                vitoria
            ) VALUES (?, ?, NOW(), ?, ?, ?, ?)";
            
            $stmt = $this->connection->prepare($sql);
            $stmt->execute([
                $partida->usuario_id,        
                $partida->tempo_partida,     
                $partida->modalidade,        
                $partida->tamanho_tabuleiro, 
                $partida->total_jogadas,     
                $partida->vitoria ? 1 : 0    
            ]);
            
            return $this->connection->lastInsertId();
            
        } catch (PDOException $e) {
            error_log("Erro ao salvar partida: " . $e->getMessage());
            throw new Exception("Erro ao salvar partida no banco de dados");
        }
    }

    public function buscarRanking($modalidade, $tamanho_tabuleiro) {
        try {
            // Chama a Stored Procedure para obter o ranking
            $stmt = $this->connection->prepare("CALL GetRanking(?, ?)");
            $stmt->execute([$modalidade, $tamanho_tabuleiro]);
            
            // Retorna todos os resultados
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
            
        } catch (PDOException $e) {
            error_log("Erro ao buscar ranking: " . $e->getMessage());
            // Em um ambiente de produção, você pode querer lançar uma exceção mais genérica
            return []; // Retorna um array vazio em caso de erro
        }
    }
}
?>

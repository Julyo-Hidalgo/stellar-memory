<?php

include "dao/DAO.php";

class HistoricoDAO extends DAO{
    function __construct()
    {
        parent::__construct();
    }

    public function selecionarPartidas($usuario_id, $offset, $limit){
		try {
			$sql = "SELECT tamanho_tabuleiro, modalidade, tempo_partida, total_jogadas, CASE WHEN vitoria = 1 THEN 'Vitória' ELSE 'Derrota' END as resultado, DATE(data_hora_partida) as data, TIME(data_hora_partida) as hora FROM partida WHERE usuario_id = ? ORDER BY data_hora_partida DESC LIMIT ? OFFSET ?";

			$stmt = $this->connection->prepare($sql);
			$stmt->bindParam(1, $usuario_id, PDO::PARAM_INT);
			$stmt->bindParam(2, $limit, PDO::PARAM_INT);
			$stmt->bindParam(3, $offset, PDO::PARAM_INT);

			$stmt->execute();

			return $stmt->fetchAll(PDO::FETCH_ASSOC);
		} catch (PDOException $e) {
			echo "Ocorreu um erro: " . $e->getMessage();
		}
    }

	public function verificarExistenciaMaisPartidas($usuario_id, $offset, $limit){
		try {
			
			$new_offset = $offset + $limit;

			$sql = "SELECT COUNT(*) as total_partidas FROM partida WHERE usuario_id = ?";
			$stmt = $this->connection->prepare($sql);
			$stmt->bindParam(1, $usuario_id, PDO::PARAM_INT);

			$stmt->execute();

			$result = $stmt->fetch(PDO::FETCH_ASSOC);
			$totalPartidas = $result['total_partidas'];

			return ($totalPartidas - $offset - $limit) > 0;
		} catch (PDOException $e) {
			echo "Ocorreu um erro: " . $e->getMessage();
		}
	}
}

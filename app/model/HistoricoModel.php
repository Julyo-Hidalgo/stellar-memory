<?php

class HistoricoModel
{
    public function carregarPartidas($usuario_id, $offset, $limit){
        include 'dao/HistoricoDAO.php';

        $dao = new HistoricoDAO();

        $partidas = $dao->selecionarPartidas($usuario_id, $offset, $limit);


		$existemMaisPartidas = $dao->verificarExistenciaMaisPartidas($usuario_id, $offset, $limit);

		$resposta = [
			"partidas" => $partidas,
			"existemMaisPartidas" => $existemMaisPartidas
		];

        return $resposta;
    }
}

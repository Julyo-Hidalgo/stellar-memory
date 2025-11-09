<?php

class HistoricoController
{
    public static function carregarPartidas(){
		session_start();

        include 'model/HistoricoModel.php';

        $model = new HistoricoModel();

        $offset = $_REQUEST['offset'];
        $limit = $_REQUEST['limit'];

        $usuario_id = $_SESSION['usuario']['id'];

        echo json_encode($model->carregarPartidas($usuario_id, $offset, $limit));
    }
}

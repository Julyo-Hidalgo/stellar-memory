<?php

class HistoricoController
{
    public static function carregarPartidas(){
        include 'model/HistoricoModel.php';

        $model = new HistoricoModel();

        $offset = $_REQUEST['offset'];
        $limit = $_REQUEST['limit'];

        $usuario_id = 1; //$_SESSION['usuario_id'];

        echo json_encode($model->carregarPartidas($usuario_id, $offset, $limit));
    }
}

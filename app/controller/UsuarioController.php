<?php

class UsuarioController {

    public static function salvar() {
       include_once 'model/UsuarioModel.php';
       $model = new UsuarioModel();
       $model->username = $_POST['username'];
       $model->email = $_POST['email'];
       $model->senha = $_POST['senha'];
       $model->cpf = preg_replace('/\D/', '', trim($_POST['cpf'] ?? ''));
       $data_nascimento = $_POST['data_nascimento'] ?? null;
        if ($data_nascimento) {
            $partes = explode('/', $data_nascimento);
            if (count($partes) === 3) {
                $data_nascimento = $partes[2] . '-' . $partes[1] . '-' . $partes[0];
            }
        }
        $model->data_nascimento = $data_nascimento;
        $model->nome_completo = $_POST['nome_completo'];
        $model->telefone = preg_replace('/\D/', '', $_POST['telefone']);

       $resultado = $model->salvar();
       if ($resultado === true) {
            header("Location: /login?sucesso=true");
            exit;
        } else {

            $erro = urlencode($resultado);
            header("Location: /cadastro?erro=" . $erro);
            exit;
        }

    }
}

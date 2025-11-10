<?php

include_once 'model/UsuarioModel.php';

class PerfilController {

    public static function editar() {
		session_start();

        if (!isset($_SESSION['usuario'])){
            header("Location: /login?erro=" . urlencode("Usuário não encontrado ou sessão expirada."));
            exit;
        }

        $usuario_id = $_SESSION['usuario']['id'];

        $model = new UsuarioModel();
        $usuario = $model->getById($usuario_id);


        include 'view/modules/edicao-perfil/edicao-perfil.php';
    }

    public static function atualizar() {
		session_start();

        $usuario_id = $_SESSION['usuario']['id'];

        // 2. Carregar os dados do POST no modelo
        $model = new UsuarioModel();
        $model->id = $usuario_id;
        $model->nome_completo = $_POST['nome_completo'] ?? null;
        $model->telefone = preg_replace('/\D/', '', $_POST['telefone'] ?? '');
        $model->email = $_POST['email'] ?? null;
        
        // A senha só será atualizada se for fornecida
        if (!empty($_POST['senha'])) {
            // Em um ambiente real, a senha seria hasheada antes de salvar
            $model->senha = $_POST['senha'];
        } else {
            // Se a senha não for fornecida, ela não deve ser alterada.
            // O método update no DAO deve ser inteligente para lidar com isso.
            $model->senha = null; 
        }

        // 3. Chamar o método de atualização no modelo
        $resultado = $model->update();

        // 4. Redirecionar com mensagem de sucesso ou erro
        if ($resultado === true) {
            header("Location: /perfil/editar?sucesso=true");
            exit;
        } else {
            $erro = urlencode($resultado);
            header("Location: /perfil/editar?erro=" . $erro);
            exit;
        }
    }
}
?>

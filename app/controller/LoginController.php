<?php
session_start();

class LoginController {
	public static function index() {
		if (isset($_SESSION['usuario'])) {
			header("Location: /jogo");
			exit;
		}

		include 'view/modules/inicio/inicio.html';
	}

    public static function validar() {
        include_once 'model/UsuarioModel.php';

        $username = trim($_POST['username'] ?? '');
        $senha = trim($_POST['senha'] ?? '');

        $model = new UsuarioModel();
        $usuario = $model->autenticar($username, $senha);

        if ($usuario && isset($usuario['id'])) {
            $_SESSION['usuario'] = [
                'id' => $usuario['id'],
                'nome' => $usuario['nome_completo'],
                'username' => $usuario['username']
            ];

            header("Location: /jogo");
            exit;
        } else {
            header("Location: /login?erro=" . urlencode("Usuário ou senha incorretos!"));
            exit;

        }
    }

    public static function logout() {
        session_destroy();
        header("Location: /login");
        exit;
    }
}

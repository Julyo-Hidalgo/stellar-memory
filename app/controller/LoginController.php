<?php
session_start();

class LoginController {

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
            echo "<script>
                    alert('Usuário ou senha incorretos!');
                    window.location.href = '/login';
                  </script>";
            exit;
        }
    }

    public static function logout() {
        session_destroy();
        header("Location: /login");
        exit;
    }
}

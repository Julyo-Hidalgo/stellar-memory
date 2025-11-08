<?php 
include_once 'config.php';

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

switch ($uri) {
    case '/':
        include 'view/modules/inicio/inicio.html';
        break;

    case '/login':
        include 'view/modules/login/login.html';
        break;

    case '/login/validar':
        include 'controller/LoginController.php';
        LoginController::validar();
        break;

    case '/logout':
        include 'controller/LoginController.php';
        LoginController::logout();
        break;

    case '/cadastro':
        include 'view/modules/cadastro/cadastro.html';
        break;

    case '/cadastro/salvar':
        include 'controller/UsuarioController.php';
        UsuarioController::salvar();
        break;

    case '/edicao-perfil':
        include 'view/modules/edicao-perfil/edicao-perfil.html';
        break;

    case '/historico':
        include 'view/modules/historico/historico.html';
        break;

    case '/jogo':
        include 'view/modules/jogo/jogo.html';
        break;

    case '/ranking':
        include 'view/modules/ranking/ranking.html';
        break;

    default:
        echo "Página não encontrada: " . htmlspecialchars($uri);
        break;
}

?>

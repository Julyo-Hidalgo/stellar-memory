<?php 
include_once 'config.php';

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

switch ($uri) {
    case '/':
        include 'controller/LoginController.php';
		LoginController::index();
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

    case '/perfil/editar':
        include 'controller/PerfilController.php';
        PerfilController::editar();
        break;

    case '/perfil/atualizar':
        include 'controller/PerfilController.php';
        PerfilController::atualizar();
        break;

    case '/historico':
        include 'view/modules/historico/historico.html';
        break;

    case '/historico/carregar-partidas':
        include 'controller/HistoricoController.php';
        HistoricoController::carregarPartidas();
        break;
        
    case '/partida/salvar':
        include 'controller/PartidaController.php';
        $controller = new PartidaController();
        $controller->salvarPartida();
        break;

    case '/jogo':
        include 'view/modules/jogo/jogo.html';
        break;

    case '/ranking':
        include 'view/modules/ranking/ranking.html';
        break;
	
	case '/api/ranking':
        include 'controller/RankingController.php';
        break;

    default:
        http_response_code(404);
        include 'view/modules/erro/404.html';
        break;
}

?>

<?php 
include_once 'config.php';

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

switch ($uri) {
	case '/':
		include 'view/modules/inicio/inicio.html';
		break;

	default:
		echo 'erro 404';
		break;
}

?>

<?php 
include_once 'config.php';

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

switch ($uri) {
	case '/stellar-memory/app/':
		include 'view/modules/inicio/inicio.html';
		break;

	delfault:
		echo $uri;
		break;
}

?>

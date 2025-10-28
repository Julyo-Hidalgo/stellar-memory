<?php 
include_once 'config.php';
include 'view/modules/inicio/inicio.html';

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
?>
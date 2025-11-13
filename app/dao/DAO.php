<?php

class DAO {
    private $host;
    private $db_name;
    private $username;
    private $password;
    protected $connection;

	function __construct() {
		try {
			$this->host = $_ENV['db']['host'];
			$this->db_name = $_ENV['db']['database'];
			$this->username = $_ENV['db']['user'];
			$this->password = $_ENV['db']['password'];

			$this->connection = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
			$this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		}
		catch(PDOException $e){
			$url = $_SERVER['REQUEST_URI'];

			$rotas = ["/login", "/cadastro", "/jogo", "/historico", "/perfil"];

			$found = false;
			foreach ($rotas as $rota) {
				if (str_contains($url, $rota)) {
					$achou = true;
					break;
				}
			}

			if($achou){
				$url = "/login" . "?erro=\"" . $e->getMessage() . "\"";

				header("Location: $url");
			}
			else{
				echo "Erro de conexão com o BD: " . $e->getMessage();
			}
		}
    }
}

?>

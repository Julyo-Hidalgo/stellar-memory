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
		}
		catch(PDOException $e){
			echo "Ocorreu um erro: " . $e->getMessage();
		}
    }
}

?>

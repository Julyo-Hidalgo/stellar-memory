<?php

include 'config.php';

class DAO {
    private $host;
    private $db_name;
    private $username;
    private $password;
    protected $connection;

    function __construct() {
	   try {
      $this->host = DB_HOST;
      $this->db_name = DB_NAME;
      $this->username = DB_USER;
      $this->password = DB_PASSWORD;

			$this->connection = new PDO("mysql:host=$this->host;dbname=$this->db_name", $this->username, $this->password);
			}
		catch(PDOException $e){
			echo "Ocorreu um erro: " . $e->getMessage();
		}
    }
}

?>

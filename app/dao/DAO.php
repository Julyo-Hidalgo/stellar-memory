<?php
class DAO {
    private $host = DB_HOST;
    private $db_name = DB_NAME;
    private $username = DB_USER;
    private $password = DB_PASSWORD;
    protected $connection;
    function __construct() {
   try {
$this->connection = new PDO("mysql:host=$this->host;dbname=$this->db_name", $this->$username, $this->password);
}
catch(PDOException $e){
echo "Ocorreu um erro: " . $e->getMessage();
}

    }

}

?>


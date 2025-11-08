<?php
include 'dao/DAO.php';

class UsuarioDAO extends DAO  {
    public function __construct() {
        parent::__construct();
    }

    public function insert(UsuarioModel $model) {
        try {
            $sql = "INSERT INTO usuario 
                        (username, cpf, email, senha, data_nascimento, telefone, nome_completo) 
                    VALUES 
                        (:username, :cpf, :email, :senha, :data_nascimento, :telefone, :nome_completo)";
            
            $stmt = $this->connection->prepare($sql);

            $stmt->bindValue(':username', $model->username);
            $stmt->bindValue(':cpf', $model->cpf);
            $stmt->bindValue(':email', $model->email);
            $stmt->bindValue(':senha', $model->senha);
            $stmt->bindValue(':data_nascimento', $model->data_nascimento);
            $stmt->bindValue(':telefone', $model->telefone);
            $stmt->bindValue(':nome_completo', $model->nome_completo);

            return $stmt->execute(); 

        } catch (PDOException $e) {
            // 🔥 Aqui vai o tratamento certo do erro de duplicidade
            if (str_contains($e->getMessage(), '1062')) {
                if (str_contains($e->getMessage(), 'username')) {
                    return "O username informado já está em uso.";
                }
                if (str_contains($e->getMessage(), 'email')) {
                    return "O e-mail informado já está em uso.";
                }
                if (str_contains($e->getMessage(), 'cpf')) {
                    return "O CPF informado já está em uso.";
                }
                return "Dados duplicados. Verifique suas informações.";
            }

            return "Erro ao salvar usuário: " . $e->getMessage();
        }
    }

    public function buscarPorUsernameSenha($username, $senha) {
        try {
            $sql = "SELECT id, nome_completo, username 
                    FROM usuario 
                    WHERE username = :username AND senha = :senha";

            $stmt = $this->connection->prepare($sql);
            $stmt->bindValue(':username', $username);
            $stmt->bindValue(':senha', $senha);
            $stmt->execute();

            $resultado = $stmt->fetch(PDO::FETCH_ASSOC);
            return ($resultado && isset($resultado['id'])) ? $resultado : false;
        } catch (PDOException $e) {
            return "Erro ao buscar usuário: " . $e->getMessage();
        }
    }
}





//código inicial feito em reunião com o julyo 06/11
    /*public function insert (UsuarioModel $model) {
        try
        {   
            $sql = "INSERT INTO usuario (username, cpf, email, senha, data_nascimento, telefone, nome_completo) VALUES ('" . 
                                                        $model->username . "', '" .
                                                        $model->cpf . "', '" . 
                                                        $model->email . "', '" . 
                                                        $model->senha . "', '" . 
                                                        $model->data_nascimento . "', '" . 
                                                        $model->telefone . "', '" . 
                                                        $model->nome_completo . "' )";

            $this->connection->exec($sql);
        }
        catch(PDOException $e)
        {
            echo "Ocorreu um erro: " . $e->getMessage();
        }

    }
    
}*/
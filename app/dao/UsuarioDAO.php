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

    public function selectById(int $id) {
        try {
            $sql = "SELECT * FROM usuario WHERE id = :id";
            $stmt = $this->connection->prepare($sql);
            $stmt->bindValue(':id', $id);
            $stmt->execute();

            return $stmt->fetchObject('UsuarioModel');
        } catch (PDOException $e) {
            return "Erro ao buscar usuário por ID: " . $e->getMessage();
        }
    }

    public function update(UsuarioModel $model) {
        try {
            // Monta a query de forma dinâmica para atualizar apenas os campos que não são nulos
            $sql = "UPDATE usuario SET 
                        nome_completo = :nome_completo,
                        telefone = :telefone,
                        email = :email";
            
            // Adiciona a senha apenas se ela foi fornecida no modelo
            if ($model->senha !== null) {
                $sql .= ", senha = :senha";
            }

            $sql .= " WHERE id = :id";

            $stmt = $this->connection->prepare($sql);

            $stmt->bindValue(':nome_completo', $model->nome_completo);
            $stmt->bindValue(':telefone', $model->telefone);
            $stmt->bindValue(':email', $model->email);
            $stmt->bindValue(':id', $model->id);

            if ($model->senha !== null) {
                $stmt->bindValue(':senha', $model->senha);
            }

            return $stmt->execute();

        } catch (PDOException $e) {
            // Tratamento de erro de duplicidade para email
            if (str_contains($e->getMessage(), '1062')) {
                if (str_contains($e->getMessage(), 'email')) {
                    return "O e-mail informado já está em uso por outro usuário.";
                }
                return "Dados duplicados. Verifique suas informações.";
            }

            return "Erro ao atualizar usuário: " . $e->getMessage();
        }
    }

}

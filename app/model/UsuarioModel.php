<?php

class UsuarioModel {
    public $id;
    public $username;
    public $email;
    public $senha;
    public $cpf;
    public $data_nascimento;
    public $nome_completo;
    public $telefone;

    public function salvar() {
        include 'dao/UsuarioDAO.php';
        $dao = new UsuarioDAO();
        return $dao->insert($this);
    }

    public function getById(int $id) {
        include_once 'dao/UsuarioDAO.php';
        $dao = new UsuarioDAO();
        return $dao->selectById($id);
    }

    public function update() {
        include_once 'dao/UsuarioDAO.php';
        $dao = new UsuarioDAO();
        return $dao->update($this);
    }

    public function autenticar($username, $senha) {
        include_once 'dao/UsuarioDAO.php';
        $dao = new UsuarioDAO();

        return $dao->buscarPorUsernameSenha($username, $senha);
    }
}

?>

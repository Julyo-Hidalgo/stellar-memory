-- DATABASE: STELLAR MEMORY

CREATE DATABASE IF NOT EXISTS stellar_memory;
USE stellar_memory;

-- TABELA: usuario
CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    cpf DECIMAL(11, 0) UNIQUE NOT NULL,
    data_nascimento DATE NOT NULL,
    nome_completo VARCHAR(100) NOT NULL,
    telefone DECIMAL(11, 0)
);

-- TABELA: partida
CREATE TABLE partida (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    tempo_partida INT NOT NULL, -- em segundos
    data_hora_partida TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modalidade CHAR(1) NOT NULL, -- 'C - classico' ou 'T - contra_tempo'
    tamanho_tabuleiro DECIMAL(1, 0) NOT NULL, -- 2 - 2x2 ou 4 - 4x4 ou 6 - 6x6 ou 8 - 8x8
    total_jogadas INT NOT NULL,
    vitoria BOOLEAN DEFAULT FALSE,
    pontuacao INT,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE
);

-- A fazer:
-- View para calcular os 10 melhores jogadores disparado ao inserir uma partida,   -- Adriano
-- Gatilho para pontuacao tempo_partida * total_jogadas
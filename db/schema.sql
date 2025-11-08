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
    telefone VARCHAR(20)
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

-- A fazer para o Adriano:
-- Transformar a seguinte consulta em uma procedure que recebe como parâmetro modalidade e tamanho_tabuleiro da partida
    /*
    SELECT 
        u.username,
        SUM(p.points) AS pontuacao_total
    FROM usuários u
    LEFT JOIN Partidas p
    ON u.id = p.usuario_id
    WHERE p.tipo_partida = '2x2'
    GROUP BY username
    ORDER BY pontuacao_total DESC
    LIMIT 10*/

-- Criar um gatilho para calcular o valor da pontuacao (tempo_partida * total_jogadas) todas as vezes que inserir uma partida
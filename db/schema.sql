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
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE
);

-- STORED PROCEDURE: Obter o Ranking das 10 melhores partidas
-- Filtra por modalidade e tamanho do tabuleiro, ordena por tempo (ASC) e jogadas (ASC)
DELIMITER //
CREATE PROCEDURE GetRanking(
    IN p_modalidade CHAR(1),
    IN p_tamanho_tabuleiro DECIMAL(1, 0)
)
BEGIN
    SELECT
        u.username,
        p.tamanho_tabuleiro,
        p.total_jogadas,
        CASE p.modalidade
            WHEN 'C' THEN 'Clássico'
            WHEN 'T' THEN 'Contra o Tempo'
            ELSE 'Desconhecido'
        END AS modo_jogo,
        p.tempo_partida,
        DATE_FORMAT(p.data_hora_partida, '%d/%m/%Y') AS data_partida
    FROM
        partida p
    JOIN
        usuario u ON p.usuario_id = u.id
    WHERE
        p.modalidade = p_modalidade AND
        p.tamanho_tabuleiro = p_tamanho_tabuleiro AND
        p.vitoria = TRUE -- Apenas partidas vitoriosas
    ORDER BY
        p.tempo_partida ASC,
        p.total_jogadas ASC
    LIMIT 10;
END //
DELIMITER ;

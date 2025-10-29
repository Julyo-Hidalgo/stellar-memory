-- DATABASE: STELLAR MEMORY

CREATE DATABASE IF NOT EXISTS stellar_memory;
USE stellar_memory;

-- TABELA: usuario
CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL, -- hash da senha
    cpf VARCHAR(11) UNIQUE NOT NULL,
    data_nascimento DATE NOT NULL,
    nome_completo VARCHAR(100) NOT NULL,
    telefone VARCHAR(11),
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TABELA: partida
CREATE TABLE partida (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    tempo_jogo INT NOT NULL, -- em segundos (baseado no tempo-partida)
    data_partida TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modalidade VARCHAR(20) NOT NULL, -- 'classico' ou 'contra_tempo'
    tamanho_tabuleiro VARCHAR(10) NOT NULL, -- '4x4', '6x6', etc.
    total_jogadas INT NOT NULL, -- contadorJogadas
--    pares_encontrados INT NOT NULL, -- guardar as desistidas?
    vitoria BOOLEAN DEFAULT FALSE,
    ranking INT, -- 0:sem ranking, 1: 2x2 c, 2: 4x4 c, 3: 6x6 c, 4: 8x8 c, 5: 2x2 ct, 6: 4x4 ct, 7: 6x6 ct, 8: 8x8 ct.
    
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE
);

-- TABELA: ranking
CREATE TABLE ranking (  
    --falta fazer
);

DELIMITER //

-- Procedure para atualizar o ranking do usuário
CREATE PROCEDURE AtualizarRanking(IN p_usuario_id INT)
BEGIN
    --falta fazer
       
END //

-- FUNCTIONS:
-- Function para verificar se username já existe
CREATE FUNCTION UsuarioExiste(p_username VARCHAR(100)) 
RETURNS BOOLEAN
READS SQL DATA
DETERMINISTIC
BEGIN
    DECLARE v_count INT;
    SELECT COUNT(*) INTO v_count FROM usuario WHERE username = p_username;
    RETURN v_count > 0;
END //

-- Function para verificar se email já existe
CREATE FUNCTION EmailExiste(p_email VARCHAR(255)) 
RETURNS BOOLEAN
READS SQL DATA
DETERMINISTIC
BEGIN
    DECLARE v_count INT;
    SELECT COUNT(*) INTO v_count FROM usuario WHERE email = p_email;
    RETURN v_count > 0;
END //

DELIMITER ;

-- INSERTS:

-- Inserir usuário admin para testes
INSERT INTO usuario (username, email, senha, cpf, data_nascimento, nome_completo, telefone) VALUES
('admin', 'admin@stellarmemory.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '12345678901', '1990-01-01', 'Administrador do Sistema', '11999999999');


-- INSERTS: Gatilhos a fazer

-- Gatilho para quando inserir o usuário verificar se o usuário(username)/email já existe, usando a função já implementada acima -- Ana

-- Gatilho para calcular a pontuação e posicionamento dos 10 melhores-- Adriano 



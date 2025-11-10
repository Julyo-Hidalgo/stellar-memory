-- DADOS FICTÍCIOS PARA TESTE

-- 1. Inserir Usuários
INSERT INTO usuario (username, email, senha, cpf, data_nascimento, nome_completo, telefone) VALUES
('cosmos_player', 'cosmos@email.com', 'senha_hash', 11111111111, '1990-01-01', 'Cosmo Player', 11988887777),
('estrela_cadente', 'estrela@email.com', 'senha_hash', 22222222222, '1995-05-15', 'Estrela Cadente', 21977776666),
('buraco_negro', 'buraco@email.com', 'senha_hash', 33333333333, '2000-10-20', 'Buraco Negro', 31966665555),
('via_lactea', 'via@email.com', 'senha_hash', 44444444444, '1985-03-25', 'Via Láctea', 41955554444),
('galaxia_x', 'galaxia@email.com', 'senha_hash', 55555555555, '2002-12-12', 'Galáxia X', 51944443333);

-- 2. Inserir Partidas (Dados para Ranking)
-- Critério de Ranking: tempo_partida ASC, total_jogadas ASC

-- Partidas 4x4 Clássico (modalidade 'C', tamanho_tabuleiro 4)
INSERT INTO partida (usuario_id, tempo_partida, modalidade, tamanho_tabuleiro, total_jogadas, vitoria) VALUES
(1, 120, 'C', 4, 18, TRUE), -- 1º: Menor tempo
(2, 120, 'C', 4, 20, TRUE), -- 2º: Mesmo tempo, mais jogadas
(3, 150, 'C', 4, 22, TRUE), -- 3º
(4, 180, 'C', 4, 25, TRUE), -- 4º
(5, 200, 'C', 4, 30, TRUE), -- 5º
(1, 210, 'C', 4, 35, TRUE), -- 6º
(2, 250, 'C', 4, 40, TRUE), -- 7º
(3, 300, 'C', 4, 50, TRUE), -- 8º
(4, 350, 'C', 4, 60, TRUE), -- 9º
(5, 400, 'C', 4, 70, TRUE); -- 10º

-- Partidas 6x6 Contra o Tempo (modalidade 'T', tamanho_tabuleiro 6)
INSERT INTO partida (usuario_id, tempo_partida, modalidade, tamanho_tabuleiro, total_jogadas, vitoria) VALUES
(1, 300, 'T', 6, 40, TRUE), -- 1º
(2, 300, 'T', 6, 45, TRUE), -- 2º
(3, 350, 'T', 6, 50, TRUE), -- 3º
(4, 400, 'T', 6, 60, TRUE), -- 4º
(5, 450, 'T', 6, 70, TRUE), -- 5º
(1, 500, 'T', 6, 80, TRUE), -- 6º
(2, 550, 'T', 6, 90, TRUE), -- 7º
(3, 600, 'T', 6, 100, TRUE), -- 8º
(4, 650, 'T', 6, 110, TRUE), -- 9º
(5, 700, 'T', 6, 120, TRUE); -- 10º

-- Partidas 2x2 Clássico (modalidade 'C', tamanho_tabuleiro 2)
INSERT INTO partida (usuario_id, tempo_partida, modalidade, tamanho_tabuleiro, total_jogadas, vitoria) VALUES
(1, 30, 'C', 2, 6, TRUE),
(2, 40, 'C', 2, 8, TRUE);

-- Partidas 8x8 Contra o Tempo (modalidade 'T', tamanho_tabuleiro 8)
INSERT INTO partida (usuario_id, tempo_partida, modalidade, tamanho_tabuleiro, total_jogadas, vitoria) VALUES
(3, 600, 'T', 8, 100, TRUE),
(4, 700, 'T', 8, 120, TRUE);

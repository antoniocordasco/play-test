CREATE TABLE IF NOT EXISTS games (   
    id SERIAL PRIMARY KEY NOT NULL,  
    game_description VARCHAR(50)  
);
CREATE TABLE IF NOT EXISTS players (
    id SERIAL PRIMARY KEY NOT NULL,
    game_id INTEGER,
    nickname VARCHAR(50)
);
CREATE TABLE IF NOT EXISTS frames (
    id SERIAL PRIMARY KEY NOT NULL,
    player_id INTEGER NOT NULL,
    first_shot INTEGER,
    second_shot INTEGER
);
INSERT INTO games (game_description) VALUES ('fake game');
INSERT INTO players (game_id, nickname) VALUES (1, 'Antonio');
INSERT INTO players (game_id, nickname) VALUES (1, 'Giuseppe');
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (1, 1, 0);
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (2, 8, 0);
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (1, 2, 2);
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (2, 2, 4);
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (1, 2, 4);
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (2, 3, 6);
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (1, 7, 3);
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (2, 0, 0);
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (1, 5, 5);
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (2, 0, 0);
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (1, 6, 3);
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (2, 1, 0);
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (1, 0, 3);
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (2, 9, 0);
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (1, 2, 3);
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (2, 2, 0);
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (1, 5, 3);
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (2, 1, 0);
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (1, 7, 3);
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (2, 8, 0);
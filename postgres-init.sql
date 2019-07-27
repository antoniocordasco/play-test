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

INSERT INTO games (game_description) VALUES ('first game');
INSERT INTO players (game_id, nickname) VALUES (1, 'Antonio');
INSERT INTO players (game_id, nickname) VALUES (1, 'Giuseppe');
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (1, 10, 0);
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (2, 8, 0);
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (1, 10, 0);
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (2, 2, 4);
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (1, 10, 0);
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (2, 3, 6);
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (1, 10, 0);
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (2, 0, 0);
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (1, 10, 0);
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (2, 0, 0);
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (1, 10, 0);
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (2, 1, 0);
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (1, 10, 0);
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (2, 9, 0);
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (1, 10, 0);
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (2, 2, 0);
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (1, 10, 0);
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (2, 8, 0);
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (1, 10, 0);
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (2, 1, 0);
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (1, 10, 0);
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (1, 10, 0);


INSERT INTO games (game_description) VALUES ('second game');
INSERT INTO players (game_id, nickname) VALUES (1, 'Antonio');
INSERT INTO players (game_id, nickname) VALUES (1, 'Giuseppe');
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (3, 10, 0);
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (4, 8, 0);
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (3, 10, 0);
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (4, 2, 4);
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (3, 10, 0);
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (4, 3, 6);
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (3, 10, 0);
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (4, 0, 0);
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (3, 10, 0);
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (4, 0, 0);
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (3, 10, 0);
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (4, 1, 0);
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (3, 10, 0);
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (4, 9, 0);
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (3, 10, 0);
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (4, 2, 0);
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (3, 10, 0);
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (4, 8, 0);
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (3, 10, 0);
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (4, 1, 0);
INSERT INTO frames (player_id, first_shot, second_shot) VALUES (3, 10, 0);
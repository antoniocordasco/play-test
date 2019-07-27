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
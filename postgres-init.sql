CREATE TABLE IF NOT EXISTS games (
    id SERIAL PRIMARY KEY NOT NULL,
    game_description VARCHAR(50)
);

INSERT INTO games (game_description) VALUES ('fake game');
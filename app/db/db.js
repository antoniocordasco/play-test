const { Client } = require('pg');

const getClient = () => {
  return new Client({
    connectionString: process.env.DATABASE_URL
  });
}

const initialize = async () => {
  const client = getClient();

  var statements = [
    'CREATE TABLE IF NOT EXISTS games (id SERIAL PRIMARY KEY NOT NULL, game_description VARCHAR(50))',
    'CREATE TABLE IF NOT EXISTS players (id SERIAL PRIMARY KEY NOT NULL, game_id INTEGER, nickname VARCHAR(50))',
    'CREATE TABLE IF NOT EXISTS frames (id SERIAL PRIMARY KEY NOT NULL, player_id INTEGER NOT NULL, first_shot INTEGER, second_shot INTEGER)',
    'DELETE FROM games',
    'DELETE FROM players',
    'DELETE FROM frames',
    'INSERT INTO games (id, game_description) VALUES (1, \'first game\')',
    'INSERT INTO players (id, game_id, nickname) VALUES (1, 1, \'Antonio\'), (2, 1, \'Giuseppe\')',
    'INSERT INTO frames (player_id, first_shot, second_shot) VALUES (1, 10, 0), (1, 10, 0), (1, 10, 0), (1, 10, 0), (1, 10, 0), (1, 10, 0), (1, 10, 0), (1, 10, 0), (1, 10, 0), (1, 10, 0), (1, 10, 0), (1, 10, 0)',
    'INSERT INTO frames (player_id, first_shot, second_shot) VALUES (2, 1, 1), (2, 7, 3), (2, 1, 2), (2, 10, 0), (2, 8, 1), (2, 0, 0), (2, 0, 0), (2, 0, 0), (2, 0, 0), (2, 0, 0)',
  ];


  try {
    await client.connect();

    for (var i in statements) {

      await client.query(statements[i]);
    }   
    return true;
  } catch(error) {
    console.error(error);
  }
  return false;
}

const healthcheck = async () => {
  const client = getClient();

  try {
    await client.connect();
  
    initialize();
    res = await client.query('SELECT table_name  FROM information_schema.tables WHERE table_schema=\'public\' AND table_type=\'BASE TABLE\'');

    return res.rowCount === 3;
  } catch(error) {
    console.error(error);
  }
  return false;
}

const createGame = async (description, player1, player2) => {
  const client = getClient();

  try {
    await client.connect();

    // inserting game
    var res = await client.query('INSERT INTO games (game_description) VALUES($1) RETURNING *', [description]);
    const gameId = res.rows[0].id;

    // inserting players
    const playersInsertQuery = 'INSERT INTO players (game_id, nickname) VALUES($1, $2) RETURNING *';
    res = await client.query(playersInsertQuery, [gameId, player1]);
    const player1Id = res.rows[0].id;

    if (player2) {
      res = await client.query(playersInsertQuery, [gameId, player2]);
      const player2Id = res.rows[0].id;
      return {
        gameId,
        player1Id,
        player2Id
      };
    }

    return {
      gameId,
      player1Id
    };
  } catch(error) {
    console.error(error);
  }
  return false;
}

const addFrame = async (playerId, firstShot, secondShot) => {
  const client = getClient();

  try {
    if (firstShot === null || typeof firstShot === 'undefined') {
        throw new Error("The first shot is not defined");
    }
    if (parseInt(firstShot) + parseInt(secondShot) > 10) {
        throw new Error("Total between 2 shots greater than 10");
    }
    if (parseInt(firstShot) < 10 && (secondShot === null || typeof secondShot === 'undefined')) {
        throw new Error("Not a strike, but missing second shot");
    }
    if (parseInt(firstShot) < 0 || parseInt(secondShot) < 0) {
        throw new Error("Shots cannot be lower than 0");
    }
    await client.connect();

    // inserting players
    const insertQuery = 'INSERT INTO frames (player_id, first_shot, second_shot) VALUES($1, $2, $3) RETURNING *';
    const res = await client.query(insertQuery, [playerId, firstShot, secondShot]);
    
    return true
  } catch(error) {
    console.error(error);
  }
  return false;
}

const getPlayerFrames = async (playerId) => {
  const client = getClient();

  try {
    if (playerId === null || typeof playerId === 'undefined' || parseInt(playerId) < 1) {
        throw new Error("Invalid player id");
    }

    await client.connect();

    const selectQuery = 'SELECT first_shot, second_shot FROM frames WHERE player_id = $1 ORDER BY id ASC';
    const res = await client.query(selectQuery, [playerId]);
    
    return res.rows;
  } catch(error) {
    console.error(error);
  }
  return false;
}

module.exports = {
  createGame,
  addFrame,
  getPlayerFrames,
  healthcheck
};

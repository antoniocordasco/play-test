const { Client } = require('pg');

const getClient = () => {
  return new Client({
    connectionString: process.env.DATABASE_URL
  });
}

const initialize = async () => {
  const client = getClient();

  var statements = [
    'DROP TABLE IF EXISTS games',
    'DROP TABLE IF EXISTS players',
    'DROP TABLE IF EXISTS frames',
    'CREATE TABLE games (id SERIAL PRIMARY KEY NOT NULL, game_description VARCHAR(50))',
    'CREATE TABLE players (id SERIAL PRIMARY KEY NOT NULL, game_id INTEGER, nickname VARCHAR(50))',
    'CREATE TABLE frames (id SERIAL PRIMARY KEY NOT NULL, player_id INTEGER NOT NULL, first_shot INTEGER, second_shot INTEGER)'
  ];

  try {
    await client.connect();
    var res;

    for (var i in statements) {
      res = await client.query(statements[i]);
    }   
    console.log("Initialization succeeded.");

    client.end();
    return true;
  } catch(error) {

    client.end();
    console.error("Database not ready yet...");
    console.error(error);
  }
  return false;
}

const healthcheck = async () => {
  const client = getClient();

  await client.connect();
  res = await client.query('SELECT table_name  FROM information_schema.tables WHERE table_schema=\'public\' AND table_type=\'BASE TABLE\'');

  client.end();
  return res.rowCount === 3;
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

      client.end();
      return {
        gameId,
        player1Id,
        player2Id
      };
    }

    client.end();
    return {
      gameId,
      player1Id
    };
  } catch(error) {

    client.end();
    console.error(error);
  }
  return false;
}

const addFrame = async (playerId, firstShot, secondShot) => {
  const client = getClient();

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

  const existingFrames = await getPlayerFrames(playerId);
  if (existingFrames.length > 11) {
    throw new Error("A game cannot have more than 12 frames");
  } else if (existingFrames.length === 11 && existingFrames[9].first_shot != 10) {
    throw new Error("Trying to add a 12th frame, when the 10th frame was not a strike");
  } else if (existingFrames.length === 10 && existingFrames[9].first_shot + existingFrames[9].second_shot  != 10) {
    throw new Error("Trying to add an 11th frame, when the 10th frame was neither a strike or a spare");
  }

  await client.connect();

  // inserting players
  const insertQuery = 'INSERT INTO frames (player_id, first_shot, second_shot) VALUES($1, $2, $3) RETURNING *';
  const res = await client.query(insertQuery, [playerId, firstShot, secondShot]);
  
  client.end();
  return true;
}

const getGame = async (gameId) => {
  const client = getClient();

  if (gameId === null || typeof gameId === 'undefined' || parseInt(gameId) < 1) {
      throw new Error("Invalid game id");
  }
  await client.connect();
  const res = await client.query('SELECT * FROM players WHERE game_id = $1 ORDER BY id ASC', [gameId]);

  client.end();
  if (res.rowCount === 0) {
    throw new Error("No players found for game: " + gameId);
  } else if (res.rowCount === 1) {
    return {
      gameId,
      player1: res.rows[0]
    };
  } else if (res.rowCount === 2) {
    return {
      gameId,
      player1: res.rows[0],
      player2: res.rows[1]
    };
  } else {
    throw new Error("More than 2 players found for game: " + gameId);
  }
  
  return game;
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

    client.end();
    return res.rows;
  } catch(error) {
    console.error(error);
  }
  return false;
}


module.exports = {
  initialize,
  createGame,
  getGame,
  addFrame,
  getPlayerFrames,
  healthcheck
};

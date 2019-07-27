const { Client } = require('pg');

const getClient = () => {
  return new Client({
    connectionString: process.env.DATABASE_URL
  });
}

const healthcheck = async () => {
  const client = getClient();

  try {
    await client.connect();
  
    var res = await client.query('SELECT table_name  FROM information_schema.tables WHERE table_schema=\'public\' AND table_type=\'BASE TABLE\'');
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
    res = await client.query(playersInsertQuery, [gameId, player2]);
    const player2Id = res.rows[0].id;

    return {
      gameId,
      player1Id,
      player2Id
    };
  } catch(error) {
    console.error(error);
  }
  return false;
}

const addFrame = async (playerId, firstShot, secondShot) => {
  const client = getClient();

  try {
    await client.connect();


    return false
  } catch(error) {
    console.error(error);
  }
  return false;
}

module.exports = {
  createGame,
  healthcheck
};

const { Client } = require('pg');

const dbHealthcheckQuery = async () => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });
  try {
    await client.connect();
  
    var res = await client.query('SELECT table_name  FROM information_schema.tables WHERE table_schema=\'public\' AND table_type=\'BASE TABLE\'');
    return res.rowCount === 3;
  } catch(error) {
    console.error(error);
  }
  return false;
}

module.exports = {
  dbHealthcheckQuery
};

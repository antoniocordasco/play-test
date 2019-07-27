const { Client } = require('pg');

const todos =  [
    {
      id: 1,
      title: "lunch",
      description: "Go for lunch by 2pm"
    }
];

const dbTestQuery = async () => {
  console.log(process.env.DATABASE_URL);
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });
  try {
    await client.connect();
  
    var res = await client.query('SELECT table_name  FROM information_schema.tables WHERE table_schema=\'public\' AND table_type=\'BASE TABLE\'');
    console.log("teststststst");
    console.log(res);

    res = await client.query('SELECT * FROM games;');
    console.log("testst2");
    console.log(res);

    await client.end();
  }
  catch(error) {
    console.error(error);
    // expected output: ReferenceError: nonExistentFunction is not defined
    // Note - error messages will vary depending on browser
  }
  return "ok!";
  
}


module.exports = {
  todos,
  dbTestQuery
};

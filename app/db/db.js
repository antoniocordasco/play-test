const { Client } = require('pg');

const todos =  [
    {
      id: 1,
      title: "lunch",
      description: "Go for lunc by 2pm"
    }
];

const dbTestQuery = async () => {
  console.log(process.env.DATABASE_URL);
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });
  try {
    await client.connect();
  const res = await client.query('SELECT $1::text as message', ['Hello world!']);
  console.log(res.rows[0].message); // Hello world!
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

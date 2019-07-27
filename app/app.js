const express = require('express');
const dbHealthcheckQuery = require('./db/db').dbHealthcheckQuery;
// Set up the express app
const app = express();
// get all todos
app.get('/api/v1/db-healthcheck', async (req, res) => {
  let healthcheck = await dbHealthcheckQuery();

  if (healthcheck) { 
    res.status(200).send({
      success: 'true',
      message: 'The database is set up correctly'
    });
  } else { 
    res.status(500).send({
      success: 'false',
      message: 'The database is either down or not set up correctly'
    });
  }
});
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});
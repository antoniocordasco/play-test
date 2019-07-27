const express = require('express');
const bodyParser = require('body-parser')

const createGame = require('./db/db').createGame;
const dbHealthcheck = require('./db/db').healthcheck;
// Set up the express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});

app.get('/api/v1/db-healthcheck', async (req, res) => {
  let healthcheck = await dbHealthcheck();

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

app.post('/api/v1/start-game', async (req, res) => {
  const description = req.body.description;
  const player1 = req.body.player1;
  const player2 = req.body.player2;

  const game = await createGame(description, player1, player2);

  res.status(200).send({
    success: 'true',
    game
  });
});


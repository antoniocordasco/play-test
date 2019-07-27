const express = require('express');
const bodyParser = require('body-parser')

const createGame = require('./db/db').createGame;
const addFrame = require('./db/db').addFrame;
const getPlayerFrames = require('./db/db').getPlayerFrames;
const dbHealthcheck = require('./db/db').healthcheck;
// Set up the express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}
app.listen(port, () => {
  console.log(`server running on port ${port}`)
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

app.post('/api/v1/add-frame', async (req, res) => {
  const playerId = req.body.playerId;
  const firstShot = req.body.firstShot;
  const secondShot = req.body.secondShot;

  const frame = await addFrame(playerId, firstShot, secondShot);

  res.status(200).send({
    success: 'true'
  });
});

const calculateScoreFromFrames = (frames) => {
  var currentFrame = null;
  for (var i = 0; i < 10; i++) {
    currentFrame = frames[i];
    frames[i].score = parseInt(frames[i].first_shot) + parseInt(frames[i].second_shot);

    // strike
    if (parseInt(frames[i].first_shot) === 10) {
      if (parseInt(frames[i+1].first_shot) === 10) {

        // we need to be defensive here because this function can be used to calculate partial scores as well
        if (typeof frames[i+1] != 'undefined') {
          frames[i].score += parseInt(frames[i+1].first_shot);
          if (typeof frames[i+2] != 'undefined') {
            frames[i].score += parseInt(frames[i+2].first_shot);
          }
        }
      } else {
        if (typeof frames[i+1] != 'undefined') {
          frames[i].score += parseInt(frames[i+1].first_shot) + parseInt(frames[i+1].second_shot);
        }
      }

    // spare  
    } else if (parseInt(frames[i].first_shot) + parseInt(frames[i].second_shot) === 10) {
      frames[i].score += parseInt(frames[i+1].first_shot);
    }
  }

  var total = 0;
  for (var i = 0; i < 10; i++) {
    total += frames[i].score;
  }

  return total;
}

app.get('/api/v1/player-score/:playerId', async (req, res) => {
  const playerId = req.params.playerId;
  const frames = await getPlayerFrames(playerId);
  const score = calculateScoreFromFrames(frames);

  res.status(200).send({
    success: 'true',
    frames,
    score
  });
});

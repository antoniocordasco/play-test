const express = require('express');
const bodyParser = require('body-parser')

const createGame = require('./db/db').createGame;
const addFrame = require('./db/db').addFrame;
const getPlayerFrames = require('./db/db').getPlayerFrames;
const getGame = require('./db/db').getGame;
const dbHealthcheck = require('./db/db').healthcheck;


// Set up the express app
const router = express();

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
router.use(bodyParser.json());

let port = process.env.PORT || 5000;
const server = router.listen(port, () => {
  console.log(`server running on port ${port}`)
});

// simple endpoint to check if the app is running
router.get('/api/v1/hello', async (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'Hello world'
  });
});

// simple endpoint to check if the database is set up correctly
router.get('/api/v1/db-healthcheck', async (req, res) => {
  try {  
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
  } catch(error) {
    res.status(500).send({
      success: 'false',
      message: error.message
    });
  }
});

// POST endpoint to create a new game
// Accepts description, player1, player2 (optional)
router.post('/api/v1/start-game', async (req, res) => {
  try {    
    if (typeof req.body.player1 ==='undefined') {
      throw new Error("You must provide the name for the player 1");
    }

    if (typeof req.body.description ==='undefined') {
      throw new Error("You must provide a description for the game");
    }

    const description = req.body.description;
    const player1 = req.body.player1;
    const player2 = req.body.player2;
    const game = await createGame(description, player1, player2);
    res.status(200).send({
      success: 'true',
      game
    });
  } catch(error) {
    res.status(500).send({
      success: 'false',
      message: error.message
    });
  }
});

// POST endpoint to add a frame to an existing game
// Accepts playerId, firstShot, secondShot)
router.post('/api/v1/add-frame', async (req, res) => {
  try {    
    const playerId = req.body.playerId;
    const firstShot = req.body.firstShot;
    const secondShot = req.body.secondShot;
  
    const frame = await addFrame(playerId, firstShot, secondShot);
  
    res.status(200).send({
      success: 'true'
    });
  } catch(error) {
    res.status(500).send({
      success: 'false',
      message: error.message
    });
  }
});

// Private function to calculate the score, given an array of frames
// It works only on incomplete sets of frames
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

// GET endpoint get a player's score
// Accepts playerId
router.get('/api/v1/player-score/:playerId', async (req, res) => {
  const playerId = req.params.playerId;
  const frames = await getPlayerFrames(playerId);
  const score = calculateScoreFromFrames(frames);

  res.status(200).send({
    success: 'true',
    frames,
    score
  });
});

// GET endpoint get a game, with all its frames and scores
// Accepts gameId
router.get('/api/v1/game/:gameId', async (req, res) => {
  const gameId = req.params.gameId;

  const game = await getGame(gameId);

  game.player1.frames = await getPlayerFrames(game.player1.id);
  game.player1.score = calculateScoreFromFrames(game.player1.frames);

  if (typeof game.player2 != 'undefined') {
    game.player2.frames = await getPlayerFrames(game.player2.id);
    game.player2.score = calculateScoreFromFrames(game.player2.frames);
  }

  res.status(200).send({
    success: 'true',
    game
  });
});

module.exports = { 
  app: router,
  server
};
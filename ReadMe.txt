Technical test for Play Consult


INSTRUCTIONS:
- Running the application locally
To run the application locally, navigate to its root and run:
docker-compose build && docker-compose up

- Calling the application locally
Let's suppose we want to create a new game, with 1 player, who knocked all 10 pins on all the 12 shots (perfect game). At the end we want to also retrieve the data for this game to make sure it has been saved correctly.
To do so we need to open postman and do a POST request to http://localhost:5000/api/v1/start-game
In the "body" tab, select x-www-form-urlencoded and add the variables: description, player1 (these are arbitrary and do not matter too much). Note down the gameId and player1Id variables returned by the endpoint.
Now we need to add 12 frames, by doing 12 POST requests to http://localhost:5000/api/v1/add-frame
Same as before, but we need to provide these variables: 
playerId: what was returned as player1Id in the previous POST request
firstShot: 10
firstShot: 0
Now to check that the data was saved correctly we need to do a GET request to http://localhost:5000/api/v1/game/:gameId where gameId is the gameId we got in the first POST request to /start-game
If all goes well, the system should answer with the game's data, and the score for the player should be 300

- Running the unit tests locally
To run the unit tests locally, navigate to the app's root directory and run:
npm install && npm run test

- Running the end to end tests locally:
To run the end to end tests locally, navigate to the app's root directory and run:
docker-compose build && docker-compose up
Look for the output of the container called e2e_1 to see if the tests are passing or not.

- Running the application on heroku:
I have already deployed the app to Heroku, so it should already be running on there

- Calling the application on heroku
Same as "Calling the application locally", but the url should start with https://fast-sands-84591.herokuapp.com/api/v1 instead of http://localhost:5000/api/v1


ASSUMPTIONS AND CONSIDERATIONS:
The system allows for the creation of a new game, with one or 2 players. Each player is linked to a specific game only.
Even if the same person plays 2 games, from the point of view of the system, those are 2 separate players.
After a game is created, the API allows the creation of "frames". Every frame creation requires a separate POST request to the API. It is not possible to create more than one frame in a single POST request.
Because a player is linked only to one game, frames are linked to players in the database.


ENDPOINTS:
GET  /api/v1/hello
To check if the API is running

GET  /api/v1/db-healthcheck
To check if the DB is up and running

POST /api/v1/start-game
To create a new game. It will return the game ID and the players IDs. The client should then use the players IDs to call the /add-frame endpoint.

POST /api/v1/add-frame
To create a new frame. The player ID needs to be supplied when calling this endpoint. The system does not keep track in any way which one is the current game. That is the responsibility of the client calling the API.

GET  /api/v1/player-score/:playerId
To get a player's score. This method will also return the list of frames in the correct order. It works also for incomplete sets of frames, for example if the game is in progress.

GET  /api/v1/game/:gameId
To get the full data of a specific game. It will return the scores and also all the frames for each player.

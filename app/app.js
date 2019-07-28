const initialize = require('./db/db').initialize;
var app;

const initializeDBAndRouting = () => {
  console.log('Initializing app...');
  initialize();
  app = require('./router').app;
}

// need to wait until the DB container is ready to accept connections
setTimeout(initializeDBAndRouting, 10000);

module.exports = app;
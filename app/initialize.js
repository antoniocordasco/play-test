const initialize = require('./db/db').initialize;

console.log('Initializing app...');

// need to wait until the DB container is ready to accept connections
setTimeout(initialize, 3000);
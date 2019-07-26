const express = require('express');
const db = require('./db/db').todos;
const dbTestQuery = require('./db/db').dbTestQuery;
// Set up the express app
const app = express();
// get all todos
app.get('/api/v1/todos', async (req, res) => {

  let testVar = await dbTestQuery();

  res.status(200).send({
    success: 'true',
    message: 'todos retrieved successfully',
    todos: db,
    testMsg: testVar
  })
});
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});
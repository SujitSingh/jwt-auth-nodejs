const express = require('express');
require('dotenv').config();
const app = express();

app.use(express.json());

app.get('/', (req, res, next) => {
  res.send({ message: 'Hello' })
});

module.exports = app;
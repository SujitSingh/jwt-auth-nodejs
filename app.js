const express = require('express');
const cookieParser = require('cookie-parser');
const routes = require('./routes.js');

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(routes);

// final error handler
app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).send({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
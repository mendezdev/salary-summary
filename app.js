const express = require('express');
const app = express();
const { INTERNAL_SERVER_ERROR, NOT_FOUND, OK } = require('http-status');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-Width, Content-Type, Accept, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(OK).json({});
  }
  next();
})

app.use('/helloworld', (req, res) => {
  res.status(OK).json({
    message: 'This is the hello world test!'
  });
});

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = NOT_FOUND;
  next(error);
});

app.use((error, req, res) => {
  res.status(error.status || INTERNAL_SERVER_ERROR);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
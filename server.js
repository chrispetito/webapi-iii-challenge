const express = require('express');

const server = express();

server.get('/', logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
  console.log(`This is a ${req.method} request at ${req.originalUrl} URL, performed at ${Date.now()}`)
  next();
};

module.exports = server;

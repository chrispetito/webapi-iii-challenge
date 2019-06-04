const express = require('express');

const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');

const server = express();

server.use(express.json());


server.use('/api/posts', logger, postRouter)
server.use('/api/users', logger, userRouter)

server.get('/', (req, res) => {
  res.json({message: 'Welcome to my Web API III Challenge', MOTD: 'Hello from my Web API III Challenge'});
})

//custom middleware

function logger(req, res, next) {
  console.log(`This is a ${req.method} request at the ${req.originalUrl} URL, performed at ${Date.now()}`)
  next();
};

module.exports = server;

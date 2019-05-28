const express = require('express');
const posts = require('./posts.js');

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
  res.send('hello world');
})

server.use('/users', posts);

module.exports = server;

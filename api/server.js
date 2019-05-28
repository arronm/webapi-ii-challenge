const express = require('express');
const posts = require('./posts.js');

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
  res.send('hello world');
})

server.use('/api/posts', posts);

module.exports = server;

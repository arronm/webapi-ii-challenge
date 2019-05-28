const server = require('./api/server.js');
const PORT = 4444;

server.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});

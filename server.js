const http = require('http');
const app = require('./app.js');
const config = require('./utils/config.js');

const PORT = config.PORT;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
}).on('error', error => {
  console.error(`Server error -`, error);
});
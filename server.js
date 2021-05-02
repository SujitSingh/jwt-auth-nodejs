require('dotenv').config();
const http = require('http');
const app = require('./app.js');
const config = require('./api/utils/config.js');
const mongoConnect = require('./api/utils/db-connection.js').mongoConnect;

const PORT = config.PORT;
const server = http.createServer(app);

mongoConnect().then(success => {
  console.log('Database connected');
  // start server
  server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  }).on('error', error => {
    console.error(`Server error -`, error);
  });
}).catch(error => {
  console.log('Failed to connect database', error);
});
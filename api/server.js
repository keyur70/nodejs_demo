const http = require('http');
const app = require('./app');
const server = http.createServer(app);


server.listen(1111, console.log('server is started'));
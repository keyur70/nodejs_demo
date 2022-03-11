const http = require('http');
const app = require('./app');
const server = http.createServer(app);


server.listen(7777, console.log('server is runnig'));


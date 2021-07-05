const http = require('http');
const environment = require('./API/commons/environments');
const app = require('./app');
const server = http.createServer(app)

server.listen(environment.port,()=>{
    console.log("Server running in localhost:" + environment.port);
});

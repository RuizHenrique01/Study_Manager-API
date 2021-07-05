const env = require('./API/commons/environments');
const app = require('./app');

app.listen(env.port,()=>{
    console.log("Server running in localhost:" + env.port);
});

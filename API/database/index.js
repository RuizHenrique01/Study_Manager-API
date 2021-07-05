const mongoose = require("mongoose");
const env = require('../commons/environments');

mongoose.connect(env.urlDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false 
});
mongoose.Promise = global.Promise;

module.exports = mongoose;
var config = module.exports;
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var PRODUCTION = 'production';
config.saltRound = 10;
config.express = {
    port : process.env.PORT || 3131,
    ip : "127.0.0.1",
};

mongoose.connect(process.env.DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
.then(() => {
    console.log("Database connection successful");
})
.catch((err) => {
    console.error("Database connection error:", err);
});
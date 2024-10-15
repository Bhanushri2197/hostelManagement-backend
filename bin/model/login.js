const mongoose = require('mongoose')

const LogInSchema = new mongoose.Schema({
    email: String,
    password: String,
})

const LogInModel = mongoose.model("log-in",LogInSchema)
module.exports = LogInModel
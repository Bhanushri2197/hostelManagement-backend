const mongoose = require("mongoose")
const { type } = require("os")

const complainSchema  = new mongoose.Schema({
    complainTitle : {
        type : String,
        required : true
    },
    email : {
        type : String,
    },
    roomNo : {
        type : String,
    },
    description : {
        type : String,
    }
})

const ComplainsModel = mongoose.model("Complains" , complainSchema)
module.exports = ComplainsModel
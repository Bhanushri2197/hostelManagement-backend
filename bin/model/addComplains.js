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

const AddComplainsModel = mongoose.model("AddComplains" , complainSchema)
module.exports = AddComplainsModel
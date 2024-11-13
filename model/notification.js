const mongoose =  require('mongoose')

const NotificationSchema = new mongoose.Schema({
    notification : String,
})


const NotificationModel = mongoose.model("notification" , NotificationSchema)

module.exports = NotificationModel
const express = require('express')
const cors = require("cors")
const {MongoClient} = require("mongodb")
const app = express()

app.use(cors({
    origin: "http://localhost:5173"
}))

let complains = [
    {
        complainTitle: "Switch is Not Working",
        email: "steffynajones@mm.co",
        roomNo: "A1-19",
        description: "Fan is so noisy and sometime switch is not working",
        status: "pending"
    },
    {
        complainTitle: "Lack of Hot Water in room - ",
        email: "jones@mm.co",
        roomNo: "d2-5",
        description: "inconsistent or insufficient hot water in the showers.",
        status: "completed"
    },
]

app.get('/complains' , (req,res) => {
    res.json(complains)
})
app.get('/admin/dashboard' , (req,res) => {
    res.json(complains)
})
app.post('/admin/dashboard' , (req,res) => {
    res.json({message : "post req succesful"})
    
})
app.listen(3000,() => {
   console.log("WebServer is running")
})
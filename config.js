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

// import mongoose from "mongoose";
// import dotenv from 'dotenv';

// dotenv.config()

// const connectDB = async () => {
//     try {
//         const connection = await mongoose.connect(process.env.mongoDBConnectionString)
//         console.log("DB Connected");

//         return connection

//     } catch (error) {
//         console.log(error);
//     }

//     return connectDB
// }

// export default connectDB;
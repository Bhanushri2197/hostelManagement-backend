var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
var dotenv = require("dotenv").config();

require("./config.js")
var indexRouter = require("./routes/index");
var complainsRouter = require("./routes/complains");
var roomsRouter = require("./routes/rooms");
var bookingRouter = require("./routes/booking");
const signInRouter = require("./routes/usersSigned.js");


var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],  // Add any other frontend origins
  })
);

app.use("/", indexRouter);
app.use("/complains", complainsRouter);
app.use("/rooms", roomsRouter);
app.use("/booking", bookingRouter);
app.use("/authentication", signInRouter);

// dbConnect()
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler


// module.exports = app;

app.listen(4000, () => {
  console.log("server is running on port 4000");
});

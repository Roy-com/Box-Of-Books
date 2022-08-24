require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Bookrouter = require("./routes/book-routes");
const Userrouter = require("./routes/user-routes");

const cors = require("cors");
const app = express();
const { connectDB } = require("./config/database");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "token"],
    credentials: true,
  })
);

//Middlewares: Connecting different Routes
app.use("/books", Bookrouter);
app.use("/users", Userrouter);


//Connect to the DataBase
connectDB();

//Listen to the PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("server running at port 5000");
  }
});

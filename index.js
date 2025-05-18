const express = require("express");
const app = require("express")();
const mongodb = require("./db/connect.js");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
// import contactRoutes from "./routes/index.js";

const PORT = process.env.DEV_PORT || 8080;

const DB = mongodb.initDb();

app.use(express.urlencoded({ extended: true }));

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    ()=>{
      console.log("Parser activated")
    }
    next();
  })
  .use('/', require('./routes'));


// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


if (!DB) {
  console.error("Failed to connect to the database");
} else {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
}
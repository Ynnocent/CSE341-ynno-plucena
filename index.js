import express from "express";
const app = express();
import { initDb } from "./db/connect.js";
import dotenv from "dotenv";
dotenv.configDotenv();

const PORT = process.env.DEV_PORT || 8080;
import nameRoutes from "./routes/userRoutes.js";


app.use(express.json()).use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();    
});
app.use("/", nameRoutes);


initDb((err, mongoDB) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(PORT);
      console.log(`Connected to DB and listening on ${PORT}`);
    }
  });
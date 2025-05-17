import express from "express";
const app = express();
import { initDb } from "./db/connect.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.configDotenv();

const DB  = await initDb();

const PORT = process.env.DEV_PORT || 8080;
import nameRoutes from "./routes/userRoutes.js";

app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
}))
app.use(express.json()).use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();    
});
app.use("/contacts", nameRoutes);


if (!DB) {
  console.error("Failed to connect to the database");
} else {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
}
// import { MongoClient } from "mongodb";
const MongoClient = require("mongodb").MongoClient;
const dotenv = require("dotenv");
dotenv.config();

const URI = process.env.DB_URI;

const initDb = async () => {
  try {
    const mongoDB = await MongoClient.connect(URI);

    if (!mongoDB) {
      throw Error({
        status: "error",
        message: "MongoDB connection failed.",
      });
    } else {
      // console.log("MongoDB connected successfully");
      return mongoDB;
    }
  } catch (error) {
    return error;
  }
};

const getDb = async () => {
  try {
    const mongoDB = await initDb().then((client) => {
      return client.db("CSE341DB");
    });
    return mongoDB;
  } catch (error) {
    console.error("Error in getDB:", error);
    throw error;
  }
};

module.exports = {
  initDb,
  getDb,
};
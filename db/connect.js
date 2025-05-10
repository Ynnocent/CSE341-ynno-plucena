
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.configDotenv();


const URI = process.env.DB_URI;

export const initDb = async () => {
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
  
  export const getDb = async () => {
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
  


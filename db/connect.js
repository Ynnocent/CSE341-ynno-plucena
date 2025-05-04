
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.configDotenv();


const URI = process.env.DB_URI;

let _db;

export const initDb = async (callback) => {
    if (_db) {

        console.log("Database is already initialized!");
        return callback(null, _db);
    }
    await MongoClient.connect(URI)
    .then((client) => {
        _db = client;
        callback(null, _db);
    })
    .catch((err) => {
        callback(err);
    });
}

export const getDb = () => {
    if (!_db) {
      throw Error('Db not initialized');
    }
    return _db;
  };
  



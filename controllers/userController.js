import { getDb } from "../db/connect.js";

import { ObjectId } from "mongodb";

export const getAll = async (req, res, next) => {
  const db = await getDb();

  try {
    const result = db.collection("contacts").find();
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getSingle = async (req, res, next) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

   const userId = ObjectId.createFromHexString(id);
  try {
    const db = await getDb();
    const user = await db.collection("contacts").findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createContact = async (req, res, next) => {
  const { fname, lname, email, favoriteColor, birthdate } = req.body;
  // if (!fname || !lname || favColor || birthdate || !email) {
  //   return res.status(400).json({ message: "All fields are required" });
  // }

  const newContact = {
    fname,
    lname,
    favoriteColor,
    birthdate,
    email,
  };

  try {
    const db = await getDb();
    const result = await db.collection("contacts").insertOne(newContact);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const updateContact = async (req, res, next) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  const userId = ObjectId.createFromHexString(id);
  const { fname, lname, email, favoriteColor, birthdate } = req.body;

  if (!fname || !lname || !email || !favoriteColor || !birthdate) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const updatedContact = {
    fname,
    lname,
    email,
    favoriteColor,
    birthdate,
  };

  try {
    const db = await getDb();
    const result = await db
      .collection("contacts")
      .updateOne({ _id: userId }, { $set: updatedContact });

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    console.error("Error updating contact:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteContact = async (req, res, next) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  const userId = ObjectId.createFromHexString(id);

  try {
    const db = await getDb();
    const result = await db
      .collection("contacts")
      .deleteOne({ _id: userId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
import { getDb } from '../db/connect.js';

import { ObjectId } from 'mongodb';

export const getAll = async (req, res, next) => {
  const result = await getDb().db("CSE341DB").collection('users').find();

  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

export const getSingle = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await getDb()
    .db("CSE341DB")
    .collection('users')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};


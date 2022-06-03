"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const client = new MongoClient(MONGO_URI, options);

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

/////////////////////////////////////////////////////////////////////
//get all business
const getAllBusiness = async (req, res) => {

  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  try {
    const db = await client.db("Clinic");
    const data = await db.collection("business").find().toArray();

    res.status(200).json({
      status: 200,
      data: data,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: "something wrong",
    });
  }
  client.close();
};

module.exports = {
    getAllBusiness
  };
"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

/////////////////////////////////////////////////////////////////////
//get all business
const getAllBusiness = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  
  try {
    await client.connect();
    const db = await client.db("Clinic");
    const data = await db.collection("business").find().toArray();

    res.status(200).json({
      status: 200,
      data: data,
    });
  } catch (err) {
    console.log(err)
    res.status(400).json({
      status: 400,
      message: "something wrong",
    });
  }
  client.close();
};
/////////////////////////////////////////////////////////////////////
//get filtered business
const filterBusiness = async (req, res) => {
  const cat = req.query.cat;
  const rating = req.query.rating;

  let result = []
  try {
    await client.connect();
    const db = await client.db("Clinic");
    if (cat.length > 0 ) {
      cat.map((item) => {
      // return result = [...result, await db.collection("business").findOne({ [item]: {'$exists': true} })]
      })
    }
    if (rating.length > 0 && rating.includes("oneStar")) {
      result = [...result, await db.collection("business").findOne({ rating: 1 })]
    }
    if (rating.length > 0 && rating.includes("twoStars")) {
      result = [...result, await db.collection("business").findOne({ rating: 2 })]
    }
    if (rating.length > 0 && rating.includes("threeStars")) {
      result = [...result, await db.collection("business").findOne({ rating: 3 })]
    }
    if (rating.length > 0 && rating.includes("fourStarts")) {
      result = [...result, await db.collection("business").findOne({ rating: 4 })]
    }
    if (rating.length > 0 && rating.includes("fiveStars")) {
      result = [...result, await db.collection("business").findOne({ rating: 5 })]
    }

    res.status(200).json({
      status: 200,
      data: result,
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
    getAllBusiness,
    filterBusiness
  };
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
  
  try {
    await client.connect();
    const db = await client.db("Clinic");
    const data = await db.collection("business").find().toArray();
    // console.log(data)
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
/////////////////////////////////////////////////////////////////////
//get filtered business
const filterBusiness = async (req, res) => {
  const cat = JSON.parse(req.query.cat);
  const rating = JSON.parse(req.query.rating);

  let result = []
  try {
      await client.connect();
      const db = await client.db("Clinic");
      // find items with category values
              await Promise.all (
                cat.map(async (item) => {
                  const partResult = await db.collection("business").find({ [item]: { $exists: true, $ne: null } }).toArray()
              return result = [...result, ...partResult]
              })
              )
        if (rating.includes("oneStar")) {
          const partResult = await db.collection("business").find({ rating: 1 }).toArray()
          result = [...result, ...partResult]
        } 
        if (rating.includes("twoStars")) {
          const partResult = await db.collection("business").find({ rating: 2 }).toArray()
          result = [...result, ...partResult]
        } 
        if (rating.includes("threeStars")) {
          const partResult = await db.collection("business").find({ rating: 3 }).toArray()
          result = [...result, ...partResult]
        } 
        if (rating.includes("fourStars")) {
          const partResult = await db.collection("business").find({ rating: 4 }).toArray()
          result = [...result, ...partResult]
        } 
        if (rating.length > 0 && rating.includes("fiveStars")) {
          const partResult = await db.collection("business").find({ rating: 5 }).toArray()
          result = [...result, ...partResult]
        }
    
    // eliminate duplicated result
    const uniqueResult = (data, key) => {
      return [
        ...new Map(
          data.map(x => [key(x), x])
        ).values()
      ]
    }
    const newResult = uniqueResult(result, it => it._id)

    res.status(200).json({
      status: 200,
      data: newResult,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: "something wrong",
    });
  }
  // client.close();
};
//////////////////////////////////////////////////////////////////
// get single business getSingleBusiness
const getSingleBusiness = async (req, res) => {
  const { id } = req.params;
  const Id = parseInt(id);
  try {
    await client.connect();
    const db = await client.db("Clinic");
    const data = await db.collection("business").findOne({ _id: Id});
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
//////////////////////////////////////////////////////////////////
// adding new users
const addNewUsers = async (req, res) => {
  const { email, password, _id, username } = req.body;
  const newUser = { email, password, _id, username };
  try {
    await client.connect();
    const db = client.db("Clinic");

  // check if user email correct
    if (!email.includes("@")) {
      return res.status(400).json({
        status: 400,
        success: "Invalid Email",
      });
    }
  // add new order in the new customerOrder collection
    else await db.collection("users").insertOne(newUser);

    res
      .status(200)
      .json({ status: 200, message: "new user added", data: newUser });
  } catch (err) {
    res.status(404).json({ status: 404, message: err.message });
  }
  client.close();
};
//////////////////////////////////////////////////////////////////
// get Single user for sideBar username
const getSingleUser = async (req, res) => {
  const { id } = req.params;

  try {
    await client.connect();
    const db = await client.db("Clinic");
    const data = await db.collection("users").findOne({ _id: id});
      console.log(data)
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
    getAllBusiness,
    filterBusiness,
    getSingleBusiness,
    addNewUsers,
    getSingleUser
  };
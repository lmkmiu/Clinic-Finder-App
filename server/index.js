"use strict";

const express = require("express");
const morgan = require("morgan");

const {
  getAllBusiness,
    filterBusiness,
    getSingleBusiness,
    addNewUsers,
    getSingleUser
} = require("./handler");

const PORT = 8000;

express()
  .use(morgan("tiny"))
  .use(express.json())

  // getting all data
  .get("/api/all-business", getAllBusiness)
  // filter result
  .get("/api/business", filterBusiness)
  // get single business
  .get("/api/business/:id", getSingleBusiness)
  // posting comments
  // adding new users
  .post("/api/new-users", addNewUsers)
  // get single user
  .get("/api/user/:id", getSingleUser)


  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is not what you are looking for.",
    });
  })

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));

"use strict";

const express = require("express");
const morgan = require("morgan");

const {
    getAllBusiness,
} = require("./handler");

const PORT = 8000;

express()
  .use(morgan("tiny"))
  .use(express.json())
  
  .use(express.static("public"))

  // getting all data
  .get("/api/all-business", getAllBusiness)
  // filter result
  .get("")


  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is not what you are looking for.",
    });
  })

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));

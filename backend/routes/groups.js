const express = require("express");
const { db } = require("../firebase");
const cors = require("cors");

// Route Handler
const groups = express.Router();
groups.use(cors());

groups.get("/", async (req, res) => {
  console.log("Inside groups GET route!");
  res.json("Inside groups GET route!");
});

module.exports = groups;
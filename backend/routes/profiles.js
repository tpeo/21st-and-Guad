const express = require("express");
const { db } = require("../firebase");
const cors = require("cors");

// Route Handler
const profiles = express.Router();
profiles.use(cors());

profiles.get("/", async (req, res) => {
  console.log("Inside profiles GET route!");
  res.json("Inside profiles GET route!");
});

module.exports = profiles;

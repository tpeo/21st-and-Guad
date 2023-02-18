const express = require("express");
const { db } = require("../firebase");
const cors = require("cors");

// Route Handler
const groups = express.Router();
groups.use(cors());

groups.post("/", async (req, res) => {
    console.log("Inside groups GET route!");
    res.json("Inside groups GET route!");
  });

groups.get("/", async (req, res) => {
    const groups_db = db.collection("groups");
    const groups = await groups_db.get();
    const ret = groups.docs.map((obj) => obj.data());
    res.json(ret);
});

module.exports = groups;
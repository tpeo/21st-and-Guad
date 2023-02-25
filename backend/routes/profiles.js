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

profiles.post("/", async (req, res) => {
  //need to update id with uid
  const body = req.body;
  const doc = await db.collection("profiles").add({
    email: body.email,
    name: body.name,
    gender: body.gender,
    first_preference: body.first_preference,
    second_preference: body.second_preference,
    third_preference: body.third_preference,
    price: body.price,
    distance: body.distance,
    group: []
  });

  res.status(200).send("OK");
});

module.exports = profiles;

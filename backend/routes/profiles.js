const express = require("express");
const { db } = require("../firebase");
const cors = require("cors");

// Route Handler
const profiles = express.Router();
profiles.use(cors());

profiles.get("/:userID", async (req, res) => {
  try {
    const userID = req.params.userID;
    const doc = await db.collection("profiles").doc(userID).get();
    if (!doc.exists) {
      res.status(404).json({ message: "Profile not found" });
    } else {
      const data = doc.data();
      res.status(200).json(data);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting profile." });
  }
});

profiles.post("/", async (req, res) => {
  try {
    const body = req.body;
    const doc = await db.collection("profiles").doc(body.userID).set({
      email: body.email,
      name: body.name,
      gender: body.gender,
      first_preference: body.first_preference,
      second_preference: body.second_preference,
      third_preference: body.third_preference,
      price: body.price,
      distance: body.distance,
      address: body.address,
      group: [],
    });
    res.status(200).json({ message: "OK" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating profile." });
  }
});

module.exports = profiles;

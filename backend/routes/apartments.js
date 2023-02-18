const express = require("express");
const { db } = require("../firebase");
const cors = require("cors");

// Route Handler
const apartments = express.Router();
apartments.use(cors());

apartments.get("/", async (req, res) => {
  const apartment_db = db.collection("apartments");
  const apartments = await apartment_db.get();
  const ret = apartments.docs.map((obj) => obj.data());
  res.json(ret);
});

apartments.post("/", async (req, res) => {
  const body = req.body;
  const doc = await db.collection("apartments").add({
    name: body.name,
    location: body.location,
    rating: body.rating,
  });

  res.status(200).send("OK");
});

module.exports = apartments;

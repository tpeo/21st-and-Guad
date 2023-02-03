const express = require("express");
const app = express();
const cors = require('cors')
app.use(express.json());
require("dotenv").config();
const { db, admin } = require('./firebase');

// firebase authentication middleware. 
// to use, make sure authorization token is inside req.body
const auth = (req, res, next) => {
  try {
    const tokenId = req.get("Authorization").split("Bearer ")[1];
    return admin
      .auth()
      .verifyIdToken(tokenId)
      .then((decoded) => {
        req.token = decoded;
        next();
      })
      .catch((err) => {
        res.status(401).send(err);
        console.log(tokenId);
      });
  } catch (e) {
    res.status(400).send("Errors");
  }
};

app.get("/", (req, res) => {
  res.status(201).json({ hello: "HELLO WORLD" });
});

app.get('/apartments', async (req, res) => {
    const apartment = db.collection("apartments"); 
    const apartments = await apartment.get();
    const ret = apartments.docs.map((obj) => obj.data());
    res.json(ret);
})

app.post('/apartments', async (req, res) => { 
    const body = req.body;
    const doc = await db.collection('apartments').add({
      name: body.name,
      location: body.location,
      rating: body.rating,
    });
    
    res.status(200).send("OK")
    
})

app.listen(4000, () => {
  console.log("Server running on port 4000");
});

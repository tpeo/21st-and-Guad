const express = require('express');
const app = express();
require('dotenv').config();
const fb = require("firebase-admin");

fb.initializeApp({
    credential: fb.credential.cert(require("./cred.json")),
    databaseURL: "https://your-project-id.firebaseio.com",
    });
    
    const auth = (req, res, next) => {
    try {
        const tokenId = req.get("Authorization").split("Bearer ")[1];
        return fb
        .auth()
        .verifyIdToken(tokenId)
        .then((decoded) => {
            req.token = decoded;
            next();
        })
        .catch((err) => res.status(401).send(err));
    } catch (e) {
        res.status(400).send("Errors");
    }
    };


app.listen(4000, () => {
    console.log('Server running on port 4000');
});


const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
require("dotenv").config();
const { db, admin } = require("./firebase");

// import apartments routes
const apartmentsRouter = require("./routes/apartments");
app.use("/apartments", apartmentsRouter);

// import meetings routes
const meetingsRouter = require('./routes/meetings');
app.use('/meetings', meetingsRouter);

// import profiles routes
const profilesRouter = require("./routes/profiles");
app.use("/profiles", profilesRouter);

// import groups routes
const groupsRouter = require("./routes/groups");
app.use("/groups", groupsRouter);

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

// Export the app as a function that Vercel can use
module.exports = app;

// Export the app as a function that Vercel can use
module.exports = app;

app.listen(4000, () => {
  console.log("Server running on port 4000");
});

//exports the auth() middleware function so that other route files can use it as well
// module.exports = {
//   auth
// };

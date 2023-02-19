const express = require("express");
const { db } = require("../firebase");
const cors = require("cors");

// Route Handler
const groups = express.Router();
groups.use(cors());

// creates a new group object. requires one param: userId to be sent within body
// returns the groupId
groups.post("/", async (req, res) => {
  try {
    const groups_db = db.collection("groups");
    const body = req.body;

    // Create a new group document with the user ID in the 'users' array
    const group = await groups_db.add({
      users: [body.userId],
    });

    // Create an 'apartments' sub-collection inside the group document
    const apartmentsRef = group.collection("apartments");
    // creates a 'dummy' apartment document for now, to show that it works.
    // in the future, the sub-collection is automatically created whenever
    // the first element is added
    const apartment = await apartmentsRef.add({
      name: "empty for now",
    });

    res.status(201).json({ groupId: group.id });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating group document");
  }
});

// gets the data of a group object based on groupId and returns it
// returns the users in a group, and all apartments inside it
groups.get("/", async (req, res) => {
  // get groupId from req.body, used to find group document
  const groupId = req.body.groupId;

  const groupRef = db.collection("groups").doc(groupId);
  const groupDoc = await groupRef.get();
  // Check if the group exists
  if (!groupDoc.exists) {
    res.status(404).send("Group not found");
  } else {
    const groupData = groupDoc.data();

    // Get apartments sub-collection data
    const apartmentsCollection = groupRef.collection("apartments");
    const apartmentsDocs = await apartmentsCollection.get();
    const apartmentsData = apartmentsDocs.docs.map((doc) => doc.data());

    // returns a JSON with a users array and apartmentData - an array of JSONs
    res.status(200).json({
      users: groupData.users,
      apartmentsData: apartmentsData,
    });
  }
});

// adds a user to a group. requires a groupId and userId in req.body
groups.put("/addUser", async (req, res) => {
  const groups_db = db.collection("groups");
  const body = req.body;

  try {
    const groupRef = await groups_db.doc(body.groupId);
    const groupDoc = await groupRef.get();
    const users = groupDoc.data().users;
    // Check if the group exists
    if (!groupDoc.exists) {
      res.status(404).send("Group not found");
    } else {
      // If user is already in the group, return an error
      if (users.includes(body.userId)) {
        return res.status(400).send("User already in group");
      }

      // Add the user to the 'users' array
      users.push(body.userId);

      // Update the 'users' array in the group document
      await groupRef.update({ users });
      console.log(users);
      res.status(200).send("User added to group");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding user to group");
  }
});

// adds a user to a group. requires a groupId and userId in req.body
groups.delete("/removeUser", async (req, res) => {
  const groups_db = db.collection("groups");
  const body = req.body;

  try {
    const groupRef = groups_db.doc(body.groupId);
    const groupDoc = await groupRef.get();

    // Check if the group exists
    if (!groupDoc.exists) {
      res.status(404).send("Group not found");
    } else {
      // If the group does exist, filter the users so that the user is removed
      const users = groupDoc.data().users;
      const updatedUsers = users.filter((user) => user !== body.userId);

      await groupRef.update({ users: updatedUsers });
      console.log(users);
      
      //special case! if the users array is empty, we can safely delete the group
      if (updatedUsers.length === 0) {
        await groupRef.delete();
        res.send("The last user in the group just left! Group was deleted.");
        return;
      }
      //default case: user is removed, group remains 
      res.status(200).send("User removed from group");
    
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error removing user from group");
  }
});

module.exports = groups;

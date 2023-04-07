const express = require("express");
const { db } = require("../firebase");
const cors = require("cors");

// Route Handler
const meetings = express.Router();
meetings.use(cors());

// returns ALL apartment documents within a group document
// takes in a groupId in params and returns apartment documents
meetings.get("/", async (req, res) => {
  const groupId = req.body.groupId;

  try {
    // Check if group document exists
    const groupDoc = await db.collection("groups").doc(groupId).get();
    if (!groupDoc.exists) {
      res.status(404).send("Group not found");
      return;
    }

    // Get all apartments in group subcollection
    const meetingsRef = groupDoc.ref.collection("apartments");
    const meetingsSnapshot = await meetingsRef.get();

    // Convert apartments snapshot to an array of apartment documents
    const meetings = [];
    meetingsSnapshot.forEach((meetingDoc) => {
        meetings.push({
        //appends the id of the apartmentDoc if we need it later in frontend
        ...meetingDoc.data(),
        id: meetingDoc.id,
      });
    });

    // Send array of apartment documents as response
    res.status(200).send(meetings);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// creates an apartment card using inputs for research + groupId to know where to place it
meetings.post("/", async (req, res) => {
  const groupId = req.body.groupId;
  const groupRef = db.collection("groups").doc(groupId);

  // Extract apartment fields from request body
  const {
    event,
    date,
    location,
    attending
  } = req.body;

  // Create a new apartment document
  const newMeetingRef = await groupRef.collection("meetings").add({
    event: event,
    date: date,
    location: location,
    attending: attending
  });

   // Get the ID of the newly created apartment document
   const newMeetingId = newMeetingRef.id;

   // Return the newly created apartment document
   const newMeetingDoc = await newMeetingRef.get();
 
   // Create a new object that contains both the apartment data and its ID
   const newMeetingData = {
     id: newMeetingId,
     ...newMeetingDoc.data(),
   };
   // Return the newly created apartment document with its ID
   res.status(201).json(newMeetingData);
});

// updates an meeting card using new data
// takes in a groupId and meetingId to find the document
meetings.put("/", async (req, res) => {
  const groupId = req.body.groupId;
  const meetingId = req.body.meetingId;
  const meetingRef = db.collection("groups").doc(groupId).collection("meetings").doc(meetingId);

  // Extract meeting fields from request body
  const {
    event,
    date,
    location,
    attending
  } = req.body;

  // Update the meeting document with new data
  try {
    await meetingRef.update({
        event: event,
        date: date,
        location: location,
        attending: attending
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to update meeting document");
    return;
  }

  // Return the updated apartment document
  const updatedMeetingDoc = await meetingRef.get();
  res.status(200).send(updatedMeetingDoc.data());
});

module.exports = meetings;

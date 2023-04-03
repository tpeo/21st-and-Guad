const express = require("express");
const { db } = require("../firebase");
const cors = require("cors");

// Route Handler
const apartments = express.Router();
apartments.use(cors());

// returns ALL apartment documents within a group document
// takes in a groupId in params and returns apartment documents
apartments.get("/", async (req, res) => {
  const groupId = req.body.groupId;

  try {
    // Check if group document exists
    const groupDoc = await db.collection("groups").doc(groupId).get();
    if (!groupDoc.exists) {
      res.status(404).send("Group not found");
      return;
    }

    // Get all apartments in group subcollection
    const apartmentsRef = groupDoc.ref.collection("apartments");
    const apartmentsSnapshot = await apartmentsRef.get();

    // Convert apartments snapshot to an array of apartment documents
    const apartments = [];
    apartmentsSnapshot.forEach((apartmentDoc) => {
      apartments.push({
        //appends the id of the apartmentDoc if we need it later in frontend
        id: apartmentDoc.id,
        ...apartmentDoc.data(),
      });
    });

    // Send array of apartment documents as response
    res.status(200).send(apartments);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// creates an apartment card using inputs for research + groupId to know where to place it
apartments.post("/", async (req, res) => {
  const groupId = req.body.groupId;
  const groupRef = db.collection("groups").doc(groupId);

  // Extract apartment fields from request body
  const {
    name,
    address,
    phone_number,
    amenities,
    distance,
    price_low,
    price_high,
    floorplan_bed,
    floorplan_bath,
    main_rating,
    security_rating,
    square_footage,
    notes,
  } = req.body;

  // Create a new apartment document
  const newApartmentRef = await groupRef.collection("apartments").add({
    name: name,
    address: address,
    phone_number: phone_number,
    amenities: amenities,
    distance: distance,
    price_low: price_low,
    price_high: price_high,
    floorplan_bed: floorplan_bed,
    floorplan_bath: floorplan_bath,
    main_rating: main_rating,
    security_rating: security_rating,
    square_footage: square_footage,
    notes: notes,
  });

  // Get the ID of the newly created apartment document
  const newApartmentId = newApartmentRef.id;

  // Return the newly created apartment document
  const newApartmentDoc = await newApartmentRef.get();

  // Create a new object that contains both the apartment data and its ID
  const newApartmentData = {
    id: newApartmentId,
    ...newApartmentDoc.data(),
  };
  // Return the newly created apartment document with its ID
  res.status(201).json(newApartmentData);
});

// updates an apartment card using new data
// takes in a groupId and apartmentId to find the document
apartments.put("/", async (req, res) => {
  const groupId = req.body.groupId;
  const apartmentId = req.body.apartmentId;
  const apartmentRef = db
    .collection("groups")
    .doc(groupId)
    .collection("apartments")
    .doc(apartmentId);

  // Extract apartment fields from request body
  const {
    name,
    address,
    phone_number,
    amenities,
    distance,
    price_low,
    price_high,
    floorplan_bed,
    floorplan_bath,
    main_rating,
    security_rating,
    square_footage,
    notes,
  } = req.body;

  // Update the apartment document with new data
  try {
    await apartmentRef.update({
      name: name,
      address: address,
      phone_number: phone_number,
      amenities: amenities,
      distance: distance,
      price_low: price_low,
      price_high: price_high,
      floorplan_bed: floorplan_bed,
      floorplan_bath: floorplan_bath,
      main_rating: main_rating,
      security_rating: security_rating,
      square_footage: square_footage,
      notes: notes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to update apartment document");
    return;
  }

  // Return the updated apartment document
  const updatedApartmentDoc = await apartmentRef.get();
  res.status(200).send(updatedApartmentDoc.data());
});

// deletes an apartment document
// takes in a groupId and apartmentId to find the document
apartments.delete("/", async (req, res) => {
  const groupId = req.body.groupId;
  const apartmentId = req.body.apartmentId;
  const apartmentRef = db
    .collection("groups")
    .doc(groupId)
    .collection("apartments")
    .doc(apartmentId);

  // Check that the apartment document exists
  const apartmentDoc = await apartmentRef.get();
  if (!apartmentDoc.exists) {
    res.status(404).send("Apartment document not found");
    return;
  }

  // Delete the apartment document
  try {
    await apartmentRef.delete();
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to delete apartment document");
    return;
  }

  res.status(200).send("Apartment document deleted");
});

module.exports = apartments;

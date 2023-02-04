import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { FaStar } from "react-icons/fa";
import "./ApartmentForm.css";
import "../App.css";

function ApartmentForm() {
  const [apartmentData, setApartmentData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    rating: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const auth = useContext(AuthContext)
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //logic for sending formData to backend once we finish that
    console.log(formData);
    if (!formData.name || !formData.location || !formData.rating) {
      setErrorMessage("All fields are required.");
    } else {
      setApartmentData([...apartmentData, formData]);
      setFormData({
        name: "",
        location: "",
        rating: 0,
      });
      setErrorMessage("");
    }
  };

  return (
    <div>
      <div className="App-header">
        <form className="ApartmentForm" onSubmit={handleSubmit}>
          <label>Apartment Name: </label>
          <div className="formGroup">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            ></input>
          </div>
          <label>Apartment Location: </label>
          <div className="formGroup">
            <input
              type="text"
              name="location"
              id="location"
              value={formData.location}
              onChange={handleChange}
            ></input>
          </div>
          <div className="form-group">
            <label>Apartment Rating:</label>
            <div className="rating-icons">
              {[1, 2, 3, 4, 5].map((rating) => (
                <FaStar
                  key={rating}
                  className={`star ${
                    formData.rating >= rating ? "selected" : ""
                  }`}
                  onClick={() => setFormData({ ...formData, rating })}
                />
              ))}
            </div>
          </div>
          <button type="submit">Submit</button>
          {errorMessage && <p style={{ color: "red", fontSize: "15px" }}>{errorMessage}</p>}
        </form>
        <br />
        <br />
        <h2>Submitted Apartments:</h2>
        <div className="submissions-container">
        {apartmentData.map((apartment, index) => (
          <div
            key={index}
            className="submissions"
            style={{
              padding: "10px",
              margin: "10px",
              border: "1px solid lightgray",
            }}
          >
            <p>Name: {apartment.name}</p>
            <p>Location: {apartment.location}</p>
            <p>Rating: {apartment.rating}</p>
          </div>
          
        ))}
        </div>
        {/* <button onClick={window.localStorage.setItem('loggedIn', false)}>Logout 'does nothing atm'</button> */}
      </div>
    </div>
  );
}

export default ApartmentForm;

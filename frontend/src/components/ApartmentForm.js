import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { FaStar } from "react-icons/fa";
import "./ApartmentForm.css";
import "../App.css";

function ApartmentForm() {
  // Use state to manage local database of submitted apartment data
  const [apartmentData, setApartmentData] = useState([]);

  // Use state to manage form data (name, location, rating)
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    rating: "",
  });

  // Use state to manage error message
  const [errorMessage, setErrorMessage] = useState("");

  // Use the AuthContext to access the authentication functions (logout, loggedIn)
  const auth = useContext(AuthContext);

  // Use the useNavigate hook from react-router to navigate between pages
  const navigate = useNavigate();

  const [name, setName] = useState(window.localStorage.getItem("username"));

  // useEffect will run on first render and any time auth.loggedIn changes
  // useEffect(() => {
  //   // Check if the user is logged in
  //   if (!auth.loggedIn) {
  //     // If the user is not logged in, redirect to the login page
  //     navigate("/login");
  //   }
  //   else{
  //     navigate("/");
  //   }
  // }, [auth.loggedIn]);

  // Event handler to update the formData state when the input fields change
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  // handleSubmit function is used to handle the form submit event for apartment info
  const handleSubmit = (event) => {
    // prevents the default form submit behavior
    event.preventDefault();
    console.log(formData);
    // checks if any of the required fields (name, location, rating) are missing
    if (!formData.name || !formData.location || !formData.rating) {
      setErrorMessage("All fields are required.");
    } else {
      // adds the current form data to the list of apartments
      setApartmentData([...apartmentData, formData]);
      // resets the form data to the default values
      setFormData({
        name: "",
        location: "",
        rating: 0,
      });
      setErrorMessage("");
    }
  };
  

  // this component returns a form for entering apartment data,
  // as well as a list of previously submitted apartments
  return (
    <div>
      <div className="App-header">

       <div className="userBanner">{name} </div>
        
        {/* form for entering apartment data */}
        <form className="ApartmentForm" onSubmit={handleSubmit}>
          <label>Apartment Name: </label>
          <div className="formGroup">
            {/* input field for apartment name */}
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
            {/* input field for apartment location */}
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
              {/* displays stars for selecting the apartment rating */}
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
          {/* submit button for the form */}
          <button type="submit">Submit</button>
          {/* displays an error message if one is set */}
          {errorMessage && (
            <p style={{ color: "red", fontSize: "15px" }}>{errorMessage}</p>
          )}
        </form>
        <br />
        <br />
        <h2>Submitted Apartments:</h2>
        <div className="submissions-container">
          {/* displays a list of previously submitted apartments */}
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
        
        <button onClick={() => auth.logout()}>Logout</button> 
      </div>
    </div>
  );
}

export default ApartmentForm;

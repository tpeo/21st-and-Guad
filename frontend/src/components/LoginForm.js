import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "./ApartmentForm.css";
import AuthContext from "../contexts/AuthContext";

function LoginForm() {
  // Use state to manage form data (email and password)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Use state to manage error messages
  const [errorMessage, setErrorMessage] = useState("");

  // Use the useNavigate hook from react-router to navigate between pages
  const navigate = useNavigate();

   // Use the AuthContext to access the authentication functions (loginUser and createUser)
  const auth = useContext(AuthContext);

   // Event handler to update the formData state when the input fields change
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // useEffect will run on first render and any time auth.loggedIn changes
  useEffect(() => {
    // Check if the user is logged in
    if (auth.loggedIn) {
      // If the user is logged in, redirect to the apartment page
      navigate("/");
    }
  }, []);

  // Event handler for the login button, it calls the loginUser 
  // function from the AuthContext and navigates to the main page
  const handleLogin = async (event) => {
    event.preventDefault();
    console.log(formData);
    if (!formData.email || !formData.password) {
      setErrorMessage("All fields are required.");
    } else {
      try {
        await auth.loginUser(formData.email, formData.password);
        navigate("/");
        setErrorMessage("");
      } catch (error) {
        setErrorMessage(error);
      }
    }
  };

  // Event handler for the register button, it calls the createUser 
  // function from the AuthContext and navigates to the main page
  const handleRegister = async (event) => {
    event.preventDefault();
    console.log(formData);
    if (!formData.email || !formData.password) {
      setErrorMessage("All fields are required.");
    } else {
      try {
        await auth.createUser(formData.email, formData.password);
        navigate("/");
        setErrorMessage("");
      } catch (error) {
        setErrorMessage(error);
      }
    }
  };

  return (
    <div>
      <div className="App-header">
        <form className="ApartmentForm">
          <label>Email: </label>
          <div className="formGroup">
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            ></input>
          </div>
          <label>Password: </label>
          <div className="formGroup">
            <input
              type="text"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
            ></input>
          </div>
          <div className="submitBar">
            <button type="submit" onClick={handleLogin}>
              Login
            </button>
            <button type="submit" onClick={handleRegister}>
              Register
            </button>
          </div>
          {errorMessage && (
            <p style={{ color: "red", fontSize: "15px" }}>{errorMessage}</p>
          )}
        </form>
        <br />
        <br />
      </div>
    </div>
  );
}

export default LoginForm;

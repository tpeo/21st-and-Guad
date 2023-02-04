import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "./ApartmentForm.css";
import AuthContext from "../contexts/AuthContext";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

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

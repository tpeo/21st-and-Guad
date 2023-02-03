import React, { useEffect, useState, useContext } from "react";
import './LoginForm.js'

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    console.log(formData)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //logic for sending formData to backend once we finish that
    console.log(formData);
  }

  return (
    <form className="LoginForm" onSubmit={handleSubmit}>
      <div className="formGroup">
        <label>Apartment Name: </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        ></input>
        </div>
    <div className="formGroup">
        <label>Apartment Location: </label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
        ></input>
</div>
    <div className="formGroup">
        <label>Apartment Rating: </label>
        <input
          type="text"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
        ></input>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default LoginForm;

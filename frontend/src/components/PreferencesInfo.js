import React, { useEffect, useState, useContext } from "react";
import "../App.css";
import "./ApartmentForm.css";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Select from "@mui/material/Select";
import { appTheme } from "./Theme.js";
import AddressSearchBar from "./maps/AddressSearchBar";

function PreferencesInfo({ formData, setFormData }) {
  const [address, setAddress] = useState("");
  const [addressValid, setAddressValid] = useState(true);

  return (
    <>
      <Typography
        component="h1"
        sx={{
          fontWeight: appTheme.typography.fontWeightBold,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontSize: appTheme.typography.h1.fontSize,
          mb: 2,
          mt: "60vh",
        }}
      >
        Let us know your top preferences
      </Typography>

      <Typography component="h5" sx={{ fontWeight: 600, mb: 1 }}>
        First Preference
      </Typography>

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label"></InputLabel>
        <Select
          autoFocus
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formData.first_preference}
          onChange={(e) => {
            setFormData({
              ...formData,
              first_preference: e.target.value,
            });
          }}
        >
          <MenuItem value={"Distance"}>Distance</MenuItem>
          <MenuItem value={"Cost"}>Cost</MenuItem>
          <MenuItem value={"Windows"}>Windows</MenuItem>
          <MenuItem value={"Peaceful"}>Peaceful</MenuItem>
          <MenuItem value={"Gym"}>Gym</MenuItem>
        </Select>
      </FormControl>

      <Typography component="h5" sx={{ fontWeight: 600, mt: 2, mb: 1 }}>
        Second Preference
      </Typography>

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label"></InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formData.second_preference}
          onChange={(e) => {
            setFormData({
              ...formData,
              second_preference: e.target.value,
            });
          }}
        >
          <MenuItem value={"Distance"}>Distance</MenuItem>
          <MenuItem value={"Cost"}>Cost</MenuItem>
          <MenuItem value={"Windows"}>Windows</MenuItem>
          <MenuItem value={"Peaceful"}>Peaceful</MenuItem>
          <MenuItem value={"Gym"}>Gym</MenuItem>
        </Select>
      </FormControl>

      <Typography component="h5" sx={{ fontWeight: 600, mt: 2, mb: 1 }}>
        Third Preference
      </Typography>

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label"></InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formData.third_preference}
          onChange={(e) => {
            setFormData({
              ...formData,
              third_preference: e.target.value,
            });
          }}
        >
          <MenuItem value={"Distance"}>Distance</MenuItem>
          <MenuItem value={"Cost"}>Cost</MenuItem>
          <MenuItem value={"Windows"}>Windows</MenuItem>
          <MenuItem value={"Peaceful"}>Peaceful</MenuItem>
          <MenuItem value={"Gym"}>Gym</MenuItem>
        </Select>
      </FormControl>

      <Typography component="h5" sx={{ fontWeight: 600, mt: 2 }}>
        Max Price (Per Month):
      </Typography>

      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        name="name"
        sx={{ mb: 2.5 }}
        type="number"
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        value={formData.price}
        onChange={(e) => {
          setFormData({
            ...formData,
            price: e.target.value,
          });
        }}
      />
      <Typography component="h5" sx={{ fontWeight: 600, mt: 2, mb: 1 }}>
        Most Important Building on Campus to Me:
      </Typography>

      <AddressSearchBar
        formData={formData}
        setFormData={setFormData}
        address={address}
        setAddress={setAddress}
        addressValid={addressValid}
        setAddressValid={setAddressValid}
      ></AddressSearchBar>

      <Typography component="h5" sx={{ fontWeight: 600, mt: 2 }}>
        Max Distance from Previously Stated Building:
      </Typography>

      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        name="name"
        sx={{ mb: 2.5 }}
        value={formData.distance}
        type="number"
        InputProps={{
          endAdornment: <InputAdornment position="end">miles</InputAdornment>,
        }}
        onChange={(e) => {
          setFormData({
            ...formData,
            distance: e.target.value,
          });
        }}
      />
    </>
  );
}

export default PreferencesInfo;

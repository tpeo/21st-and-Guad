import React, { useState, useContext, useEffect } from "react";
import {
  Select,
  Typography,
  InputLabel,
  IconButton,
  MenuItem,
  FormControl,
  TextField,
  Avatar,
  Button,
  Box,
  Grid,
  InputAdornment,
  Snackbar,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import AddressSearchBar from "./maps/AddressSearchBar.js";
import { appTheme } from "./Theme.js";
import NavBar from "./NavBar.js";
import AuthContext from "../contexts/AuthContext.js";
import { getDistance } from "../utils/locations.js";
import MuiAlert from "@mui/material/Alert";

// react.school/material-ui

function ProfilePage() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [apartmentData, setApartmentData] = useState(
    JSON.parse(window.localStorage.getItem("apartmentData"))
  );

  async function updateApartmentData() {
    const origin = window.localStorage.getItem("address");

    const updatedData = await Promise.all(
      apartmentData.map(async (apartment) => {
        const destination = apartment.address;
        const newDistance = await getDistance(origin, destination);
        // Update Firebase database with new distance
        fetch(
          `http://${
            process.env.REACT_APP_HOSTNAME
          }/apartments/${window.localStorage.getItem("groupID")}/${
            apartment.id
          }/distance`,
          {
            method: "PUT",
            body: JSON.stringify({ distance: newDistance }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        return {
          ...apartment,
          distance: newDistance,
        };
      })
    );

    setApartmentData(updatedData);
    window.localStorage.setItem("apartmentData", JSON.stringify(updatedData));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const userID = window.localStorage.getItem("userID"); // replace with the user ID of the current user
    const url = `http://${process.env.REACT_APP_HOSTNAME}/profiles/${userID}`;

    fetch(url, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        window.localStorage.setItem("userData", JSON.stringify(formData));
        window.localStorage.setItem("address", formData.address);
        updateApartmentData(); // call the function to update apartmentData
        setOpenSnackbar(true); // show the snackbar message
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    gender: "",
    first_preference: "",
    second_preference: "",
    third_preference: "",
    address: "",
    price: 0,
    distance: 0,
  });
  const [address, setAddress] = useState(formData.address);
  const [addressValid, setAddressValid] = useState(true);

  // Define a useEffect hook to get the location when the component mounts
  useEffect(() => {
    const cachedUserData = JSON.parse(window.localStorage.getItem("userData"));
    if (cachedUserData) {
      setFormData(cachedUserData);
      console.log("cachedUserData", cachedUserData);
      setAddress(cachedUserData.address);
    }
  }, []);

  // Handle address change
  const handleAddressChange = async (newValue) => {
    await setFormData({
      ...formData,
      address: newValue,
    });
  };

  // snackbar state and handlers
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("Changes saved!");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <ThemeProvider theme={appTheme}>
      <NavBar></NavBar>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={12} sm={6} md={6} sx={{ borderRadius: 0 }}>
          <Box
            component="form"
            noValidate
            //onSubmit={handleSubmit}
            sx={{ width: 350, my: 2 }}
          >
            {/* <Typography component="h1" 
                    sx={{fontWeight: appTheme.typography.fontWeightBold, display: 'flex',
                    flexDirection: 'column', alignItems: 'center', fontSize: appTheme.typography.h1.fontSize, mb: 2}}>
                      Get started by letting us know more about yourself
            </Typography> */}

            {/* use css overlay for 'edit' */}
            <input accept="image/*" id="upload-avatar-pic" type="file" hidden />
            <label htmlFor="upload-avatar-pic">
              <IconButton
                component="span"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar
                  style={{
                    margin: "10px",
                    width: "100px",
                    height: "100px",
                  }}
                />
              </IconButton>
            </label>

            <Typography component="h5" sx={{ fontWeight: 600 }}>
              Name (First, Last)
            </Typography>

            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              name="name"
              autoFocus
              sx={{ mb: 2.5 }}
              value={formData.name}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  name: e.target.value,
                });
              }}
            />

            <Typography component="h5" sx={{ fontWeight: 600, mb: 1 }}>
              Gender
            </Typography>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label"></InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formData?.gender ?? ""}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    gender: e.target.value,
                  });
                }}
              >
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
                <MenuItem value={"Other"}>Other</MenuItem>
                <MenuItem value={"Peaceful"}>Peaceful</MenuItem>
                <MenuItem value={"Gym"}>Gym</MenuItem>
              </Select>
            </FormControl>

            <Typography component="h5" sx={{ fontWeight: 600, mt: 2, mb: 1 }}>
              First Preference
            </Typography>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label"></InputLabel>
              <Select
                autoFocus
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formData?.first_preference ?? ""}
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
                value={formData?.second_preference ?? ""}
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
                value={formData?.third_preference ?? ""}
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
              </Select>
            </FormControl>

            <Typography component="h5" sx={{ fontWeight: 600, mt: 2 }}>
              Max Price (Per Month):
            </Typography>

            <TextField
              margin="normal"
              required
              fullWidth
              id="address"
              name="address"
              sx={{ mb: 2.5 }}
              type="number"
              value={formData.price}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  price: e.target.value,
                });
              }}
            />

            <Typography component="h5" sx={{ fontWeight: 600, mt: 2 }}>
              Most Important Building on Campus to Me:
            </Typography>
            <AddressSearchBar
              formData={formData}
              setFormData={setFormData}
              address={{ label: formData.address }}
              setAddress={setAddress}
              addressValid={addressValid}
              setAddressValid={setAddressValid}
              onAddressChange={handleAddressChange}
            ></AddressSearchBar>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Current Address: {formData.address}
            </Typography>

            <Typography component="h5" sx={{ fontWeight: 600 }}>
              Max Distance from Campus
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
                endAdornment: (
                  <InputAdornment position="end">miles</InputAdornment>
                ),
              }}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  distance: e.target.value,
                });
              }}
            />

            <Button
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              disableElevation
              sx={{ mt: 3, mb: 2, color: "white" }}
            >
              Save Changes
            </Button>
            <Button
              onClick={() => {
                auth.logout();
                navigate("/login");
              }}
              fullWidth
              variant="contained"
              disableElevation
              sx={{ mt: 3, mb: 2, color: "white" }}
            >
              Logout
            </Button>
            <Snackbar
              open={openSnackbar}
              autoHideDuration={3000}
              onClose={handleCloseSnackbar}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <MuiAlert
                onClose={handleCloseSnackbar}
                severity={snackbarSeverity}
              >
                {snackbarMessage}
              </MuiAlert>
            </Snackbar>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default ProfilePage;

import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import InputAdornment from "@mui/material/InputAdornment";
import MenuIcon from "@mui/icons-material/Menu";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { appTheme } from "./Theme.js";
import HiveIcon from "@mui/icons-material/Hive";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import NavBar from "./NavBar.js";

// react.school/material-ui

function ProfilePage() {
  const [formData, setFormData] = useState({});

  function handleSubmit(event) {}

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
            onSubmit={handleSubmit}
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
                value={formData.gender}
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
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              value={formData.price}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  price: e.target.value,
                });
              }}
            />

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
              //onClick={handleNext}
              fullWidth
              variant="contained"
              disableElevation
              sx={{ mt: 3, mb: 2 }}
            >
              Save Changes
            </Button>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default ProfilePage;

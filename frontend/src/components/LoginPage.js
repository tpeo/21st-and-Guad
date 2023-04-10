import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "./ApartmentForm.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import AuthContext from "../contexts/AuthContext";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { appTheme } from "./Theme.js";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

function LoginPage() {
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

  // useEffect will run on first render and any time auth.loggedIn changes
  useEffect(() => {
    // Check if the user is logged in
    if (auth.loggedIn) {
      // If the user is logged in, redirect to the apartment page
      navigate("/dashboard");
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
        navigate("/dashboard");
        setErrorMessage("");
      } catch (error) {
        setErrorMessage(error);
      }
    }
  };

  // Event handler to update the formData state when the input fields change
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <ThemeProvider theme={appTheme}>
      <Grid container component="main" sx={{ height: "100vh", overflow: "hidden" }}>
        <CssBaseline />

        {/* left side */}
        <Link href="/" variant="body2" underline="none">
          <img
            src={process.env.PUBLIC_URL + "/images/logoSplash.png"}
            alt="Logo"
            style={{
              top: 0,
              left: 0,
              height: "100vh",
              width: "35vw",
            }}
          ></img>
        </Link>
        {/* right side */}
        <Grid
          item
          component={Paper}
          sx={{
            borderRadius: 0,
            flexGrow: 1,
            display: "flex",
            width: "50vw",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              my: 12,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              component="form"
              noValidate
              onSubmit={handleLogin}
              sx={{ width: 350, my: 2 }}
            >
              <Typography
                component="h1"
                sx={{
                  fontWeight: appTheme.typography.fontWeightBold,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  fontSize: appTheme.typography.h1.fontSize,
                  mb: 4,
                }}
              >
                Login
              </Typography>

              <Typography component="h5" sx={{ fontWeight: 600, mb: -1.5 }}>
                Email
              </Typography>

              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                name="email"
                autoFocus
                sx={{ mb: 2.5 }}
                value={formData.email}
                onChange={handleChange}
              />

              <Typography component="h5" sx={{ fontWeight: 600, mb: -1.5 }}>
                Password
              </Typography>

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                type="password"
                id="password"
                sx={{ mb: 2.5 }}
                inputProps={{ minLength: 6 }}
                value={formData.password}
                onChange={handleChange}
              />

              <Button
                onClick={handleLogin}
                fullWidth
                variant="contained"
                disableElevation
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
            </Box>

            <Link href="/register" variant="body2" underline="none">
              {"Don't have an account?"}
              <Box fontWeight="700" display="inline" color="#000000">
                {" "}
                Sign up
              </Box>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default LoginPage;

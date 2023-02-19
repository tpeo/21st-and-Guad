import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "./ApartmentForm.css";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import AuthContext from "../contexts/AuthContext";
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {appTheme} from "./Theme.js";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

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
        <Grid container component="main" sx={{ height: '100vh'}}>
          <CssBaseline />

            {/* left side */}
            <Grid item xs={12} sm={6} md={6} sx = {{backgroundColor: appTheme.palette.secondary.main, borderRadius: 0}} component={Paper}>
                <Box item xs
                 sx={{
                    height: 200,
                    my: 12,
                    mx: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: appTheme.palette.primary.main,
                  }}
                  > 
                </Box>
            </Grid>

            {/* right side */}
            <Grid item xs={12} sm={6} md={6} component={Paper} sx={{borderRadius: 0}}>

            <Box
            sx={{
                my: 15,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >

            <Box component="form" noValidate onSubmit={handleLogin} sx={{width: 350, my: 2 }}>

            <Typography component="h1" 
                sx={{fontWeight: appTheme.typography.fontWeightBold, display: 'flex',
                flexDirection: 'column', alignItems: 'center', fontSize: appTheme.typography.h1.fontSize}}>
                  Login
              </Typography>

                {/* implement this later https://developers.google.com/identity/gsi/web/reference/js-reference */}
                <Button type="submit" fullWidth variant="contained" disableElevation
                    sx={{ mt: 3, mb: 2, backgroundColor: appTheme.palette.primary.grey2, color: '#000000'}}
                >
                  Sign in with Google
                </Button>

                <Typography component="h5" sx={{fontWeight: 600, mb: -1.5}}>
                  Email
                </Typography>

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    name="email"
                    autoFocus
                    sx={{mb: 2.5}}

                    value={formData.email}
                    onChange={handleChange}
                />

                <Typography component="h5" sx={{fontWeight: 600,  mb: -1.5}}>
                  Password
                </Typography>

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  type="password"
                  id="password"
                  sx={{mb: 2.5}}
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
                <Box fontWeight='700' display='inline' color='#000000'> Sign up</Box>
            </Link>
            
        </Box>
        </Grid>

     </Grid>
     </ThemeProvider>    
    );

}

export default LoginPage;

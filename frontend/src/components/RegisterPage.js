import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "./ApartmentForm.css";
import BasicInfo from "./BasicInfo";
import AboutInfo from "./AboutInfo";
import PreferencesInfo from "./PreferencesInfo";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import AuthContext from "../contexts/AuthContext";
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {appTheme} from "./Theme.js";


function RegisterPage() {

   const [page, setPage] = useState(0);

   // Use state to manage error messages
   const [errorMessage, setErrorMessage] = useState("");

   // Use the useNavigate hook from react-router to navigate between pages
   const navigate = useNavigate();

   // Use the AuthContext to access the authentication functions (loginUser and createUser)
   const auth = useContext(AuthContext);

   const conditionalComponent = () => {
    switch (page) {
      case 0:
        return <BasicInfo formData={formData} setFormData={setFormData} />;
      case 1:
        return <AboutInfo formData={formData} setFormData={setFormData} />;
       case 2:
         return <PreferencesInfo formData={formData} setFormData={setFormData}/>;
       default:
         return <BasicInfo formData={formData} setFormData={setFormData}/>;
    }
  }; 


  //move on to next page
  function handleNext () {
    setPage(page + 1);
    console.log(formData);
  };

  function handleSubmit (event) {
    event.preventDefault();
    console.log(formData);
    if (!formData.email || !formData.password) {
      setErrorMessage("All fields are required.");
    } else {
      try {
        auth.createUser(formData.email, formData.password);
        createProfile();
        navigate("/dashboard");
        setErrorMessage("");
      } catch (error) {
        setErrorMessage(error);
      }
    }
  };

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    gender: '',
    first_preference: '',
    second_preference: '',
    third_preference: '',
    price: 0,
    distance: 0,
  });

  //create profile
  async function createProfile() {
    await fetch(`https://${process.env.REACT_APP_HOSTNAME}/profiles`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        //Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFiYzEyMyIsImVtYWlsIjoiYWJjMTIzQGdtYWlsLmNvbSJ9.kVAp_XhgpFH3Iyl9cnRGUjRFYiBGuRuyYAztbNcRVLs"
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({  
        email: formData.email,
        name: formData.name,
        gender: formData.gender,
        first_preference: formData.first_preference,
        second_preference: formData.second_preference,
        third_preference: formData.third_preference,
        price: formData.price,
        distance: formData.distance,
      }) 
    })
    .then(resp => resp.json())
    .then(json => console.log(json))
    .catch((err) => {
        console.log(err);
      });
  }

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

            <Box component="form" noValidate onSubmit={handleSubmit} sx={{width: 350, my: 2 }}>
                {conditionalComponent()}
                { page === 2 && 
                <Button
                    onClick={handleSubmit}
                    fullWidth
                    variant="contained"
                    disableElevation
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Submit
                </Button>}

                { page < 2 && 
                <Button
                    onClick={handleNext}
                    fullWidth
                    variant="contained"
                    disableElevation
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Next
                </Button>
                }

                {page > 0 && <Button onClick={() => setPage(page - 1)}>Back</Button>}
            </Box>

            { page === 0 && 
                <Link href="/login" variant="body2" underline="none">
                    {"Already have an account?"} 
                    <Box fontWeight='700' display='inline' color='#000000'> Sign in</Box>
                </Link>
            }
        </Box>
        </Grid>

     </Grid>
     </ThemeProvider>

  );
}

export default RegisterPage;

import React, { useState, useContext } from "react";
import {
    AppBar,
    Select,
    Typography,
    CssBaseline,
    Container,
    InputLabel,
    IconButton,
    MenuItem,
    FormControl,
    Paper,
    TextField,
    Toolbar,
    Avatar,
    Button,
    Box,
    Grid,
    InputAdornment,
} from "@mui/material";

import { ThemeProvider } from "@mui/material/styles";
import { useNavigate, Link } from "react-router-dom";

import { appTheme } from "./Theme.js";
import NavBar from "./NavBar.js";
import AuthContext from "../contexts/AuthContext.js";
import FrontNavBar from "./FrontNavBar.js";

// react.school/material-ui

function HomePage() {
    const [formData, setFormData] = useState({});

    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    function handleSubmit(event) { }

    return (
        <ThemeProvider theme={appTheme}>
            <AppBar elevation={0} position="fixed">
                <Container maxWidth="xl" sx={{ backgroundColor: '#ffffff' }}>
                    <Toolbar disableGutters>
                        <img src={process.env.PUBLIC_URL + "/images/logoYellow.png"} alt="Logo" style={{ width: "120px", height: "50px" }}></img>
                        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, ml: 8, height: 65 }}>
                            <Button onClick ={() => window.location.replace("#overview")}
                                sx={{
                                    mt: 1.5, color: '#000000', display: "block", justifyContent: "left", fontSize: 17, mr: 3, fontWeight: 500,
                                    '&:hover': {
                                        fontWeight: 700
                                    },
                                }}
                            >
                                Overview
                            </Button>

                            <Button onClick ={() => window.location.replace("#features")}
                                sx={{
                                    mt: 1.5, color: '#000000', display: "block", justifyContent: "left", fontSize: 17, mr: 3, fontWeight: 500,
                                    '&:hover': {
                                        fontWeight: 700
                                    },
                                }}
                            >
                                Features
                            </Button>
                        </Box>

                        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, ml: 8, height: 65, justifyContent: "right"}}>
                            <Button component={Link} to="/login"
                                sx={{
                                    mt: 1.5, color: '#000000', display: "block", justifyContent: "right", fontSize: 17, mr: 3, fontWeight: 500,
                                    '&:hover': {
                                        fontWeight: 700
                                    },
                                }}
                            >
                                Sign In
                            </Button>

                            <Button component={Link} to="/register"
                                width="200"
                                variant="contained"
                                disableElevation
                                sx={{ mt: 1.5, color: 'white', fontSize: 17 }}>
                                Join Hively!
                            </Button>
                        </Box>

                    </Toolbar>
                </Container>
            </AppBar>


            <div id="overview">
                <Grid container component="main" sx={{ height: "100vh" }}>
                    <CssBaseline />
                    <Grid
                        item
                        sx={{
                            borderRadius: 0,
                            flexGrow: 1,
                            display: "flex",
                            width: "35vw",
                        }}
                    >

                        <Grid container direction="row" sx={{ ml: 15, mt: 35 }}>
                            <Grid item>
                                <Typography sx={{ fontSize: 40, fontWeight: 500 }}>Find your</Typography>
                            </Grid>
                            <Grid item sx={{ ml: 1.5, mt: -1 }}>
                                <img
                                    src={process.env.PUBLIC_URL + "/images/logoShort.svg"}
                                    alt="Logo"
                                    style={{
                                        top: 0,
                                        left: 0,
                                        width: 120
                                    }}
                                ></img>
                            </Grid>

                            <Typography sx={{ fontSize: 25, fontWeight: 500, mt: -21 }}>Simplify the college housing process and collaborate to find your ideal home</Typography>
                        </Grid>
                    </Grid>

                    <Grid
                        item
                        sx={{
                            borderRadius: 0,
                            flexGrow: 1,
                            display: "flex",
                            width: "50vw",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <img
                            src={process.env.PUBLIC_URL + "/images/findHive.svg"}
                            alt="Logo"
                            style={{
                                top: 0,
                                left: 0,
                                height: 500
                            }}
                        ></img>
                    </Grid>
                </Grid>
            </div>

            <div id="features">
            <Grid container component="main" sx={{ height: "100vh", backgroundImage: `url(${process.env.PUBLIC_URL + "/images/honeycomb1.svg"})`, backgroundSize: 'cover' }}>
                <CssBaseline />
                <Grid
                    item
                    sx={{
                        borderRadius: 0,
                        flexGrow: 1,
                        display: "flex",
                        width: "50vw",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <img
                        src={process.env.PUBLIC_URL + "/images/dashboardPic.svg"}
                        alt="Logo"
                        style={{
                            top: 0,
                            left: 0,
                            height: 500
                        }}
                    ></img>
                </Grid>


                <Grid
                    item
                    sx={{
                        borderRadius: 0,
                        flexGrow: 1,
                        display: "flex",
                        width: "35vw",
                    }}
                >
                    <Grid container direction="row" sx={{ ml: 0, mt: 30 }}>
                        <Grid item>
                            <Typography sx={{ fontSize: 40, fontWeight: 500 }}>Dashboard</Typography>
                        </Grid>

                        <Typography sx={{ fontSize: 25, fontWeight: 500, mt: -21, width: 450 }}>Collect, view, and collaborate on research</Typography>
                    </Grid>
                </Grid>
            </Grid>
            </div>


            <Grid container component="main" sx={{ height: "100vh", backgroundImage: `url(${process.env.PUBLIC_URL + "/images/honeycomb2.svg"})`, backgroundSize: 'cover' }}>
                <CssBaseline />
                <Grid
                    item
                    sx={{
                        borderRadius: 0,
                        flexGrow: 1,
                        display: "flex",
                        width: "35vw",
                    }}
                >
                    <Grid container direction="row" sx={{ ml: 15, mt: 30, justifyContent: 'right', alignItems: "right" }}>

                        <Grid item>
                            <Typography sx={{ fontSize: 40, fontWeight: 500, textAlign: 'right' }}>Map</Typography>
                        </Grid>

                        <Typography sx={{ fontSize: 25, fontWeight: 500, mt: -21, textAlign: 'right', width: 440 }}>Plot your housing options to visualize your commute</Typography>
                    </Grid>
                </Grid>

                <Grid
                    item
                    sx={{
                        borderRadius: 0,
                        flexGrow: 1,
                        display: "flex",
                        width: "50vw",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <img
                        src={process.env.PUBLIC_URL + "/images/mapPic.svg"}
                        alt="Logo"
                        style={{
                            top: 0,
                            left: 0,
                            height: 450
                        }}
                    ></img>
                </Grid>
            </Grid>


            <Grid container component="main" sx={{ height: "100vh", backgroundImage: `url(${process.env.PUBLIC_URL + "/images/honeycomb3.svg"})`, backgroundSize: 'cover' }}>
                <CssBaseline />
                <Grid
                    item
                    sx={{
                        borderRadius: 0,
                        flexGrow: 1,
                        display: "flex",
                        width: "50vw",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <img
                        src={process.env.PUBLIC_URL + "/images/meetingsPic.svg"}
                        alt="Logo"
                        style={{
                            top: 0,
                            left: 0,
                            height: 450
                        }}
                    ></img>
                </Grid>

                <Grid
                    item
                    sx={{
                        borderRadius: 0,
                        flexGrow: 1,
                        display: "flex",
                        width: "35vw",
                    }}
                >
                    <Grid container direction="row" sx={{ ml: 0, mt: 30 }}>
                        <Grid item>
                            <Typography sx={{ fontSize: 40, fontWeight: 500 }}>Meetings</Typography>
                        </Grid>

                        <Typography sx={{ fontSize: 25, fontWeight: 500, mt: -21, width: 450 }}>Plan your next tour or meeting with an in-house planner</Typography>
                    </Grid>
                </Grid>
            </Grid>




        </ThemeProvider>
    );
}

export default HomePage;

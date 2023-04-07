import React, { useState } from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {appTheme} from "./Theme.js";
import HiveIcon from '@mui/icons-material/Hive';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

function FrontNavBar() {
    return (
        <ThemeProvider theme={appTheme}>
          <AppBar elevation={0} position="fixed">
            <Container maxWidth="xl" sx={{backgroundColor: '#ffffff'}}>
              <Toolbar disableGutters>
                <img src={process.env.PUBLIC_URL + "/images/logoYellow.png"} alt="Logo" style={{ width: "120px", height: "50px" }}></img>
                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, ml: 8, height: 65}}>
                    <Button component={Link} to="/"
                      //onClick={handleCloseNavMenu}
                      sx={{ mt: 1.5, color: '#000000', display: "block", justifyContent: "left", fontSize: 17, mr: 3, fontWeight: 500, 
                      '&:hover': {
                        fontWeight: 700
                       }, }}
                    >
                      Overview
                    </Button> 
    
                    <Button component={Link} to="/map"
                      //onClick={handleCloseNavMenu}
                      sx={{ mt: 1.5, color: '#000000', display: "block", justifyContent: "left", fontSize: 17, mr: 3, fontWeight: 500, 
                      '&:hover': {
                        fontWeight: 700
                       }, }}
                    >
                      Features
                    </Button>
                </Box>

                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, ml: 8, height: 65, justifyContent: "right",}}>
                    <Button component={Link} to="/register"
                      //onClick={handleCloseNavMenu}
                      sx={{ mt: 1.5, color: '#000000', display: "block", justifyContent: "right", fontSize: 17, mr: 3, fontWeight: 500, 
                      '&:hover': {
                        fontWeight: 700
                       }, }}
                    >
                      Sign In
                    </Button>

                    <Button   
                    width="200"
                    variant="contained"
                    disableElevation
                    sx={{ mt: 1.5, color: 'white', fontSize: 17}}>
                        Join Hively!
                    </Button>
                </Box>
              </Toolbar>
            </Container>
          </AppBar>
        </ThemeProvider>
      );
}

export default FrontNavBar;

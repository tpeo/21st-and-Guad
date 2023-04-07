import React, { useState } from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import AdbIcon from "@mui/icons-material/Adb";
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {appTheme} from "./Theme.js";
import HiveIcon from '@mui/icons-material/Hive';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

function NavBar() {
    return (
      <ThemeProvider theme={appTheme}>
          <AppBar elevation={0} position="static">
            <Container maxWidth="xl">
              <Toolbar disableGutters>
                <img src={process.env.PUBLIC_URL + "/images/logo.png"} alt="Logo" style={{ width: "120px", height: "50px" }}></img>
                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent: "right", mr: 5,  ml: 8, height: 65 }}>
                  
                    <Button component={Link} to="/dashboard"
                      //onClick={handleCloseNavMenu}
                      sx={{
                        mt: 1.5, color: '#000000', display: "block", justifyContent: "left", fontSize: 17, mr: 3, fontWeight: 500,
                        '&:hover': {
                            fontWeight: 700
                        },
                      }}
                    >
                      Dashboard
                    </Button> 
    
                    <Button component={Link} to="/map"
                      //onClick={handleCloseNavMenu}
                      sx={{
                        mt: 1.5, color: '#000000', display: "block", justifyContent: "left", fontSize: 17, mr: 3, fontWeight: 500,
                        '&:hover': {
                            fontWeight: 700
                        },
                      }}
                    >
                      Map
                    </Button>
    
                    <Button component={Link} to="/meeting"
                      //onClick={handleCloseNavMenu}
                      sx={{
                        mt: 1.5, color: '#000000', display: "block", justifyContent: "left", fontSize: 17, mr: 3, fontWeight: 500,
                        '&:hover': {
                            fontWeight: 700
                        },
                      }}
                    >
                      Meetings
                    </Button>
              
                </Box>
    
                <Tooltip title="User Profile">
                  {/* <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}> */}
                  <IconButton component={Link} to="/profile" sx={{ p: 0 }}>
                    <Avatar />
                  </IconButton>
                </Tooltip>
    
              </Toolbar>
            </Container>
          </AppBar>

        </ThemeProvider>
      );
}

export default NavBar;

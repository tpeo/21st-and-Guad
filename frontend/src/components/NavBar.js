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
        
          <AppBar elevation={0} position="static">
            <Container maxWidth="xl">
              <Toolbar disableGutters>
                
                <HiveIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
    
                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent: "right", mr: 5,}}>
                  
                    <Button component={Link} to="/dashboard"
                      //onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      Dashboard
                    </Button> 
    
                    <Button component={Link} to="/map"
                      //onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      Map
                    </Button>
    
                    <Button component={Link} to="/meeting"
                      //onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "white", display: "block" }}
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
      );
}

export default NavBar;

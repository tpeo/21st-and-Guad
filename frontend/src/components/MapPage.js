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
import MenuIcon from '@mui/icons-material/Menu';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {appTheme} from "./Theme.js";
import HiveIcon from '@mui/icons-material/Hive';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import NavBar from "./NavBar.js";

// react.school/material-ui


function MapPage() {
 
  return (
    <ThemeProvider theme={appTheme}>
        <NavBar></NavBar>  
        map

    </ThemeProvider>
  
  );
}

export default MapPage;



  

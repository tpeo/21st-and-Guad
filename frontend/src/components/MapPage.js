import React, {  } from "react";
import { ThemeProvider } from '@mui/material/styles';
import {appTheme} from "./Theme.js";
import NavBar from "./NavBar.js";
import MapComponent from "./maps/MapComponent.js";

// react.school/material-ui

function MapPage() {
 
  return (
    <ThemeProvider theme={appTheme}>
        <NavBar></NavBar>  
        <MapComponent apiKey={process.env.REACT_APP_MAPS_API_KEY}></MapComponent>
    </ThemeProvider>
  );
}

export default MapPage;



  

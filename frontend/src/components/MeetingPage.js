import React, { useState } from "react";
import { ThemeProvider } from "@mui/material";
import { appTheme, AmenitiesIcon } from "./Theme";
import NavBar from "./NavBar";

function MeetingPage() {
  return (
    <ThemeProvider theme={appTheme}>
      <NavBar></NavBar>
      {/* meeting */} 
      Meeting
      <AmenitiesIcon iconName="Wifi" onClick={() => {console.log("button was clicked")}}></AmenitiesIcon>
      <AmenitiesIcon iconName="Dumbbell" size="small"></AmenitiesIcon>
      <AmenitiesIcon iconName="Trash" active="true" size="small"></AmenitiesIcon>
      <AmenitiesIcon iconName="Calendar" active="true"></AmenitiesIcon>
    </ThemeProvider>
  );
}

export default MeetingPage;

import React, { useState } from "react";
import { ThemeProvider, Box, Grid } from "@mui/material";
import { appTheme, AmenitiesIcon } from "./Theme";
import NavBar from "./NavBar";
import * as constants from "../utils/constants";

function MeetingPage() {
  const AMENITIES_ARRAY = constants.AMENITIES_ARRAY;

  return (
    <ThemeProvider theme={appTheme}>
      <NavBar />
      {/* meeting */}
      Meeting
      <AmenitiesIcon
        iconName="Wifi"
        onClick={() => {
          console.log("button was clicked");
        }}
      />
      <AmenitiesIcon iconName="Gym" size="small" />
      <AmenitiesIcon iconName="Trash" active="true" size="small" />
      <AmenitiesIcon iconName="Calendar" active="true" />
        Icon Playground:
      <Grid container spacing={2}>
        {AMENITIES_ARRAY.map((iconName, index) => (
          <Grid item xs={2} key={index}>
            <Box p={1}>
              <AmenitiesIcon
                iconName={iconName}
                onClick={() => {
                  console.log("button was clicked");
                }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </ThemeProvider>
  );
}

export default MeetingPage;

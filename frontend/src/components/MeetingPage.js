import React, { useState } from "react";
import NavBar from "./NavBar";
import * as constants from "../utils/constants";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Select,
  Typography,
  IconButton,
  MenuItem,
  FormControl,
  Avatar,
  Box,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Slider,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Modal,
  Rating,
  Tab,
  Tabs,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  Zoom,
} from "@mui/material";

import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { appTheme, AmenitiesIcon} from "./Theme.js";



function MeetingPage() {
  const AMENITIES_ARRAY = constants.AMENITIES_ARRAY;

  return (
    <ThemeProvider theme={appTheme}>
      <NavBar />
      {/* meeting */}
      Meeting
      {/* <AmenitiesIcon
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
      </Grid> */}

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs centered  aria-label="basic tabs example">
          <Tab label="Item One"  />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
        </Tabs>
      </Box>
    

    </ThemeProvider>
  );
}

export default MeetingPage;

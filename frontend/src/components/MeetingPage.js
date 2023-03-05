import React, { useState } from "react";
import { ThemeProvider } from "@mui/material";
import { appTheme } from "./Theme";
import NavBar from "./NavBar";

function MeetingPage() {
  return (
    <ThemeProvider theme={appTheme}>
      <NavBar></NavBar>
      {/* meeting */}
      Meeting
    </ThemeProvider>
  );
}

export default MeetingPage;

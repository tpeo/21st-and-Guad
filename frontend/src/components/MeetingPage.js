import React, { useState } from "react";
import { ThemeProvider } from "@mui/material";
import { appTheme } from "./Theme";
import NavBar from "./NavBar";
import HousingDialogHandler from "./cards/HousingDialogHandler";

function MeetingPage() {
  return (
    <ThemeProvider theme={appTheme}>
      <NavBar></NavBar>
      {/* meeting */}
      <HousingDialogHandler></HousingDialogHandler>
    </ThemeProvider>
  );
}

export default MeetingPage;

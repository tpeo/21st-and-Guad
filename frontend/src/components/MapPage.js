import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { appTheme } from "./Theme.js";
import NavBar from "./NavBar.js";
import MapComponent from "./maps/MapComponent.js";
import { Box } from "@mui/system";

// react.school/material-ui

function MapPage() {
  return (
    <ThemeProvider theme={appTheme}>
      <Box display="flex" flexDirection="column" style={{ height: "100vh" }}>
        <Box>
          <NavBar></NavBar>
        </Box>
        <Box flexGrow={1}>
          <MapComponent
            apiKey={process.env.REACT_APP_MAPS_API_KEY}
          ></MapComponent>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default MapPage;

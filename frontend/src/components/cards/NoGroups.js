import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { appTheme } from "../Theme.js";

function NoGroups(props) {
  //if you are in this component, groupID inside window.localStorage is 'null'
  return (
    <ThemeProvider theme={appTheme}>
      <Box
        display="flex"
        height="80vh"
        alignItems="center"
        justifyContent="center"
      >
        <Box textAlign="center">
          <Box padding="10px">
            <img
              src={process.env.PUBLIC_URL + "/images/logoYellow.png"}
              alt="Logo"
              style={{
                width: "60%",
              }}
            />
          </Box>
          <Typography
            variant="h4"
            component="h1"
            fontWeight={"bold"}
            padding="6px"
          >
            Welcome!
          </Typography>
          <Typography fontSize={"large"}>
            To join a hive, get a link from a friend or
          </Typography>
          <Typography fontSize={"large"} paddingBottom="10px">
            click the button below to create your own hive and invite friends!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={props.createGroup}
            style={{
              height: "30px",
              width: "300px",
              marginTop: "20px",
              color: "white",
            }}
          >
            Create Your Own Hive
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default NoGroups;

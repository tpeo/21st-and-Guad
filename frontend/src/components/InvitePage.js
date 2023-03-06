import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { appTheme } from "./Theme.js";
import { Box, Button, Typography } from "@mui/material";
import { margin } from "@mui/system";

function InvitePage() {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const groupID = queryParams.get("groupID");
  const userID = queryParams.get("userID");

  return (
    <ThemeProvider theme={appTheme}>
      <Box
        height="100vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        bgcolor={appTheme.palette.primary.main}
      >
        <img
          src={process.env.PUBLIC_URL + "/images/logo.png"}
          alt="Logo"
          style={{ width: "263px", height: "109px", position: "absolute", top: "0", left: "0", margin: "20px", zIndex: "1" }}
        ></img>
        <img
          src={process.env.PUBLIC_URL + "/images/HoneyComb.png"}
          alt="HoneyComb"
          style={{width: "40vw", height: "70vh", position: "fixed", bottom: "0", left: "0"}}
        ></img>
        <Box
          width="40vw"
          minHeight="60vh"
          borderRadius="0"
          marginTop={"20vh"}
          boxShadow={3}
          p={4}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          bgcolor={appTheme.palette.primary.light}
        >
          <Box mb={4}>
            {/* Replace this with your group photo icon */}
            <img src="https://via.placeholder.com/150" alt="Group Photo" />
          </Box>
          <Typography
            fontWeight={600}
            fontSize={20}
            align="center"
            gutterBottom
          >
            {userID} invited you to join their hive!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ color: "white" }}
          >
            Click to join hive
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default InvitePage;

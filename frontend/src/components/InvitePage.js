import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { appTheme } from "./Theme.js";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import AuthContext from "../contexts/AuthContext";


function InvitePage() {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const groupID = queryParams.get("groupID");
  const userID = queryParams.get("userID");
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [groupData, setGroupData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const response = await fetch(
          `http://${process.env.REACT_APP_HOSTNAME}/groups/${groupID}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Group not found");
        }

        const groupData = await response.json();
        setGroupData(groupData);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchGroupData().catch((error) => {
      console.error(error);
    });
  }, [groupID]);

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
          style={{
            width: "263px",
            height: "109px",
            position: "absolute",
            top: "0",
            left: "0",
            margin: "20px",
            zIndex: "1",
          }}
        ></img>
        <img
          src={process.env.PUBLIC_URL + "/images/HoneyComb.png"}
          alt="HoneyComb"
          style={{
            width: "40vw",
            height: "70vh",
            position: "fixed",
            bottom: "0",
            left: "0",
          }}
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
          {/* conditional based on valid group and user IDs */}
          {loading ? (
            <CircularProgress />
          ) : groupData ? (
            <>
              <Box mb={4}>
                {/* Replace this with your group photo icon */}
                <img src="https://via.placeholder.com/150" alt="Group" />
              </Box>
              <Typography
                fontWeight={600}
                fontSize={20}
                align="center"
                gutterBottom
              >
                {userID} invited you to join their hive!
              </Typography>
              {auth.loggedIn ? (
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  style={{ color: "white" }}
                  onClick={() => navigate("/dashboard")}
                >
                  Click to join hive
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  style={{ color: "white" }}
                  onClick={() => navigate("/login")}
                >
                  Create an account to join
                </Button>
              )}
            </>
          ) : (
            <Typography
              fontWeight={600}
              fontSize={20}
              align="center"
              gutterBottom
            >
              Group not found
            </Typography>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default InvitePage;

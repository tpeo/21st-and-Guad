import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { appTheme } from "./Theme.js";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
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
  const [senderName, setSenderName] = useState(null);

  // runs on page load to fetch group data and sender name
  useEffect(() => {
    // fetch group data from backend and set state
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

    // fetch sender name from backend and set state
    const fetchSenderName = async () => {
      try {
        const response = await fetch(
          `http://${process.env.REACT_APP_HOSTNAME}/profiles/${userID}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Profile not found");
        }

        const profileData = await response.json();
        setSenderName(profileData.name);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSenderName().catch((error) => {
      console.error(error);
    });
  }, [groupID, userID]);

  // handle join group button click
  const handleJoinGroup = async () => {
    try {
      const response = await fetch(
        `http://${process.env.REACT_APP_HOSTNAME}/groups/addUser`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            //Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify({
            userId: window.localStorage.getItem("userID"),
            groupId: groupID,
          }),
        }
      );

      // if user is already in group, display snackbar message, navigate to dashboard
      if (!response.ok) {
        const error = await response.text();
        if (error === "User already in this group") {
          setSnackbarSeverity("warning");
          setSnackbarMessage(
            "You are already a member of this group! Redirecting to dashboard..."
          );
          setOpenSnackbar(true);
        } else if (error === "User is already in a group") {
          setSnackbarSeverity("error");
          setSnackbarMessage(
            "You cannnot be in more than one group! Redirecting to dashboard..."
          );
          setOpenSnackbar(true);
        } else {
          throw new Error(error);
        }
      } else {
        setSnackbarSeverity("success");
        setSnackbarMessage(
          "You have successfully joined the group! Redirecting to dashboard..."
        );
        setOpenSnackbar(true);
      }
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000); // wait 3 seconds before navigating
    } catch (error) {
      console.error(error);
    }
  };

  // snackbar state and handlers
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("warning");
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

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
        <Link to="/"><img
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
        ></img></Link>
        
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
          ) : groupData && senderName ? (
            <>
              <Box mb={4}>
                <img
                  src={process.env.PUBLIC_URL + "/images/HiveIconWhite.png"}
                  alt="Group"
                  style={{ width: "90px", height: "80px" }}
                />
              </Box>
              <Typography
                fontWeight={600}
                fontSize={20}
                align="center"
                gutterBottom
              >
                {senderName} invited you to join their hive!
              </Typography>
              {auth.loggedIn ? (
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  style={{ color: "white" }}
                  onClick={() => handleJoinGroup()}
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
              Group not found :( Please check your invite link.
            </Typography>
          )}
        </Box>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <MuiAlert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}

export default InvitePage;

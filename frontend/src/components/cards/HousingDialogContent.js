import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Toolbar,
  Box,
  Container,
  AppBar,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ThemeProvider } from "@emotion/react";
import { appTheme } from "../Theme";

function HousingDialogContent({ onSubmit, onClose }) {
  const [propertyName, setPropertyName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const housingCardData = { propertyName, address, phoneNumber };
    onSubmit(housingCardData);
  };

  return (
    <ThemeProvider theme={appTheme}>
      <Box sx={{ mt: 5, width: "60vw" }}>
        <Toolbar
          position="sticky"
          sx={{
            backgroundColor: appTheme.palette.secondary.main,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "9vh",
            display: "flex", // use flexbox to align the text and icon
            alignItems: "center",
            justifyContent: "space-between", // space the items in the toolbar
          }}
        >
          <IconButton
            edge="start"
            sx={{ color: "white" }}
            onClick={() => onClose()}
          >
            <ArrowBackIcon sx={{ color: "white" }} />
          </IconButton>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ color: "white", flex: 1, textAlign: "center" }}
          >
            Create a New Housing Card
          </Typography>
        </Toolbar>

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Box>
              <Typography
                component="h5"
                sx={{
                  fontWeight: appTheme.typography.fontWeightBold,
                  mt: 4,
                  fontSize: appTheme.typography.fontSize,
                }}
              >
                Property Name
              </Typography>
              <TextField
                id="property-name"
                value={propertyName}
                onChange={(event) => setPropertyName(event.target.value)}
                autoFocus
                fullWidth
                required
                sx={{ width: "55%", fontSize: "1rem" }}
              />
            </Box>
            <Box>
              <Typography
                component="h5"
                sx={{
                  fontWeight: appTheme.typography.fontWeightBold,
                  fontSize: appTheme.typography.fontSize,
                }}
              >
                Address
              </Typography>
              <TextField
                id="address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                autoFocus
                fullWidth
                required
                sx={{ width: "55%", fontSize: "1rem", size:"small"}}
              />
            </Box>
            <Box>
              <Typography
                component="h5"
                sx={{
                  fontWeight: appTheme.typography.fontWeightBold,
                  fontSize: appTheme.typography.fontSize,
                }}
              >
                Phone Number
              </Typography>
              <TextField
                id="phone-number"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
                fullWidth
                required
                sx={{ width: "40%", fontSize: "1rem" }}
              />
            </Box>
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </ThemeProvider>
  );
}

export default HousingDialogContent;

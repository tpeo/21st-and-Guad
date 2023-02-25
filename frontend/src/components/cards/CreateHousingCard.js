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

function CreateHousingCard({ onSubmit, onClose }) {
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
    <Container maxWidth="lg" sx={{ mt: 10 }}>
        <Toolbar position="sticky" sx={{ backgroundColor:appTheme.palette.secondary.main, position: 'absolute', top: 0, left: 0, right: 0}}>
          <IconButton edge="start" color="inherit" onClick={() => onClose()}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" align="center" sx={{ flexGrow: 1 }}>
            Create a new Housing Card
          </Typography>
        </Toolbar>

      <Box marginTop="16px">
        <form onSubmit={handleSubmit}>
          <TextField
            id="property-name"
            label="Property Name"
            value={propertyName}
            onChange={(event) => setPropertyName(event.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            id="address"
            label="Address"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            id="phone-number"
            label="Phone Number"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
            fullWidth
            margin="normal"
            required
          />
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
    </Container>
    </ThemeProvider>
  );
}

export default CreateHousingCard;

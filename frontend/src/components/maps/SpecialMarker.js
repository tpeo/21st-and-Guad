import React, { useState } from "react";
import PushPinIcon from "@mui/icons-material/PushPin";
import { Typography, Box } from "@mui/material";

const SpecialMarker = ({ lat, lng, specialLocation }) => {
  const [showBox, setShowBox] = useState(false);

  const handleClick = () => {
    setShowBox(!showBox);
  };

  return (
    <>
      <PushPinIcon fontSize="large" onClick={handleClick} />
      {showBox && (
        <Box
          style={{
            position: "absolute",
            top: "0rem",
            left: "2rem",
            width: "8rem",
            height: "auto",
            backgroundColor: "white",
            padding: "1rem",
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
            zIndex: 100,
          }}
        >
          <Typography
            sx={{
              marginTop: "0rem",
              fontWeight: 700,
              fontSize: 15,
            }}
          >
            This is your important location.
          </Typography>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: 12,
              marginTop: "0.5rem",
            }}
          >
            {window.localStorage.getItem("address")}
          </Typography>
        </Box>
      )}
    </>
  );
};

export default SpecialMarker;

import React, { useState } from "react";
import RoomIcon from '@mui/icons-material/Room';
import { Typography, Box } from "@mui/material";

function ApartmentMarker(props) {
  const [selectedApartment, setSelectedApartment] = useState(null);

  const handleClick = () => {
    if (selectedApartment && selectedApartment.id === props.data.id) {
      setSelectedApartment(null);
    } else {
      setSelectedApartment(props.data);
    }
  };

  return (
    <Box style={{ position: "absolute", left: "50%" }}>
      {props.lat && props.lng && (
        <div
          id={`marker-${props.data.id}`}
          style={{ position: "absolute", transform: "translate(-50%, -100%)" }}
          onClick={handleClick}
        >
          <RoomIcon fontSize="large" />
          {selectedApartment && selectedApartment.id === props.data.id && (
            <Box
              style={{
                position: "absolute",
                top: "50%",
                left: `calc(${props.left}px + 1rem)`,
                width: "20rem",
                height: "10rem",
                backgroundColor: "white",
                padding: "1rem",
                boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 25,
                }}
              >
                {props.data.name}
              </Typography>
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: 15,
                }}
              >
                {props.data.address}
              </Typography>
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: 15,
                }}
              >
                {props.data.phone_number}
              </Typography>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 15,
                  marginTop: "0.5rem",
                }}
              >
                Distance from you: 
              </Typography>
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: 15,
                }}
              >
                {props.data.distance} miles
              </Typography>
            </Box>
          )}
        </div>
      )}
    </Box>
  );
}

export default ApartmentMarker;

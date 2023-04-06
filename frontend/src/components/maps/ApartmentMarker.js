import React, { useState } from "react";
import RoomIcon from "@mui/icons-material/Room";
import { Typography, Box } from "@mui/material";

function ApartmentMarker(props) {
  const [selectedApartment, setSelectedApartment] = useState(null);

  const handleClick = () => {
    if (selectedApartment && (selectedApartment.id === props.data.id)) {
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
                top: "-8rem",
                left: "2rem",
                width: "20rem",
                height: "auto",
                backgroundColor: "white",
                padding: "1rem",
                boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
                zIndex: 100,
              }}
            >
              <Box>
                <iframe
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  src={`https://www.google.com/maps/embed/v1/streetview?key=${process.env.REACT_APP_MAPS_API_KEY}&location=${props.lat},${props.lng}&heading=210&pitch=0`}
                ></iframe>
              </Box>
              <Typography
                sx={{
                  marginTop: "0.5rem",
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
                Distance from {window.localStorage.getItem("address")}:
              </Typography>
              <Typography
                variant="body1"
                mt={1}
                sx={{
                  fontWeight: 400,
                  fontSize: 15,
                  width: "fit-content",
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  padding: "5px 10px",
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

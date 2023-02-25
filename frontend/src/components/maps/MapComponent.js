import { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import mapStyles from "./mapStyles";
import { Box } from "@mui/system";
import { Button, Grid, Icon } from "@mui/material";
import PersonPinCircleRoundedIcon from "@mui/icons-material/PersonPinCircleRounded";

//custom marker for anything on the map. can be duplicated or edited later
const Marker = ({ text }) => (
  <PersonPinCircleRoundedIcon
    fontSize="large"
  ></PersonPinCircleRoundedIcon>
);

//constant UT Tower Lat/Long for default location
const UT_TOWER_COORDS = { lat: 30.28622889164585, lng: -97.73936994834247 };

function MapComponent({ apiKey }) {
  const [center, setCenter] = useState({
    lat: UT_TOWER_COORDS.lat,
    lng: UT_TOWER_COORDS.lng,
  });
  const [zoom, setZoom] = useState(16);
  const [userLocation, setUserLocation] = useState(null);
  //used to reset the map if it has been panned/zoomed
  const [clicked, setClicked] = useState(false);


  useEffect(() => {
    if (clicked) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter({ lat: latitude, lng: longitude });
          setZoom(18);
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => console.log(error),
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    }
  }, [clicked]);

  const getCurrentLocation = () => {
    setClicked(true);
  };

  return (
    <Box style={{ height: "100%", width: "100%", position: "relative" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey }}
        center={center}
        zoom={zoom}
        options={{ styles: mapStyles }}
        style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }}
        onChange={({ center, zoom }) => {
          setClicked(false);
          setCenter(center);
          setZoom(zoom);
        }}
      >
        {userLocation && (
          <Marker
            lat={userLocation.lat}
            lng={userLocation.lng}
            text="My Marker"
          />
        )}
      </GoogleMapReact>
      <Button
        variant="contained"
        onClick={getCurrentLocation}
        style={{
          position: "absolute",
          bottom: 16,
          left: 16,
          zIndex: 1,
        }}
      >
        Get Current Location
      </Button>
    </Box>
  );
}

export default MapComponent;

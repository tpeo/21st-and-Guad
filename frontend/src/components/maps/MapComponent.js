import { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import mapStyles from './mapStyles';
import { Box } from '@mui/system';
import { Button } from '@mui/material';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

function MapComponent({ apiKey }) {
  const [center, setCenter] = useState({ lat: 30.28622889164585, lng: -97.73936994834247 });
  const [zoom, setZoom] = useState(16);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (clicked) {
      console.log("starting locating")
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setCenter({ lat: latitude, lng: longitude });
          setZoom(16);
          setClicked(false); // Reset clicked to false
        },
        error => console.log(error),
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    }
  }, [clicked]);

  const getCurrentLocation = () => {
    setClicked(true);
  }

  const resetMap = () => {
    setCenter({ lat: 30.28622889164585, lng: -97.73936994834247 });
    setZoom(16);
  }

  return (
    <Box style={{ height: "80vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey} }
        center={center}
        zoom={zoom}
        options={{ styles: mapStyles }}
        onClick={resetMap}
      >
        {/* {<AnyReactComponent lat={center.lat} lng={center.lng} text="You are here" />} */}
      </GoogleMapReact>
      <Button onClick={getCurrentLocation}>Get Current Location</Button>
    </Box>
  );
}

export default MapComponent;
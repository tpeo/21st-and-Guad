import { useState, useEffect, useRef } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "google-map-react";
import mapStyles from "./mapStyles";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import ApartmentMarker from "./ApartmentMarker";
import SpecialMarker from "./SpecialMarker";

//constant UT Tower Lat/Long for default location
const UT_TOWER_COORDS = { lat: 30.28622889164585, lng: -97.73936994834247 };


function MapComponent({ apiKey }) {
  // Retrieve localData from window.localStorage and parse the JSON string back to an object
  const [apartmentData, setApartmentData] = useState(
    JSON.parse(window.localStorage.getItem("apartmentData"))
  );

  // Define a function to geocode an address and return the latitude and longitude
  async function geocodeAddress(address) {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${process.env.REACT_APP_MAPS_API_KEY}`
    );
    const data = await response.json();

    if (data.results.length === 0) {
      throw new Error("Invalid address");
    }

    const location = data.results[0].geometry.location;
    return { location, address };
  }

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
          new window.google.maps.Marker({
            position: { lat: latitude, lng: longitude },
            map: mapRef.current,
          });
        },
        (error) => console.log(error),
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    }
  }, [clicked]);

  const getCurrentLocation = async () => {
    setClicked(true);
  };

  // Define a state variable to store the location and address
  const [specialLocation, setSpecialLocation] = useState(null);

  // Define a useEffect hook to get the location when the component mounts
  useEffect(() => {
    const address = window.localStorage.getItem("address");
    if (address) {
      geocodeAddress(address)
        .then((result) => {
          setSpecialLocation(result);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  // When the component mounts, geocode each address and add the lat/lng coordinates to the apartment data
  useEffect(() => {
    Promise.all(
      apartmentData.map(async (apartment) => {
        try {
          const { location, address } = await geocodeAddress(apartment.address);
          return { ...apartment, location, address };
        } catch (error) {
          console.error(error.message);
          return { ...apartment, location: null, address: null };
        }
      })
    ).then((updatedData) => setApartmentData(updatedData));
  }, [center, zoom]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef(null);

  return (
    <Box style={{ height: "100%", width: "100%", position: "relative" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey }}
        center={center}
        zoom={zoom}
        options={{
          styles: mapStyles,
        }}
        style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map }) => {
          mapRef.current = map;
          setMapLoaded(true);
        }}
        onChange={({ center, zoom }) => {
          setClicked(false);
          setCenter(center);
          setZoom(zoom);
        }}
        onIdle={() => {
          if (mapLoaded && userLocation) {
            setUserLocation({ ...userLocation });
          }
        }}
      >{specialLocation && (<SpecialMarker
            lat={specialLocation.location.lat}
            lng={specialLocation.location.lng}
          />)}
        {apartmentData.map((apartment) => (
          <ApartmentMarker
            id={`marker-${apartment.id}`}
            key={apartment.id}
            lat={apartment.location?.lat}
            lng={apartment.location?.lng}
            data={apartment}
          />
        ))}
        
        
      </GoogleMapReact>
      <Button
        variant="contained"
        onClick={getCurrentLocation}
        style={{
          position: "absolute",
          bottom: 16,
          left: 16,
          zIndex: 1,
          color: "white",
        }}
      >
        Get Current Location
      </Button>
    </Box>
  );
}

export default MapComponent;

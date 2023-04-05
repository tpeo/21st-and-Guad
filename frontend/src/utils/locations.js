// Define a function to geocode an address and return the latitude and longitude
export async function geocodeAddress(address) {
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
  return { lat: location.lat, lng: location.lng };
}

export const getDistance = async (origin, destination) => {
  const originCoords = await geocodeAddress(origin);
  const destCoords = await geocodeAddress(destination);

  const toRadians = (deg) => deg * (Math.PI / 180);
  const R = 3958.8; // radius of the Earth in miles

  const dLat = toRadians(destCoords.lat - originCoords.lat);
  const dLon = toRadians(destCoords.lng - originCoords.lng);
  const lat1 = toRadians(originCoords.lat);
  const lat2 = toRadians(destCoords.lat);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance.toFixed(2);
};

const mapStyles = [
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [{ color: "#fefefe" }, { lightness: 17 }, { weight: 1.2 }],
  },
  {
    "featureType": "poi.school",
    "elementType": "labels.icon",
    "stylers": [
      {
        "color": "#EACA78"
      }
    ]
  },
  {
    featureType: "poi.business",
    stylers: [{ visibility: "off" }],
  },
];

export default mapStyles;

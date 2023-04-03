import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
  Toolbar,
  InputAdornment,
  Rating,
} from "@mui/material";
import { ArrowBackIosNew } from "@mui/icons-material";
import { AMENITIES_ARRAY } from "../../utils/constants";
import { AmenitiesIcon } from "../Theme";
import { ThemeProvider } from "@emotion/react";
import { appTheme } from "../Theme";

function HousingDialogContent({ onSubmit, onClose }) {
  const [nameValid, setNameValid] = useState(true);
  const [addressValid, setAddressValid] = useState(true);
  const [resetAmenities, setResetAmenities] = useState(false);


  const [formData, setFormData] = useState({
    name: "",
    address: "",
    amenities: [],
    distance: "",
    floorplan_bed: 0,
    floorplan_bath: 0,
    main_rating: 0,
    phone_number: "",
    price_high: 0,
    price_low: 0,
    security_rating: 0,
    square_footage: "",
    notes: "",
  });

  const iconSelect = (icon) => {
    const amenities = formData.amenities.includes(icon)
      ? formData.amenities.filter((amenity) => amenity !== icon)
      : [...formData.amenities, icon];

    setFormData({
      ...formData,
      amenities,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Check if required fields are empty
    if (formData.name === "" || formData.address === "") {
      setNameValid(formData.name.length > 0);
      setAddressValid(formData.address.length > 0);
    } else {
      setNameValid(true);
      setAddressValid(true);
      const housingCardData = { formData };
      // call api to create a new housing card
      onSubmit(housingCardData);

      //reset the form
      onClose();
      setFormData({
        name: "",
        address: "",
        amenities: [],
        distance: "",
        floorplan_bed: 0,
        floorplan_bath: 0,
        main_rating: 0,
        phone_number: "",
        price_high: 0,
        price_low: 0,
        security_rating: 0,
        square_footage: "",
        notes: "",
      });
      // reset the active state of amenities icons
      setResetAmenities(true);
    }
  };

  return (
    <ThemeProvider theme={appTheme}>
      <Box width={800}>
        <Toolbar sx={{ pl: 0, marginTop: "-12px", marginLeft: "-12px" }}>
          <IconButton color="inherit" edge="start" onClick={() => onClose()}>
            <ArrowBackIosNew />
            <Typography>Back</Typography>
          </IconButton>
          <Typography
            component="h5"
            align="center"
            sx={{ fontWeight: 700, fontSize: 22, mx: "auto" }}
          >
            Create a New Housing Card
          </Typography>
        </Toolbar>

        <Box component="form" sx={{ width: 700, my: 2 }}>
          <Typography
            component="h5"
            width="500"
            sx={{ fontWeight: 600, fontSize: 17, mb: -1 }}
          >
            Property Name
          </Typography>

          <TextField
            margin="normal"
            required
            id="name"
            name="name"
            autoFocus
            value={formData.name}
            sx={{ width: 450 }}
            error={!nameValid}
            helperText={!nameValid && "Name is required"}
            onChange={(e) => {
              setFormData({
                ...formData,
                name: e.target.value,
              });
              setNameValid(true);
            }}
          />
          <Typography
            component="h5"
            width="500"
            sx={{
              fontWeight: 600,
              fontSize: 17,
              mt: 1,
              mb: -1,
            }}
          >
            Address
          </Typography>

          <TextField
            margin="normal"
            required
            id="address"
            name="address"
            sx={{ mb: 2.5, width: 450 }}
            error={!addressValid}
            helperText={!addressValid && "Valid address is required"}
            value={formData.address}
            onChange={(e) => {
              setFormData({
                ...formData,
                address: e.target.value,
              });
              setAddressValid(true);
            }}
          />

          <Typography
            component="h5"
            width="500"
            sx={{ fontWeight: 600, fontSize: 17, mb: -1 }}
          >
            Phone Number
          </Typography>

          <TextField
            margin="normal"
            id="number"
            name="number"
            sx={{ mb: 2.5, width: 450 }}
            value={formData.phone_number}
            onChange={(e) => {
              setFormData({
                ...formData,
                phone_number: e.target.value,
              });
            }}
          />
          <Typography
            component="h5"
            width="500"
            sx={{ fontWeight: 700, fontSize: 17, mb: 2 }}
          >
            Amenities
          </Typography>

          {AMENITIES_ARRAY.map((icon, index) => (
            <AmenitiesIcon
              key={index}
              iconName={icon}
              size="medium"
              active={formData.amenities.includes(icon)}
              reset={resetAmenities}
              marginRight={12}
              marginBottom={20}
              clickable={true}
              onClick={() => iconSelect(icon)}
            />
          ))}
          <Typography
            component="h5"
            width="500"
            sx={{ fontWeight: 700, fontSize: 17, mb: 2 }}
          >
            Distance
          </Typography>

          <TextField
            margin="normal"
            id="distance"
            name="distance"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">miles</InputAdornment>
              ),
            }}
            sx={{ mb: 2.5, mt: -1 }}
            value={formData.distance}
            onChange={(e) => {
              setFormData({
                ...formData,
                phone_number: e.target.value,
              });
            }}
          />

          <Typography
            component="h5"
            width="500"
            sx={{ fontWeight: 700, fontSize: 17, mb: -1 }}
          >
            Price
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              margin="normal"
              id="price_low"
              name="price_low"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              sx={{ mr: 1, width: 100 }}
              value={formData.price_low}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  price_low: e.target.value,
                });
              }}
            />
            <Typography variant="body1" sx={{ mr: 1 }}>
              -
            </Typography>

            <TextField
              margin="normal"
              id="price_high"
              name="price_high"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              sx={{ mr: 1, width: 100 }}
              value={formData.price_high}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  price_high: e.target.value,
                });
              }}
            />
          </Box>
          <Typography
            component="h5"
            width="500"
            sx={{ fontWeight: 700, fontSize: 17, mb: -1 }}
          >
            Floor Plan
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              margin="normal"
              id="floor_plan_bed"
              name="floor_plan_bed"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">Bed</InputAdornment>
                ),
              }}
              sx={{ mr: 1, width: 100 }}
              value={formData.floorplan}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  floorplan_bed: e.target.value,
                });
              }}
            />
            <Typography variant="body1" sx={{ mr: 1 }}>
              x
            </Typography>

            <TextField
              margin="normal"
              id="floor_plan_bath"
              name="floor_plan_bath"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">Bath</InputAdornment>
                ),
              }}
              sx={{ mr: 1, width: 100 }}
              value={formData.floorplan}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  floorplan_bath: e.target.value,
                });
              }}
            />
          </Box>
          <Typography
            component="h5"
            width="500"
            sx={{ fontWeight: 700, fontSize: 17, mb: 1 }}
          >
            Security
          </Typography>

          <Rating
            value={formData.security_rating}
            precision={0.5}
            sx={{
              "& .MuiRating-iconFilled": {
                color: appTheme.palette.primary.main,
              },
              mb: 2,
            }}
            onChange={(event, newValue) => {
              setFormData({
                ...formData,
                security_rating: newValue,
              });
            }}
          />

          <Typography
            component="h5"
            width="500"
            sx={{ fontWeight: 700, fontSize: 17, mb: 1 }}
          >
            Maintenance
          </Typography>

          <Rating
            value={formData.main_rating}
            precision={0.5}
            sx={{
              "& .MuiRating-iconFilled": {
                color: appTheme.palette.primary.main,
              },
            }}
            onChange={(event, newValue) => {
              setFormData({
                ...formData,
                main_rating: newValue,
              });
            }}
          />
          <Typography
            component="h5"
            width="500"
            sx={{
              fontWeight: 700,
              fontSize: 17,
              mt: 1,
              mb: -1,
            }}
          >
            Notes
          </Typography>

          <TextField
            margin="normal"
            fullWidth
            id="name"
            name="name"
            multiline
            rows={10}
            sx={{ mb: 2.5 }}
            value={formData.notes}
            onChange={(e) => {
              setFormData({
                ...formData,
                notes: e.target.value,
              });
            }}
          />
          <Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ boxShadow: 0, mt: -1 }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default HousingDialogContent;

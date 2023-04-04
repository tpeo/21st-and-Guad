import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Select,
  Typography,
  IconButton,
  MenuItem,
  FormControl,
  Avatar,
  Box,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Slider,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Modal,
  Paper,
  ListItem,
  Rating,
  TextField,
  InputProps,
  InputAdornment,
  Dialog,
  DialogActions,
  DialogContent,
  Zoom,
} from "@mui/material";

import { ThemeProvider, styled } from "@mui/material/styles";

import { appTheme, AmenitiesIcon } from "./Theme.js";
import {
  Add,
  Save,
  Hive,
  MenuIcon,
  ExpandMore as ExpandMoreIcon,
  AccountCircleRounded,
} from "@mui/icons-material";

import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import Carousel from "react-material-ui-carousel";
import NavBar from "./NavBar.js";
import HousingDialogContent from "./cards/HousingDialogContent.js";
import AddGroupDialog from "./cards/AddGroupDialog.js";
import NoGroups from "./cards/NoGroups.js";
//import SpeedDialButton from "./SpeedDialButton.js";

const Transition = React.forwardRef(function Transition(props, ref) {
  //return <Slide direction="up" ref={ref} {...props} />;
  return <Zoom in ref={ref} {...props} />;
});

function DashboardPage() {
  const [val, setVal] = useState("");

  // create an object to hold the open/close state and handlers for the different dialogs
  const [dialogs, setDialogs] = useState({
    speedDial: false,
    housingCard: false,
    group: false,
  });

  const handleDialogOpen = (dialogName) => {
    setDialogs((prevState) => ({ ...prevState, [dialogName]: true }));
  };

  const handleDialogClose = (dialogName) => {
    setDialogs((prevState) => ({ ...prevState, [dialogName]: false }));
  };

  async function handleCreateHousingCard(housingCardData) {
    console.log(housingCardData);
    try {
      await createApartment(housingCardData); // wait for createApartment to complete
    } catch (error) {
      console.log(error);
    }
    handleDialogClose("housingCard");
  }

  const handleChange = (event) => {
    setVal(event.target.value);
  };

  //create an apartment card
  async function createApartment(newFormData) {
    const response = await fetch(
      `http://${process.env.REACT_APP_HOSTNAME}/apartments`,
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          //Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFiYzEyMyIsImVtYWlsIjoiYWJjMTIzQGdtYWlsLmNvbSJ9.kVAp_XhgpFH3Iyl9cnRGUjRFYiBGuRuyYAztbNcRVLs"
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify({
          groupId: window.localStorage.getItem("groupID"),
          name: newFormData.name,
          address: newFormData.address,
          amenities: newFormData.amenities,
          distance: newFormData.distance,
          floorplan_bed: newFormData.floorplan_bed,
          floorplan_bath: newFormData.floorplan_bath,
          main_rating: newFormData.main_rating,
          phone_number: newFormData.phone_number,
          price_high: newFormData.price_high,
          price_low: newFormData.price_low,
          security_rating: newFormData.security_rating,
          square_footage: newFormData.square_footage,
          notes: newFormData.notes,
        }),
      }
    );

    if (response.ok) {
      const newApartment = await response.json(); // get the newly created apartment object with the ID
      setLocalData((prevState) => ({
        ...prevState,
        apartmentData: [...prevState.apartmentData, newApartment], // add the new apartment to the local data
      }));
    } else {
      console.log("Failed to create apartment.");
    }
  }

  //update existing apartment card
  async function updateApartment() {
    await fetch(`http://${process.env.REACT_APP_HOSTNAME}/apartments`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        //Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFiYzEyMyIsImVtYWlsIjoiYWJjMTIzQGdtYWlsLmNvbSJ9.kVAp_XhgpFH3Iyl9cnRGUjRFYiBGuRuyYAztbNcRVLs"
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({
        groupId: window.localStorage.getItem("groupID"),
        apartmentId: formData.id,
        name: formData.name,
        address: formData.address,
        amenities: formData.amenities,
        distance: formData.distance,
        floorplan_bed: formData.floorplan_bed,
        floorplan_bath: formData.floorplan_bath,
        main_rating: formData.main_rating,
        phone_number: formData.phone_number,
        price_high: formData.price_high,
        price_low: formData.price_low,
        security_rating: formData.security_rating,
        square_footage: formData.square_footage,
        notes: formData.notes,
      }),
    })
      .then((resp) => resp.json())
      .then((json) => console.log(json))
      .then(() => {
        const apartmentIndex = localData.apartmentData.findIndex(
          (apartment) => apartment.id === formData.id
        );
        if (apartmentIndex === -1) {
          // apartment with the given ID was not found
          return;
        }

        const updatedApartment = {
          ...localData.apartmentData[apartmentIndex],
          ...formData,
        };
        const updatedApartmentData = [...localData.apartmentData];
        updatedApartmentData[apartmentIndex] = updatedApartment;

        setLocalData((prevState) => ({
          ...prevState,
          apartmentData: updatedApartmentData,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await updateApartment(); // wait for updateApartment to complete
      handleClose();
    } catch (error) {
      console.log(error);
    }
  }

  const [userData, setUserData] = useState({
    name: "",
    first_preference: "",
    second_preference: "",
    third_preference: "",
    address: "",
    distance: "",
    price: "",
  });

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
    id: "",
  });

  const [localData, setLocalData] = useState({ users: [], apartmentData: [] });
  useEffect(() => {
    // Convert localData to JSON string and store it in window.localStorage
    localStorage.setItem("apartmentData", JSON.stringify(localData.apartmentData));
  }, [localData.apartmentData]);

  const [userGroupID, setUserGroupID] = useState(
    window.localStorage.getItem("groupID")
  );
  //RUNS ON FIRST RENDER to get groupID, if it exists
  useEffect(() => {
    const userID = window.localStorage.getItem("userID");
    console.log("userID: " + userID);
    let url = `http://${process.env.REACT_APP_HOSTNAME}/profiles/${userID}`;
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            //Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFiYzEyMyIsImVtYWlsIjoiYWJjMTIzQGdtYWlsLmNvbSJ9.kVAp_XhgpFH3Iyl9cnRGUjRFYiBGuRuyYAztbNcRVLs"
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer",
        });
        const data = await response.json();

        //if the user is not part of a group, sets groupID in localStorage to 'null'
        const groupID = data.group[0] || null;
        setUserGroupID(groupID);
        window.localStorage.setItem("groupID", groupID);
        window.localStorage.setItem("address", data.address);
        console.log("groupID: " + groupID);
        setUserData({
          name: data.name,
          first_preference: data.first_preference,
          second_preference: data.second_preference,
          third_preference: data.third_preference,
          address: data.address,
          distance: data.distance,
          price: data.price,
        });

        if (groupID) {
          // If the user is part of a group, make a request to get the group data
          const groupUrl = `http://${process.env.REACT_APP_HOSTNAME}/groups/${groupID}`;
          const groupResponse = await fetch(groupUrl, {
            method: "GET",
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer",
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
              "Content-Type": "application/json",
            },
          });
          const groupData = await groupResponse.json();

          // Store the group data in the local state
          setLocalData({
            users: groupData.users,
            apartmentData: groupData.apartmentsData,
          });
          console.log("groupData:", groupData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  //creates the very first group for a user
  const createGroup = async () => {
    let userID = window.localStorage.getItem("userID");
    let url = `http://${process.env.REACT_APP_HOSTNAME}/groups/`;
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ userId: userID }), // include userID in the request body
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      window.localStorage.setItem("groupID", data.groupId);
      setUserGroupID(data.groupId); // update userGroupID state
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };

  //speedDial action buttons
  const actions = [
    {
      icon: "Home",
      name: "Add Apartment Card",
      tooltipTitle: "Add Apartment",
      delay: 100,
      onClick: () => {
        handleDialogOpen("housingCard");
      },
    },
    {
      icon: "Group",
      name: "Add Group Member",
      tooltipTitle: "Add Group Member",
      onClick: () => {
        handleDialogOpen("group");
      },
    },
    {
      icon: <Save />,
      name: "Save",
      tooltipTitle: "Save",
      onClick: () => {
        
      },
    },
  ];

  const AMENITIES_ARRAY = [
    "Electricity",
    "Furnished",
    "Gym",
    "Kitchen",
    "Lobby",
    "Laundry",
    "MealPlan",
    "Parking",
    "Pets",
    "Peaceful",
    "NoSmoking",
    "Trash",
    "Water",
    "Wifi",
    "Windows",
  ];

  //styles for modal
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    borderRadius: 1.5,
    overflow: "scroll",
    boxShadow: 3,
    height: 500,
    p: 4,
  };

  const [open, setOpen] = React.useState(false);

  const iconSelect = (icon) => {
    const amenities = formData.amenities.includes(icon)
      ? formData.amenities.filter((amenity) => amenity !== icon)
      : [...formData.amenities, icon];

    setFormData({
      ...formData,
      amenities,
    });
  };

  const handleOpen = (props) => {
    setOpen(true);
    setFormData({
      name: props.name,
      address: props.address,
      phone_number: props.phone_number,
      amenities: props.amenities,
      distance: props.distance,
      price_high: props.price_high,
      price_low: props.price_low,
      floorplan_bed: props.floorplan_bed,
      floorplan_bath: props.floorplan_bath,
      square_footage: props.square_footage,
      security_rating: props.security_rating,
      main_rating: props.main_rating,
      notes: props.notes,
      id: props.id,
    });
  };

  const handleClose = () => setOpen(false);

  return (
    <ThemeProvider theme={appTheme}>
      <NavBar></NavBar>
      <div>
        {/* if the user is NOT part of a group, renders a NoGroups component */}
        {userGroupID === null ? (
          <NoGroups createGroup={createGroup} />
        ) : (
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            style={{ minHeight: "150vh", mb: 20 }}
          >
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              sx={{
                mt: 3,
                borderRadius: 2,
                border: 1,
                borderColor: appTheme.palette.primary.lightgrey,
                borderWidth: 1,
              }}
            >
              <Box sx={{ width: 350, my: 2 }}>
                <IconButton
                  component="span"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    style={{
                      margin: "10px",
                      width: "100px",
                      height: "100px",
                    }}
                  />
                </IconButton>
              </Box>

              <Accordion
                sx={{ width: 150, boxShadow: 0, ml: "25%", borderTop: 0 }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>{userData.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>Lorem ipsum</Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>

            <Grid
              container
              spacing={2}
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
              sx={{ flexGrow: 1, width: 1250, mt: 4 }}
            >
              {localData.apartmentData.map((elem) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={localData.apartmentData.indexOf(elem)}
                >
                  <Carousel
                    autoPlay={false}
                    animation="fade"
                    duration={350}
                    NextIcon={false}
                    PrevIcon={false}
                    sx={{ borderRadius: 2, boxShadow: 3, height: 650 }}
                    indicatorIconButtonProps={{
                      style: {
                        color: appTheme.palette.primary.lightgrey, // 3
                      },
                    }}
                    activeIndicatorIconButtonProps={{
                      style: {
                        color: appTheme.palette.primary.main,
                      },
                    }}
                    indicatorContainerProps={{
                      style: {
                        zIndex: 1,
                        marginTop: "-30px",
                        position: "relative",
                      },
                    }}
                  >
                    <Card
                      sx={{
                        backgroundColor: appTheme.palette.primary.lightyellow,
                        boxShadow: 3,
                        height: 650,
                      }}
                    >
                      <IconButton
                        onClick={() =>
                          handleOpen({
                            name: elem.name,
                            address: elem.address,
                            phone_number: elem.phone_number,
                            amenities: elem.amenities,
                            distance: elem.distance,
                            price_high: elem.price_high,
                            price_low: elem.price_low,
                            floorplan_bed: elem.floorplan_bed,
                            floorplan_bath: elem.floorplan_bath,
                            square_footage: elem.square_footage,
                            security_rating: elem.security_rating,
                            main_rating: elem.main_rating,
                            notes: elem.notes,
                            id: elem.id,
                          })
                        }
                        sx={{ float: "right", mt: 2 }}
                      >
                        {" "}
                        <OpenInFullIcon />
                      </IconButton>

                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        {/* <form onSubmit={handleSubmit}> */}
                        <Box sx={style}>
                          <Typography
                            component="h5"
                            align="center"
                            sx={{ fontWeight: 700, fontSize: 22, mb: 1 }}
                          >
                            Edit Housing Card
                          </Typography>

                          <Box component="form" sx={{ width: 700, my: 2 }}>
                            <Typography
                              component="h5"
                              width="500"
                              sx={{ fontWeight: 700, fontSize: 17, mb: -1 }}
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
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  name: e.target.value,
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
                              Address
                            </Typography>

                            <TextField
                              margin="normal"
                              required
                              id="address"
                              name="address"
                              sx={{ mb: 2.5, width: 450 }}
                              value={formData.address}
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  address: e.target.value,
                                });
                              }}
                            />

                            <Typography
                              component="h5"
                              width="500"
                              sx={{ fontWeight: 700, fontSize: 17, mb: -1 }}
                            >
                              Phone Number
                            </Typography>

                            <TextField
                              margin="normal"
                              required
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
                                clickable={true}
                                active={formData.amenities.includes(icon)}
                                size="small"
                                marginRight={12}
                                marginBottom={20}
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
                              required
                              id="distance"
                              name="distance"
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    miles
                                  </InputAdornment>
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
                                    <InputAdornment position="start">
                                      $
                                    </InputAdornment>
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
                                    <InputAdornment position="start">
                                      $
                                    </InputAdornment>
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
                                    <InputAdornment position="end">
                                      Bed
                                    </InputAdornment>
                                  ),
                                }}
                                sx={{ mr: 1, width: 100 }}
                                value={formData.floorplan_bed}
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
                                    <InputAdornment position="end">
                                      Bath
                                    </InputAdornment>
                                  ),
                                }}
                                sx={{ mr: 1, width: 100 }}
                                value={formData.floorplan_bath}
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
                              sx={{ fontWeight: 700, fontSize: 17, mt: 1 }}
                            >
                              Signed
                            </Typography>

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
                              required
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
                          </Box>

                          <Box component="form" onSubmit={handleSubmit}>
                            <Box>
                              <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                sx={{ boxShadow: 0, mt: -1 }}
                              >
                                Submit
                              </Button>
                            </Box>
                          </Box>
                        </Box>
                        {/* </form> */}
                      </Modal>

                      <CardHeader
                        title={
                          <Typography
                            component="h1"
                            sx={{ fontWeight: 700, fontSize: 30 }}
                          >
                            {elem.name}
                          </Typography>
                        }
                      />

                      <CardContent sx={{ mt: -4 }}>
                        <Typography variant="h7">{elem.address}</Typography>

                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 400, fontSize: 16 }}
                        >
                          {elem.phone_number}
                        </Typography>

                        <Typography
                          variant="h3"
                          sx={{ fontWeight: 700, fontSize: 18, mt: 4, mb: 1 }}
                        >
                          Amenities
                        </Typography>

                        {elem.amenities.map((icon, index) => (
                          <AmenitiesIcon
                            key={index}
                            active="true"
                            clickable={false}
                            iconName={icon}
                            size="small"
                            marginRight={12}
                          />
                        ))}

                        <Typography
                          variant="h3"
                          sx={{ fontWeight: 700, fontSize: 18, mt: 2 }}
                        >
                          Distance
                        </Typography>

                        <Typography
                          variant="h6"
                          sx={{
                            fontSize: 16,
                            border: 1,
                            fontWeight: 400,
                            borderColor: appTheme.palette.secondary.main,
                            borderRadius: 1,
                            width: 90,
                            paddingLeft: 1,
                            mt: 1,
                            mb: 1,
                          }}
                        >
                          {elem.distance} miles
                        </Typography>

                        <Typography
                          variant="h3"
                          sx={{ fontWeight: 700, fontSize: 18, mt: 2 }}
                        >
                          Price (per month)
                        </Typography>

                        <Slider
                          getAriaLabel={() => "Price range"}
                          value={[
                            Number(elem.price_low), // ensure price_low is a number
                            Number(elem.price_high), // ensure price_high is a number
                          ]}
                          min={0}
                          max={2000}
                          valueLabelDisplay="auto"
                        />

                        <Typography
                          variant="h3"
                          sx={{ fontWeight: 700, fontSize: 18 }}
                        >
                          Floor plan
                        </Typography>

                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Typography
                            variant="h6"
                            sx={{
                              fontSize: 16,
                              border: 1,
                              fontWeight: 400,
                              borderColor: appTheme.palette.secondary.main,
                              borderRadius: 1,
                              width: 100,
                              paddingLeft: 1,
                              mt: 1,
                              mb: 1,
                              mr: 1,
                            }}
                          >
                            {elem.floorplan_bed} bed
                          </Typography>

                          <Typography
                            variant="h6"
                            sx={{
                              fontSize: 16,
                              border: 1,
                              fontWeight: 400,
                              borderColor: appTheme.palette.secondary.main,
                              borderRadius: 1,
                              width: 100,
                              paddingLeft: 1,
                              mt: 1,
                              mb: 1,
                            }}
                          >
                            {elem.floorplan_bath} bath
                          </Typography>
                        </Box>

                        <Typography
                          variant="h3"
                          sx={{ fontWeight: 700, fontSize: 18 }}
                        >
                          Square Footage
                        </Typography>

                        <Typography
                          variant="h6"
                          sx={{
                            fontSize: 16,
                            border: 1,
                            fontWeight: 400,
                            borderColor: appTheme.palette.secondary.main,
                            borderRadius: 1,
                            width: 120,
                            paddingLeft: 1,
                            mt: 1,
                            mb: 1,
                          }}
                        >
                          {elem.square_footage} sq ft
                        </Typography>

                        <Typography
                          variant="h3"
                          sx={{ fontWeight: 700, fontSize: 18 }}
                        >
                          Security
                        </Typography>

                        <Rating
                          value={elem.security_rating}
                          precision={0.5}
                          sx={{
                            "& .MuiRating-iconFilled": {
                              color: appTheme.palette.primary.main,
                            },
                          }}
                          readOnly
                        />

                        <Typography
                          variant="h3"
                          sx={{ fontWeight: 700, fontSize: 18 }}
                        >
                          Maintenance
                        </Typography>

                        <Rating
                          value={elem.main_rating}
                          precision={0.5}
                          sx={{
                            "& .MuiRating-iconFilled": {
                              color: appTheme.palette.primary.main,
                            },
                          }}
                          readOnly
                        />

                        {/* <Typography variant="h3" sx={{fontSize:20}} >
                          Signed?
                      </Typography> */}
                      </CardContent>
                    </Card>

                    <Card
                      sx={{
                        backgroundColor: appTheme.palette.primary.lightyellow,
                        boxShadow: 3,
                        height: 650,
                      }}
                    >
                      <CardHeader
                        title={
                          <Typography
                            component="h1"
                            sx={{ fontWeight: 700, fontSize: 30 }}
                          >
                            {elem.name}
                          </Typography>
                        }
                      />

                      <CardContent sx={{ mt: -4 }}>
                        <Typography variant="h7">{elem.address}</Typography>

                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 400, fontSize: 16 }}
                        >
                          {elem.phone_number}
                        </Typography>

                        <Typography
                          variant="h3"
                          sx={{ fontWeight: 700, fontSize: 18, mt: 4, mb: 1 }}
                        >
                          Notes
                        </Typography>

                        <Typography
                          variant="h7"
                          sx={{ fontWeight: 400, fontSize: 18, mt: 4, mb: 1 }}
                        >
                          {elem.notes}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Carousel>
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}

        <SpeedDial
          ariaLabel="SpeedDial example"
          sx={{ position: "fixed", bottom: 16, right: 16 }}
          icon={
            <SpeedDialIcon
              openIcon={<Hive sx={{ color: "white" }} />}
              sx={{ color: appTheme.palette.primary.white }}
            />
          }
          onClose={() => handleDialogClose("speedDial")}
          onOpen={() => handleDialogOpen("speedDial")}
          direction="left"
          open={dialogs.speedDial}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              delay={action.delay}
              icon={
                <img
                  src={
                    process.env.PUBLIC_URL +
                    `/images/amenitiesIcons/${action.icon}.png`
                  }
                  alt={action.name}
                  style={{ width: 30, height: 30 }}
                />
              }
              tooltipTitle={action.tooltipTitle}
              onClick={action.onClick}
              FabProps={{ size: "medium" }}
            />
          ))}
        </SpeedDial>

        {/* dialog that can go anywhere on the page bc it pops up from middle */}
        <Dialog
          open={dialogs.housingCard}
          onClose={() => handleDialogClose("housingCard")}
          TransitionComponent={Transition}
          keepMounted
          maxWidth="lg"
          scroll="paper"
        >
          <DialogContent>
            <HousingDialogContent
              onSubmit={handleCreateHousingCard}
              onClose={() => handleDialogClose("housingCard")}
            />
          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog>
        <AddGroupDialog
          open={dialogs.group}
          onClose={() => handleDialogClose("group")}
          TransitionComponent={Transition}
        ></AddGroupDialog>
      </div>
    </ThemeProvider>
  );
}

export default DashboardPage;

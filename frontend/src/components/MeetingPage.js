import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import * as constants from "../utils/constants";
import PropTypes from 'prop-types';
import moment from "moment";
import { format } from 'date-fns'



import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Select,
  Typography,
  IconButton,
  Button,
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
  Fab,
  Rating,
  Tab,
  Tabs,
  TextField,
  makeStyles,
  Dialog,
  DialogActions,
  DialogContent,
  Zoom,
} from "@mui/material";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';



import {
  Add as AddIcon,
  Save,
  Hive,
  GroupAdd,
  MenuIcon,
  ExpandMore as ExpandMoreIcon,
  AccountCircleRounded as AccountCircleRoundedIcon,
} from "@mui/icons-material";


import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { appTheme, AmenitiesIcon } from "./Theme.js";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


function MeetingPage() {
  const AMENITIES_ARRAY = constants.AMENITIES_ARRAY;
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [userData, setUserData] = useState({
    name: "",
    first_preference: "",
    second_preference: "",
    third_preference: "",
    distance: "",
    price: ""
  })

  const [localData, setLocalData] = useState({ users: [], meetingData: [] });
  const today = new Date();

  const [meetingDateMatchesToday, setMeetingDateMatchesToday] = useState(false);

  const [userGroupID, setUserGroupID] = useState(window.localStorage.getItem("groupID"));
  //RUNS ON FIRST RENDER to get groupID, if it exists
  useEffect(() => {
    const userID = window.localStorage.getItem("userID");
    const url = `http://${process.env.REACT_APP_HOSTNAME}/profiles/${userID}`;

    console.log("userid", userID)
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        //if the user is not part of a group, sets groupID in localStorage to 'null'
        const groupID = data.group[0] || null;
        setUserGroupID(groupID);
        window.localStorage.setItem("groupID", groupID);
        setUserData({
          name: data.name,
          first_preference: data.first_preference,
          second_preference: data.second_preference,
          third_preference: data.third_preference,
          distance: data.distance,
          price: data.price
        })

        if (groupID) {
          // If the user is part of a group, make a request to get the group data
          const groupUrl = `http://${process.env.REACT_APP_HOSTNAME}/groups/${groupID}`;
          const groupResponse = await fetch(groupUrl, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const groupData = await groupResponse.json();

          // Store the group data in the local state
          setLocalData({
            users: groupData.users,
            meetingData: groupData.meetingsData,
          });
          console.log("groupData: ", groupData);
          // console.log("localData: ", localData);
          // console.log("meetingData: ", localData.meetingData);
          //console.log("test", new Date(localData.meetingData[0].date))
          // console.log("today", today)
          // var compare = today == new Date(localData.meetingData[0].date)
          // console.log("test", compare)
          const firstMeetingDate = new Date(localData.meetingData[0].date);
          setMeetingDateMatchesToday(today.getTime() === firstMeetingDate.getTime());
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []); 



  //add modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    console.log("open")
    setOpen(true)
  };
  const handleClose = () => setOpen(false);

  //edit modal
  const [openEdit, setOpenEdit] = React.useState(false);
  const handleOpenEdit = async (props) => {
    setOpenEdit(true)
    console.log("props", props)
    console.log("localData", localData)
    await setFormData({
      event: props.event,
      date: props.date,
      id: props.id,
      location: props.location,
      attending: props.attending
    })
    console.log("formData: ", formData)
  };
  const handleCloseEdit = () => setOpenEdit(false);



  //edit meetings
  async function editMeeting() {
    console.log("meetingid", formData.id);
    await fetch(`http://${process.env.REACT_APP_HOSTNAME}/meetings`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({
        groupId: userGroupID,
        meetingId: formData.id,
        event: formData.event,
        date: formData.date,
        location: formData.location,
        attending: formData.attending
      }),
    })
      .then((resp) => resp.json())
      .then((json) => console.log(json))
      .then(() => {
        const meetingIndex = localData.meetingData.findIndex(
          (meeting) => meeting.id === formData.id
        );
        if (meetingIndex === -1) {
          // meeting with the given ID was not found
          return;
        }

        const updatedMeeting = {
          ...localData.meetingData[meetingIndex],
          ...formData,
        };
        const updatedMeetingData = [...localData.meetingData];
        updatedMeetingData[meetingIndex] = updatedMeeting;

        setLocalData((prevState) => ({
          ...prevState,
          meetingData: updatedMeetingData,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //create meetings
  async function createMeeting() {
    await fetch(`http://${process.env.REACT_APP_HOSTNAME}/meetings`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({
        groupId: userGroupID,
        event: formData.event,
        date: formData.date,
        location: formData.location,
        attending: formData.attending
      }),
    })
      .then((resp) => resp.json())
      .then((newMeetingData) => {
        // add the newly created meeting to your localData array
        localData.meetingData.push(newMeetingData);
        console.log(newMeetingData);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log("formData", formData);
    try {
      await createMeeting(); // wait for createMeeting to complete
    } catch (error) {
      console.log(error);
    }
    setOpen(false)

    setFormData({
      event: "",
      id: "",
      date: new Date(),
      location: "",
      attending: []
    })
  }

  async function handleSubmitEdit(event) {
    event.preventDefault();
    console.log(formData);
    try {
      await editMeeting(); // wait for editMeeting to complete
    } catch (error) {
      console.log(error);
    }
    setOpenEdit(false)
    setFormData({
      event: "",
      id: "",
      date: new Date(),
      location: "",
      attending: []
    })

  }

  const [formData, setFormData] = useState({
    id: "",
    event: "",
    date: new Date(),
    location: "",
    attending: ""
  });


  //styles for modal
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: 1.5,
    overflow: 'scroll',
    boxShadow: 3,
    height: 500,
    p: 4,
  };


  const AntTabs = styled(Tabs)({
    borderBottom: '10px solid #ffffff',
    marginBottom: -10,
    "& MuiBox-root css-1gsv261": {
      borderBottom: 'none',
    }
  });

  const AntTab = styled((props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
      fontFamily: "Inter",
      fontSize: 19,
      fontWeight: 500,
      color: '#000000',

      "&.Mui-selected": {
        color: appTheme.palette.primary.main,
        fontWeight: 700
      },

    })
  );


  return (
    <ThemeProvider theme={appTheme}>
      <NavBar></NavBar>
      
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          style={{ minHeight: '100vh' }}
          sx={{ mt: 5 }}
        >

          <Box sx={{ width: '82%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <AntTabs value={value}
                onChange={handleChange} centered>
                <AntTab label="All" {...a11yProps(0)} />
                <AntTab label="Upcoming" {...a11yProps(1)} />
                <AntTab label="Past" {...a11yProps(2)} />
              </AntTabs>
            </Box>

            <TabPanel value={value} index={0}>

              <Grid
                container
                spacing={1}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                sx={{ flexGrow: 1, width: 1200, mt: 4 }}
              >

                {localData.meetingData.map((elem, index) => (
                  <Grid item xs={12} sm={6} md={4} key={localData.meetingData.indexOf(elem)}>

                    <Card
                      sx={{
                        backgroundColor: appTheme.palette.primary.white,
                        boxShadow: 3,
                        height: 320,
                        width: 320
                      }}
                    >

                      <IconButton onClick={() => handleOpenEdit({
                        id: elem.id,
                        event: elem.event,
                        date: elem.date,
                        location: elem.location,
                        attending: elem.attending
                      })} sx={{ float: 'right', mt: 2 }} > <OpenInFullIcon />
                      </IconButton>

                      {/*edit modal */}
                      <Modal
                        open={openEdit}
                        onClose={handleCloseEdit}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <form onSubmit={handleSubmitEdit}>
                          <Box sx={style}>
                            <Typography component="h5" align="center" sx={{ fontWeight: 700, fontSize: 22, mb: 1 }}>
                              Edit Meeting
                            </Typography>

                            <Box component="form" sx={{ width: 700, my: 2 }}>

                              <Typography component="h5" width="500" sx={{ fontWeight: 700, fontSize: 17, mb: -1 }}>
                                Event Title
                              </Typography>

                              <TextField
                                margin="normal"
                                required
                                id="event"
                                name="event"
                                autoFocus
                                value={formData.event}
                                sx={{ width: 450 }}
                                onChange={(e) => {
                                  setFormData({
                                    ...formData,
                                    event: e.target.value,
                                  });
                                }}
                              />

                              <Typography component="h5" width="500" sx={{ fontWeight: 700, fontSize: 17, mb: 1 }}>
                                When
                              </Typography>

                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker label="Choose date"
                                  name="date"
                                  format="MM/DD/YYYY"
                                  onChange={(e) => {
                                    console.log("date add", (e).format('MM/DD/YYYY'));
                                    setFormData({
                                      ...formData,
                                      date: (e).format('MM/DD/YYYY'),
                                    });
                                  }}
                                  required
                                  fullWidth
                                  inputVariant="outlined"
                                />
                              </LocalizationProvider>

                              <Typography component="h5" width="500" sx={{ fontWeight: 700, fontSize: 17, mb: -1, mt: 1 }}>
                                Where
                              </Typography>

                              <TextField
                                margin="normal"
                                required
                                id="location"
                                name="location"
                                value={formData.location}
                                sx={{ width: 450 }}
                                onChange={(e) => {
                                  setFormData({
                                    ...formData,
                                    location: e.target.value,
                                  });
                                }}
                              />

                              <Typography variant="h3" sx={{ fontWeight: 700, fontSize: 18 }}>
                                Attending
                              </Typography>

                              <TextField
                                margin="normal"
                                required
                                id="attending"
                                name="attending"
                                value={formData.attending}
                                sx={{ width: 450 }}
                                onChange={(e) => {
                                  setFormData({
                                    ...formData,
                                    attending: e.target.value,
                                  });
                                }}
                              />
                            </Box>

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
                        </form>
                      </Modal>


                      <CardHeader
                        title={
                          <Typography component="h1" sx={{ fontWeight: 700, fontSize: 30 }}>
                            {elem.event}
                          </Typography>
                        }
                      />

                      <CardContent sx={{ mt: -2 }}>
                        <Typography variant="h3" sx={{ fontWeight: 700, fontSize: 18 }}>
                          When
                        </Typography>


                        <Typography variant="h6" sx={{
                          fontSize: 16, border: 1, fontWeight: 400, borderColor: appTheme.palette.secondary.main, borderRadius: 1, width: 130, paddingLeft: 1, mt: 1, mb: 2
                        }} >
                          {format(new Date(elem.date), 'MM/dd/yyyy')}
                        </Typography>

                        <Typography variant="h3" sx={{ fontWeight: 700, fontSize: 18 }}>
                          Where
                        </Typography>

                        <Typography variant="h6" sx={{
                          fontSize: 16, border: 1, fontWeight: 400, borderColor: appTheme.palette.secondary.main, borderRadius: 1, width: 260, paddingLeft: 1, mt: 1, mb: 2
                        }} >
                          {elem.location}
                        </Typography>

                        <Typography variant="h3" sx={{ fontWeight: 700, fontSize: 18 }}>
                          Attending
                        </Typography>

                        <Typography variant="h6" sx={{
                          fontSize: 16, border: 1, fontWeight: 400, borderColor: appTheme.palette.secondary.main, borderRadius: 1, width: 260, paddingLeft: 1, mt: 1, mb: 2
                        }} >
                          {elem.attending}
                        </Typography>


                      </CardContent>
                    </Card>

                  </Grid>
                ))}

              </Grid>
            </TabPanel>


            <TabPanel value={value} index={1}>
                <Grid
                  container
                  spacing={1}
                  direction="row"
                  justify="flex-start"
                  alignItems="flex-start"
                  sx={{ flexGrow: 1, width: 1200, mt: 4 }}
                >

                  {localData.meetingData.map((elem, index) => (
                    new Date(elem.date) > today &&

                    <Grid item xs={12} sm={6} md={4} key={localData.meetingData.indexOf(elem)}>
       
                      <Card
                        sx={{
                          backgroundColor: appTheme.palette.primary.white,
                          boxShadow: 3,
                          height: 320,
                          width: 320
                        }}
                      >

                        <IconButton onClick={() => handleOpenEdit({
                          id: elem.id,
                          event: elem.event,
                          date: elem.date,
                          location: elem.location,
                          attending: elem.attending
                        })} sx={{ float: 'right', mt: 2 }} > <OpenInFullIcon />
                        </IconButton>

                        {/*edit modal */}
                        <Modal
                          open={openEdit}
                          onClose={handleCloseEdit}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <form onSubmit={handleSubmitEdit}>
                            <Box sx={style}>
                              <Typography component="h5" align="center" sx={{ fontWeight: 700, fontSize: 22, mb: 1 }}>
                                Edit Meeting
                              </Typography>

                              <Box component="form" sx={{ width: 700, my: 2 }}>

                                <Typography component="h5" width="500" sx={{ fontWeight: 700, fontSize: 17, mb: -1 }}>
                                  Event Title
                                </Typography>

                                <TextField
                                  margin="normal"
                                  required
                                  id="event"
                                  name="event"
                                  value={formData.event}
                                  autoFocus
                                  sx={{ width: 450 }}
                                  onChange={(e) => {
                                    setFormData({
                                      ...formData,
                                      event: e.target.value,
                                    });
                                  }}
                                />

                                <Typography component="h5" width="500" sx={{ fontWeight: 700, fontSize: 17, mb: 1 }}>
                                  When
                                </Typography>

                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                  <DatePicker label="Choose date"
                                    name="date"
                                    format="MM/DD/YYYY"
                                    onChange={(e) => {
                                      console.log("date add", (e).format('MM/DD/YYYY'));
                                      setFormData({
                                        ...formData,
                                        date: (e).format('MM/DD/YYYY'),
                                      });
                                    }}
                                    required
                                    fullWidth
                                    inputVariant="outlined"
                                  />
                                </LocalizationProvider>

                                <Typography component="h5" width="500" sx={{ fontWeight: 700, fontSize: 17, mb: -1, mt: 1 }}>
                                  Where
                                </Typography>

                                <TextField
                                  margin="normal"
                                  required
                                  id="location"
                                  name="location"
                                  value={formData.location}
                                  sx={{ width: 450 }}
                                  onChange={(e) => {
                                    setFormData({
                                      ...formData,
                                      location: e.target.value,
                                    });
                                  }}
                                />

                                <Typography variant="h3" sx={{ fontWeight: 700, fontSize: 18 }}>
                                  Attending
                                </Typography>

                                <TextField
                                  margin="normal"
                                  required
                                  id="attending"
                                  name="attending"
                                  value={formData.attending}
                                  sx={{ width: 450 }}
                                  onChange={(e) => {
                                    setFormData({
                                      ...formData,
                                      attending: e.target.value,
                                    });
                                  }}
                                />
                              </Box>

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
                          </form>
                        </Modal>


                        <CardHeader
                          title={
                            <Typography component="h1" sx={{ fontWeight: 700, fontSize: 30 }}>
                              {elem.event}
                            </Typography>
                          }
                        />

                        <CardContent sx={{ mt: -2 }}>
                          <Typography variant="h3" sx={{ fontWeight: 700, fontSize: 18 }}>
                            When
                          </Typography>


                          <Typography variant="h6" sx={{
                            fontSize: 16, border: 1, fontWeight: 400, borderColor: appTheme.palette.secondary.main, borderRadius: 1, width: 130, paddingLeft: 1, mt: 1, mb: 2
                          }} >
                            {format(new Date(elem.date), 'MM/dd/yyyy')}
                          </Typography>

                          <Typography variant="h3" sx={{ fontWeight: 700, fontSize: 18 }}>
                            Where
                          </Typography>

                          <Typography variant="h6" sx={{
                            fontSize: 16, border: 1, fontWeight: 400, borderColor: appTheme.palette.secondary.main, borderRadius: 1, width: 260, paddingLeft: 1, mt: 1, mb: 2
                          }} >
                            {elem.location}
                          </Typography>

                          <Typography variant="h3" sx={{ fontWeight: 700, fontSize: 18 }}>
                            Attending
                          </Typography>

                          <Typography variant="h6" sx={{
                            fontSize: 16, border: 1, fontWeight: 400, borderColor: appTheme.palette.secondary.main, borderRadius: 1, width: 260, paddingLeft: 1, mt: 1, mb: 2
                          }} >
                            {elem.attending}
                          </Typography>


                        </CardContent>
                      </Card>
                      
                    </Grid>
                  ))}

                </Grid>

                </TabPanel>


                <TabPanel value={value} index={2}>
                <Grid
                  container
                  spacing={1}
                  direction="row"
                  justify="flex-start"
                  alignItems="flex-start"
                  sx={{ flexGrow: 1, width: 1200, mt: 4 }}
                >

                  {localData.meetingData.map((elem, index) => (
                    new Date(elem.date) < today &&

                    <Grid item xs={12} sm={6} md={4} key={localData.meetingData.indexOf(elem)}>
         
                     

                      <Card
                        sx={{
                          backgroundColor: appTheme.palette.primary.white,
                          boxShadow: 3,
                          height: 320,
                          width: 320
                        }}
                      >

                        <IconButton onClick={() => handleOpenEdit({
                          id: elem.id,
                          event: elem.event,
                          date: elem.date,
                          location: elem.location,
                          attending: elem.attending
                        })} sx={{ float: 'right', mt: 2 }} > <OpenInFullIcon />
                        </IconButton>

                        {/*edit modal */}
                        <Modal
                          open={openEdit}
                          onClose={handleCloseEdit}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <form onSubmit={handleSubmitEdit}>
                            <Box sx={style}>
                              <Typography component="h5" align="center" sx={{ fontWeight: 700, fontSize: 22, mb: 1 }}>
                                Edit Meeting
                              </Typography>

                              <Box component="form" sx={{ width: 700, my: 2 }}>

                                <Typography component="h5" width="500" sx={{ fontWeight: 700, fontSize: 17, mb: -1 }}>
                                  Event Title
                                </Typography>

                                <TextField
                                  margin="normal"
                                  required
                                  id="event"
                                  name="event"
                                  autoFocus
                                  value={formData.event}
                                  sx={{ width: 450 }}
                                  onChange={(e) => {
                                    setFormData({
                                      ...formData,
                                      event: e.target.value,
                                    });
                                  }}
                                />

                                <Typography component="h5" width="500" sx={{ fontWeight: 700, fontSize: 17, mb: 1 }}>
                                  When
                                </Typography>

                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                  <DatePicker label="Choose date"
                                    name="date"
                                    format="MM/DD/YYYY"
                                    onChange={(e) => {
                                      console.log("date add", (e).format('MM/DD/YYYY'));
                                      setFormData({
                                        ...formData,
                                        date: (e).format('MM/DD/YYYY'),
                                      });
                                    }}
                                    required
                                    fullWidth
                                    inputVariant="outlined"
                                  />
                                </LocalizationProvider>

                                <Typography component="h5" width="500" sx={{ fontWeight: 700, fontSize: 17, mb: -1, mt: 1 }}>
                                  Where
                                </Typography>

                                <TextField
                                  margin="normal"
                                  required
                                  id="location"
                                  name="location"
                                  value={formData.location}
                                  sx={{ width: 450 }}
                                  onChange={(e) => {
                                    setFormData({
                                      ...formData,
                                      location: e.target.value,
                                    });
                                  }}
                                />

                                <Typography variant="h3" sx={{ fontWeight: 700, fontSize: 18 }}>
                                  Attending
                                </Typography>

                                <TextField
                                  margin="normal"
                                  required
                                  id="attending"
                                  name="attending"
                                  value={formData.attending}
                                  sx={{ width: 450 }}
                                  onChange={(e) => {
                                    setFormData({
                                      ...formData,
                                      attending: e.target.value,
                                    });
                                  }}
                                />
                              </Box>

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
                          </form>
                        </Modal>


                        <CardHeader
                          title={
                            <Typography component="h1" sx={{ fontWeight: 700, fontSize: 30 }}>
                              {elem.event}
                            </Typography>
                          }
                        />

                        <CardContent sx={{ mt: -2 }}>
                          <Typography variant="h3" sx={{ fontWeight: 700, fontSize: 18 }}>
                            When
                          </Typography>


                          <Typography variant="h6" sx={{
                            fontSize: 16, border: 1, fontWeight: 400, borderColor: appTheme.palette.secondary.main, borderRadius: 1, width: 130, paddingLeft: 1, mt: 1, mb: 2
                          }} >
                            {format(new Date(elem.date), 'MM/dd/yyyy')}
                          </Typography>

                          <Typography variant="h3" sx={{ fontWeight: 700, fontSize: 18 }}>
                            Where
                          </Typography>

                          <Typography variant="h6" sx={{
                            fontSize: 16, border: 1, fontWeight: 400, borderColor: appTheme.palette.secondary.main, borderRadius: 1, width: 260, paddingLeft: 1, mt: 1, mb: 2
                          }} >
                            {elem.location}
                          </Typography>

                          <Typography variant="h3" sx={{ fontWeight: 700, fontSize: 18 }}>
                            Attending
                          </Typography>

                          <Typography variant="h6" sx={{
                            fontSize: 16, border: 1, fontWeight: 400, borderColor: appTheme.palette.secondary.main, borderRadius: 1, width: 260, paddingLeft: 1, mt: 1, mb: 2
                          }} >
                            {elem.attending}
                          </Typography>


                        </CardContent>
                      </Card>
                      
                    </Grid>
                  ))}

                </Grid>

                </TabPanel>





          </Box>


          <Fab size="large" color="secondary" aria-label="add" sx={{ position: "fixed", bottom: 30, right: 30, backgroundColor: appTheme.palette.primary.main, color: '#ffffff', boxShadow: 1 }} onClick={handleOpen} >
            <AddIcon />
          </Fab>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <form onSubmit={handleSubmit}>
              <Box sx={style}>
                <Typography component="h5" align="center" sx={{ fontWeight: 700, fontSize: 22, mb: 1 }}>
                  Add Meeting
                </Typography>

                <Box component="form" sx={{ width: 700, my: 2 }}>

                  <Typography component="h5" width="500" sx={{ fontWeight: 700, fontSize: 17, mb: -1 }}>
                    Event Title
                  </Typography>

                  <TextField
                    margin="normal"
                    required
                    id="event"
                    name="event"
                    autoFocus
                    value={formData.event}
                    sx={{ width: 450 }}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        event: e.target.value,
                      });
                    }}
                  />

                  <Typography component="h5" width="500" sx={{ fontWeight: 700, fontSize: 17, mb: 1 }}>
                    When
                  </Typography>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="Choose date"
                      name="date"
                      format="MM/DD/YYYY"
                      onChange={(e) => {
                        console.log("date add", (e).format('MM/DD/YYYY'));
                        setFormData({
                          ...formData,
                          date: (e).format('MM/DD/YYYY'),
                        });
                      }}
                      required
                      fullWidth
                      inputVariant="outlined"
                    />
                  </LocalizationProvider>

                  <Typography component="h5" width="500" sx={{ fontWeight: 700, fontSize: 17, mb: -1, mt: 1 }}>
                    Where
                  </Typography>

                  <TextField
                    margin="normal"
                    required
                    id="location"
                    name="location"
                    value={formData.location}
                    sx={{ width: 450 }}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        location: e.target.value,
                      });
                    }}
                  />

                  <Typography variant="h3" sx={{ fontWeight: 700, fontSize: 18 }}>
                    Attending
                  </Typography>

                  <TextField
                    margin="normal"
                    required
                    id="attending"
                    name="attending"
                    value={formData.attending}
                    sx={{ width: 450 }}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        attending: e.target.value,
                      });
                    }}
                  />

                </Box>

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
            </form>
          </Modal>

        </Grid>

    </ThemeProvider>
  );
}

export default MeetingPage;

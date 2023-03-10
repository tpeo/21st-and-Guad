import React, { useState, useEffect } from "react";
import {
  AppBar,
  Select,
  Typography,
  InputLabel,
  IconButton,
  MenuItem,
  FormControl,
  TextField,
  Avatar,
  Button,
  Box,
  Grid,
  Card,
  CardHeader,
  CardContent,
  InputAdornment,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Dialog,
  DialogActions,
  DialogContent,
  Zoom,
  Slide,
  colors,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { appTheme } from "./Theme.js";
import {
  Add as AddIcon,
  Save,
  Hive,
  GroupAdd,
  MenuIcon,
  ExpandMore as ExpandMoreIcon,
  AccountCircleRounded as AccountCircleRoundedIcon,
} from "@mui/icons-material";
import NavBar from "./NavBar.js";
import HousingDialogContent from "./cards/HousingDialogContent.js";
import AddGroupDialog from "./cards/AddGroupDialog.js";
import NoGroups from "./cards/NoGroups.js";

// react.school/material-ui

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

  const handleCreateHousingCard = (housingCardData) => {
    console.log(housingCardData); // handle the submitted housing card data here
    handleDialogClose("housingCard");
  };

  const handleChange = (event) => {
    setVal(event.target.value);
  };

  const data = [
    { name: "Lark", address: "2100 Nueces Street, Austin, Texas" },
    { name: "Ion", address: "2100 San Antonio St, Austin, Texas" },
  ];

  const [localData, setLocalData] = useState({ users: [], apartmentData: [] });

  const [userGroupID, setUserGroupID] = useState(window.localStorage.getItem("groupID"));
  //RUNS ON FIRST RENDER to get groupID, if it exists
  useEffect(() => {
    const userID = window.localStorage.getItem("userID");
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
            apartmentData: groupData.apartmentData,
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
        console.log("add apartment");
        handleDialogOpen("housingCard");
      },
    },
    {
      icon: "Group",
      name: "Add Group Member",
      tooltipTitle: "Add Group Member",
      onClick: () => {
        console.log("add group member");
        handleDialogOpen("group");
      },
    },
    {
      icon: <Save />,
      name: "Save",
      tooltipTitle: "Save",
      onClick: () => {
        console.log("save");
      },
    },
  ];

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
            style={{ minHeight: "100vh" }}
          >
            <Grid item xs={12} sm={6} md={6} sx={{ borderRadius: 0 }}>
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
              <Box component="form" noValidate sx={{ width: 350, my: 2 }}>
                <FormControl>
                  <Select
                    sx={{ ml: 14 }}
                    //disableunderline
                    IconComponent={ExpandMoreIcon}
                    value={val}
                    onChange={handleChange}
                  >
                    <MenuItem value={0}>Roommate 1</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>

            <Grid
              container
              spacing={2}
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
              sx={{ flexGrow: 1, width: 1250, mt: 4 }}
            >
              {/* https://mui.com/material-ui/react-card/ */}
              {data.map((elem) => (
                <Grid item xs={12} sm={6} md={4} key={data.indexOf(elem)}>
                  <Card>
                    <CardHeader
                      title={`${elem.name}`}
                      subheader={`${elem.address}`}
                    />
                    <CardContent>
                      <Typography variant="h5" gutterBottom>
                        other stuff
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

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
          </Grid>
        )}
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

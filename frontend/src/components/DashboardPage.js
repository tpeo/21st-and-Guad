import React, { useState } from "react";
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

// react.school/material-ui

const Transition = React.forwardRef(function Transition(props, ref) {
  //return <Slide direction="up" ref={ref} {...props} />;
  return <Zoom in ref={ref} {...props} />;
});

function DashboardPage() {
  const [val, setVal] = useState("");

  // controls the open/close state of the speed dial
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  // controls the open/close state of the housing card dialog
  const [openHousingDialog, setOpenHousingDialog] = useState(false);
  const handleDialogClose = () => {
    setOpenHousingDialog(false);
  };
  const handleCreateHousingCard = (housingCardData) => {
    console.log(housingCardData); // handle the submitted housing card data here
    handleClose();
  };

  // controls the open/close state of the group dialog
  const [openGroupDialog, setOpenGroupDialog] = useState(false);
  const handleGroupDialogClose = () => {
    setOpenGroupDialog(false);
  };

  const handleChange = (event) => {
    setVal(event.target.value);
  };

  const data = [
    { name: "Lark", address: "2100 Nueces Street, Austin, Texas" },
    { name: "Ion", address: "2100 San Antonio St, Austin, Texas" },
  ];

  const actions = [
    {
      icon: <AddIcon />,
      name: "Add Apartment Card",
      tooltipTitle: "Add Apartment",
      delay: 100,
      onClick: () => {
        console.log("add apartment");
        setOpenHousingDialog(true);
      },
    },
    {
      icon: <GroupAdd />,
      name: "Add Group Member",
      tooltipTitle: "Add Group Member",
      onClick: () => {
        console.log("add group member");
        setOpenGroupDialog(true);
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
          icon={<SpeedDialIcon openIcon={<Hive />} />}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          direction="left"
          open={open}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              delay={action.delay}
              icon={action.icon}
              tooltipTitle={action.tooltipTitle}
              onClick={action.onClick}
              FabProps={{ size: "medium" }}
            />
          ))}
        </SpeedDial>
      </Grid>
      {/* dialog that can go anywhere on the page bc it pops up from middle */}
      <Dialog
        open={openHousingDialog}
        onClose={handleDialogClose}
        TransitionComponent={Transition}
        keepMounted
        maxWidth="lg"
        scroll="paper"
      >
        <DialogContent>
          <HousingDialogContent
            onSubmit={handleCreateHousingCard}
            onClose={handleDialogClose}
          />
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
      <AddGroupDialog
        open={openGroupDialog}
        onClose={handleGroupDialogClose}
        TransitionComponent={Transition}
      ></AddGroupDialog>
    </ThemeProvider>
  );
}

export default DashboardPage;

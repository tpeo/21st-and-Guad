import React, { useState, useContext } from "react";
import {
    SpeedDial,
    SpeedDialAction,
    SpeedDialIcon,
    Dialog,
    DialogActions,
    DialogContent,
    Grid,
    Zoom,
  } from "@mui/material";

  import {
    Save,
    Hive,
  } from "@mui/icons-material";
  
  import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
  import HousingDialogContent from "./cards/HousingDialogContent.js";
  import AddGroupDialog from "./cards/AddGroupDialog.js";


  
  
  import { appTheme, AmenitiesIcon} from "./Theme.js";

  


   
  


function SpeedDialButton() {

  const Transition = React.forwardRef(function Transition(props, ref) {
    //return <Slide direction="up" ref={ref} {...props} />;
    return <Zoom in ref={ref} {...props} />;
  });
  

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

  const handleCreateHousingCard = (housingCardData) => {
    console.log(housingCardData); // handle the submitted housing card data here
    handleDialogClose("housingCard");
  };



  const handleDialogOpen = (dialogName) => {
    setDialogs((prevState) => ({ ...prevState, [dialogName]: true }));
  };

  const handleDialogClose = (dialogName) => {
    setDialogs((prevState) => ({ ...prevState, [dialogName]: false }));
  };

   // create an object to hold the open/close state and handlers for the different dialogs
   const [dialogs, setDialogs] = useState({
    speedDial: false,
    housingCard: false,
    group: false,
  });
  return(
    <Grid>
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
</Grid>

  )

}

export default SpeedDialButton;

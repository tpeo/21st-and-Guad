import { useState } from "react";
import React from "react";
import { ThemeProvider } from "@mui/material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { appTheme } from "./Theme";
import NavBar from "./NavBar";
import CreateHousingCard from "./cards/CreateHousingCard";
import Slide from "@mui/material/Slide";
import Paper, { PaperProps } from "@mui/material/Paper";
import Draggable from "react-draggable";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function MeetingPage() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateHousingCard = (housingCardData) => {
    console.log(housingCardData); // handle the submitted housing card data here
    handleClose();
  };

  return (
    <ThemeProvider theme={appTheme}>
      <NavBar></NavBar>
      {/* meeting */}
      <Button variant="contained" onClick={handleClickOpen}>
        Create Housing Card
      </Button>
      <Draggable handle="#dialog-handle">
        <Dialog
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
          keepMounted
          maxWidth="lg"
          scroll="paper"
        >
          
          <DialogContent>
            <CreateHousingCard
              onSubmit={handleCreateHousingCard}
              onClose={handleClose}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Draggable>
    </ThemeProvider>
  );
}

export default MeetingPage;

import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
} from "@mui/material";
import { appTheme } from "../Theme";
import HousingDialogContent from "./HousingDialogContent";
import { ThemeProvider, Zoom, Slide } from "@mui/material";
import Paper, { PaperProps } from "@mui/material/Paper";
import Draggable from "react-draggable";
import { Container } from "@mui/system";

const Transition = React.forwardRef(function Transition(props, ref) {
  //return <Slide direction="up" ref={ref} {...props} />;
  return <Zoom in ref={ref} {...props} />;
});

//intermediate component used to handle popups & information
function HousingDialogHandler() {
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
      <Box
        sx={{
          height: "80vh",
          display: "flex",
          flexDirection: 'column',
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button variant="contained" onClick={handleClickOpen}>
          Create Housing Card
        </Button>
      </Box>

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
            <HousingDialogContent
              onSubmit={handleCreateHousingCard}
              onClose={handleClose}
            />
          </DialogContent>
          <DialogActions>
            {/* <Button onClick={handleClose} color="primary">
              Cancel
            </Button> */}
          </DialogActions>
        </Dialog>
      </Draggable>
    </ThemeProvider>
  );
}

export default HousingDialogHandler;

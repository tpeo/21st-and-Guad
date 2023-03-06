import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
  Snackbar,
  IconButton,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { appTheme } from "../Theme.js";
import MuiAlert from "@mui/material/Alert";
import { Close as CloseIcon } from "@mui/icons-material";

function AddGroupDialog({ open, onClose, TransitionComponent }) {
  const groupID = window.localStorage.getItem("groupID");
  const userID = window.localStorage.getItem("userID");

  const [val, setVal] = useState(
    `http://localhost:3000/invite?groupID=${groupID}&userID=${userID}`
  );
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const handleCopyLink = () => {
    navigator.clipboard.writeText(val);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <ThemeProvider theme={appTheme}>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="form-dialog-title "
        TransitionComponent={TransitionComponent}
        maxWidth="lg"
      >
        <DialogTitle id="form-dialog-title" style={{ textAlign: "center" }}>
          Add a Roommate
          <IconButton
            style={{ position: "absolute", top: 10, right: 0 }}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent style={{ padding: "8px 24px" }}>
          <DialogContentText style={{ marginBottom: "16px", marginRight: "10vw"}}>
            Share this link to add a roommate to your hive.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            InputProps={{ readOnly: true }}
            id="name"
            label="Link"
            type="text"
            fullWidth
            size="small"
            value={val}
            style={{ marginBottom: "16px", marginTop: "0px" }}
          />
        </DialogContent>
        <DialogActions style={{ marginTop: "-20px", marginBottom: "5px" }}>
          <Button
            onClick={handleCopyLink}
            size="small"
            color="primary"
            variant="outlined"
          >
            Copy Link
          </Button>
        </DialogActions>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={1500}
          onClose={handleCloseSnackbar}
        >
          <MuiAlert onClose={handleCloseSnackbar} severity="success">
            Link copied to clipboard
          </MuiAlert>
        </Snackbar>
      </Dialog>
    </ThemeProvider>
  );
}

export default AddGroupDialog;

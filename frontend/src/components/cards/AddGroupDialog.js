import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
  Zoom,
  Slide,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { appTheme } from "../Theme.js";

function AddGroupDialog({open, onClose, TransitionComponent}) {
    return(
        <ThemeProvider theme={appTheme}>
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title" TransitionComponent={TransitionComponent}>
            <DialogTitle id="form-dialog-title">Add a Roommate</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Share this link to add a roommate to your hive.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Group Name"
                    type="text"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                {/* button to copy link inside text field */}
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={onClose} color="primary">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
        </ThemeProvider>
    )
}

export default AddGroupDialog;
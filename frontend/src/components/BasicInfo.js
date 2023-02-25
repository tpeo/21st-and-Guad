import React, { useEffect, useState, useContext } from "react";
import "../App.css";
import "./ApartmentForm.css";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {appTheme} from "./Theme.js";

function BasicInfo({ formData, setFormData }) {

      return (
        <>           
              <Typography component="h1" 
                sx={{fontWeight: appTheme.typography.fontWeightBold, display: 'flex',
                flexDirection: 'column', alignItems: 'center', fontSize: appTheme.typography.h1.fontSize}}>
                  Create an Account
              </Typography>

                {/* implement this later https://developers.google.com/identity/gsi/web/reference/js-reference */}
                <Button type="submit" fullWidth variant="contained" disableElevation
                    sx={{ mt: 3, mb: 2, backgroundColor: appTheme.palette.primary.grey2, color: '#000000'}}
                >
                  Sign up with Google
                </Button>

                <Typography component="h5" sx={{fontWeight: 600, mb: -1.5}}>
                  Email
                </Typography>

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    name="email"
                    autoFocus
                    sx={{mb: 2.5}}

                    value={formData.email}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      });
                    }}
                />

                <Typography component="h5" sx={{fontWeight: 600,  mb: -1.5}}>
                  Password
                </Typography>

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  type="password"
                  id="password"
                  sx={{mb: 2.5}}
                  inputProps={{ minLength: 6 }}

                  value={formData.password}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        password: e.target.value,
                      });
                    }}
                />

                <Typography component="h5" sx={{fontWeight: 600,  mb: -1.5}}>
                  Confirm Password
                </Typography>

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  type="password"
                  id="cpassword"
                />
          </>       
      );

}

export default BasicInfo;

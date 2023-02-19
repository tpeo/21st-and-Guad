import React, { useEffect, useState, useContext } from "react";import "../App.css";
import "./ApartmentForm.css";
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import {appTheme} from "./Theme.js";




function AboutInfo({ formData, setFormData }) {

      return (
        <>        
        <Typography component="h1" 
                sx={{fontWeight: appTheme.typography.fontWeightBold, display: 'flex',
                flexDirection: 'column', alignItems: 'center', fontSize: appTheme.typography.h1.fontSize, mb: 2}}>
                  Get started by letting us know more about yourself
        </Typography>


        {/* use css overlay for 'edit' */}
        <input accept="image/*" id="upload-avatar-pic" type="file" hidden />
        <label htmlFor="upload-avatar-pic">
            <IconButton component="span" sx={{display: 'flex',
                flexDirection: 'column', alignItems: 'center',}}  >
                <Avatar 
                    style={{
                    margin: "10px",
                    width: "60px",
                    height: "60px",
              
                    }} 
                />
            </IconButton>
        </label>

        <Typography component="h5" sx={{fontWeight: 600}}>
          Name (First, Last)
        </Typography>

        <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            name="name"
            autoFocus
            sx={{mb: 2.5}}

            value={formData.name}
            onChange={(e) => {
              setFormData({
                ...formData,
                name: e.target.value,
              });
            }}
        />

        <Typography component="h5" sx={{fontWeight: 600, mb: 1}}>
          Gender
        </Typography>

        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label"></InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formData.gender}
            onChange={(e) => {
              setFormData({
                ...formData,
                gender: e.target.value,
              });
            }}
        >
            <MenuItem value={"Male"}>Male</MenuItem>
            <MenuItem value={"Female"}>Female</MenuItem>
            <MenuItem value={"Other"}>Other</MenuItem>
        </Select>
        </FormControl>
    
        </>   
      );

}

export default AboutInfo;

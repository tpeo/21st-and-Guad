import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import InputAdornment from "@mui/material/InputAdornment";
import MenuIcon from "@mui/icons-material/Menu";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { appTheme } from "./Theme.js";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import NavBar from "./NavBar.js";

// react.school/material-ui

function DashboardPage() {
  const [val, setVal] = useState(1);

  const handleChange = (event) => {
    setVal(event.target.value);
  };

  const iconComponent = (props) => {
    return;
  };

  const data = [
    { name: "Lark", address: "2100 Nueces Street, Austin, Texas" },
    { name: "Ion", address: "2100 San Antonio St, Austin, Texas" },
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
                sx={{ml: 14}}
                disableUnderline
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
            
        {/* floating action button w/ multiple options */}
        
      </Grid>
    </ThemeProvider>
  );
}

export default DashboardPage;

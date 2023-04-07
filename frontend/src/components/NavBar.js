import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <AppBar elevation={0} position="static" sx={{ height: "10vh" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/dashboard">
            <img
              src={process.env.PUBLIC_URL + "/images/logo.png"}
              alt="Logo"
              style={{ width: "120px", height: "50px" }}
            />
          </Link>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "right",
              mr: 5,
            }}
          >
            <Button
              component={Link}
              to="/dashboard"
              sx={{
                my: 2,
                color: "white",
                display: "block",
                textAlign: "center",
              }}
            >
              Dashboard
            </Button>

            <Button
              component={Link}
              to="/map"
              sx={{
                my: 2,
                color: "white",
                display: "block",
                textAlign: "center",
              }}
            >
              Map
            </Button>

            <Button
              component={Link}
              to="/meeting"
              sx={{
                my: 2,
                color: "white",
                display: "block",
                textAlign: "center",
              }}
            >
              Meetings
            </Button>
          </Box>

          <Tooltip title="User Profile">
            <IconButton component={Link} to="/profile" sx={{ p: 0, marginLeft: 1, mt: -1 }}>
              <Avatar />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ButtonBase, Tooltip, Zoom } from "@mui/material";
import { useState, useEffect } from "react";

export const AmenitiesIcon = (props) => {
  // Set up a state variable for hover
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(props.active);

  useEffect(() => {
    setActive(props.active);
  }, [props.active, props.reset]);

  const handleClick = () => {
    if (props.clickable) {
      setActive(!active);
      if (props.onClick) {
        props.onClick();
      }
    }
  };

  return (
    <Tooltip title={props.iconName} arrow TransitionComponent={Zoom}>
      <ButtonBase
        style={{
          // Set the width and height of the button based on the 'size' prop
          width: props.size === "small" ? "50px" : "75px",
          height: props.size === "small" ? "50px" : "75px",
          marginRight: props.marginRight,
          marginBottom: 5,
          borderRadius: "50%",
          alignItems: "center",
          justifyContent: "center",
          // Set the background color of the button based on the 'active' prop and the hover state
          backgroundColor: active
            ? //active is true
              hover
              ? appTheme.palette.primary.light
              : appTheme.palette.primary.main
            : //active is false
              // hover
              // ? appTheme.palette.primary.darkgrey :
              appTheme.palette.primary.lightgrey,
        }}
        // Add event handlers to change the hover state
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        // Add an onClick handler to the button
        onClick={handleClick}
      >
        <img
          // Set the image source based on the 'iconName' prop
          src={
            process.env.PUBLIC_URL +
            `/images/amenitiesIcons/${props.iconName}.png`
          }
          style={{
            // Set the maximum width and height of the image based on the 'size' prop
            maxWidth: props.size === "small" ? "30px" : "50px",
            maxHeight: props.size === "small" ? "30px" : "50px",
          }}
          alt={props.iconName}
        />
      </ButtonBase>
    </Tooltip>
  );
};

export const appTheme = createTheme({
  palette: {
    primary: {
      main: "#EACA78",
      lightgrey: "#D9D9D9",
      darkgrey: "#838181",
      grey2: "#F5F5F5",
      white: "#FFFFFF",
      lightyellow: "#fefdfa",
    },
    secondary: {
      main: "#D9D9D9",
    },
  },
  root: {},
  typography: {
    fontFamily: "Inter",
    fontWeightMedium: 500,
    fontWeightBold: 700,
    subtitle1: {
      fontSize: 12,
    },
    h1: {
      fontSize: 23,
    },
    button: {
      textTransform: "none",
      fontFamily: "Inter",
      fontWeight: 600,
      height: 45,
    },
  },
  shape: {
    borderRadius: 9, // defaults to 4
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
          @font-face {
            font-family: 'Inter';
            font-style: normal;
          }
        `,
    },
  },
});

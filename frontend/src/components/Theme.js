import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ButtonBase } from "@mui/material";
import { useState } from "react";

export const AmenitiesIcon = (props) => {
  // Set up a state variable for hover
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(props.active);

  return (
    <ButtonBase
      style={{
        // Set the width and height of the button based on the 'size' prop
        width: props.size === "small" ? "50px" : "75px",
        height: props.size === "small" ? "50px" : "75px",
        marginRight: props.marginRight,
        marginBottom: props.marginBottom,
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
           appTheme.palette.primary.lightgrey
      }}
      // Add event handlers to change the hover state
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      // Add an onClick handler to the button
      onClick={() => {
        // Toggle the 'active' state
        setActive(!active);
        // Call the 'onClick' prop if it exists (for custom functions)
        if (props.onClick) {
          props.onClick();
        }
      }}
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
      lightyellow: "#fefdfa"
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

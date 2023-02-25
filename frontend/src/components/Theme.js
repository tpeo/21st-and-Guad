import { createTheme, ThemeProvider } from '@mui/material/styles';


export const appTheme = createTheme({
    palette: {
        primary: {
          main: '#838181',
          grey2: '#F5F5F5',
        },
        secondary: {
          main: '#D9D9D9',
        },
      },
    root: {
      
    },
    typography: {
        fontFamily: 'Inter',
        fontWeightMedium: 500,
        fontWeightBold: 700,
        subtitle1: {
          fontSize: 12,
        },
        h1: {
          fontSize: 23,
        },
        button: {
          textTransform: 'none',
          fontFamily: 'Inter',
          fontWeight: 600,
          height: 45
        },
      },
    shape: {
      borderRadius: 9,    // defaults to 4
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          @font-face {
            font-family: 'Inter';
            font-style: normal;
          }
        `,
      }
    }
  });
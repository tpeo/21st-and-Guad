import "./App.css";
import { Routes, Route } from "react-router-dom";
import ApartmentForm from "./components/ApartmentForm";
import HomePage from "./components/BasicInfo";
import LoginForm from "./components/LoginForm";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import DashboardPage from "./components/DashboardPage";
import { appTheme } from "./components/Theme";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Wrap the routes with the AuthContext provider to make the authentication context available to all routes
import AuthContext, { useProvideAuth } from "./contexts/AuthContext";

function App() {
  return (
    // Wrap the routes with the AuthContext provider to make the 
    // authentication context available to all routes
    <AuthContext.Provider value={useProvideAuth()}>
      <ThemeProvider theme={appTheme}>
      <CssBaseline />
    <Routes>
      {/* Route to the login page (LoginForm) */}
      <Route path="/" index element={<LoginPage />}></Route>
      <Route path="/login" index element={<LoginPage />}></Route>
      <Route path="/register" index element={<RegisterPage />}></Route>
      <Route path="/dashboard" index element={<ApartmentForm />}></Route>
      
    </Routes>
    </ThemeProvider>
    </AuthContext.Provider>
  );
}

export default App;

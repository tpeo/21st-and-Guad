import "./App.css";
import { Routes, Route } from "react-router-dom";
import ApartmentForm from "./components/ApartmentForm";
import HomePage from "./components/BasicInfo";
import LoginForm from "./components/LoginForm";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import DashboardPage from "./components/DashboardPage";
import MapPage from "./components/MapPage";
import MeetingPage from "./components/MeetingPage";
import ProfilePage from "./components/ProfilePage";
import InvitePage from "./components/InvitePage";
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
      <Route path="/dashboard" index element={<DashboardPage />}></Route>
      <Route path="/map" index element={<MapPage />}></Route>
      <Route path="/profile" index element={<ProfilePage />}></Route>
      <Route path="/meeting" index element={<MeetingPage />}></Route>
      <Route path="/invite" index element={<InvitePage />} />
    </Routes>
    </ThemeProvider>
    </AuthContext.Provider>
  );
}

export default App;

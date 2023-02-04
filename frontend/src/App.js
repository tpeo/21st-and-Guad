import "./App.css";
import { Routes, Route } from "react-router-dom";
import ApartmentForm from "./components/ApartmentForm";
import LoginForm from "./components/LoginForm";

// Wrap the routes with the AuthContext provider to make the authentication context available to all routes
import AuthContext, { useProvideAuth } from "./contexts/AuthContext";


function App() {
  return (
    // Wrap the routes with the AuthContext provider to make the 
    // authentication context available to all routes
    <AuthContext.Provider value={useProvideAuth()}>
    <Routes>
      {/* Route to the main page (ApartmentForm) */}
      <Route path="/" index element={<ApartmentForm></ApartmentForm>}></Route>
      {/* Route to the login page (LoginForm) */}
      <Route path="/login" index element={<LoginForm />}></Route>
    </Routes>
    </AuthContext.Provider>
  );
}

export default App;

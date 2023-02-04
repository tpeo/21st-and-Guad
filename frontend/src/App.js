import "./App.css";
import { Routes, Route } from "react-router-dom";
import ApartmentForm from "./components/ApartmentForm";
import LoginForm from "./components/LoginForm";
import AuthContext, { useProvideAuth } from "./contexts/AuthContext";


function App() {
  return (
    <AuthContext.Provider value={useProvideAuth()}>
    <Routes>
      <Route path="/" index element={<ApartmentForm></ApartmentForm>}></Route>
      <Route path="/login" index element={<LoginForm />}></Route>
    </Routes>
    </AuthContext.Provider>
  );
}

export default App;

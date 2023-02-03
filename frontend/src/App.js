import "./App.css";
import { Routes, Route, Router } from "react-router-dom";
import ApartmentForm from "./components/ApartmentForm";
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ApartmentForm>

        </ApartmentForm>
      </header>
    </div>
    // <Routes>
    //   <Route path="/" index element={<ApartmentForm></ApartmentForm>}></Route>
    //   <Route path="/login" index element={<LoginForm />}></Route>
    // </Routes>
  );
}

export default App;

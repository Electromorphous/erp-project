import React from "react";
// import RoleCreation from "./components/containers/Forms/RoleCreation";
import Login from "./containers/Forms/Login";
import Header from "./containers/Forms/Header";
import ForgotPassword from "./containers/Forms/FogotPassword";
import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
} from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Header" element={<Login />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

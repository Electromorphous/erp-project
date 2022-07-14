import React from "react";
import Login from "./containers/Login/Login";
import ThemeContext from "./utils/ThemeContext";
import ForgotPassword from "./containers/ForgotPassword/ForgotPassword";
import ResetPassword from "./containers/ResetPassword/ResetPassword";
import ModuleCreation from "./containers/Organization/OrganizationCreation";
import ModuleIndex from "./containers/Organization/OrganizationIndex";
import ModuleUpdate from "./containers/Organization/OrganizationUpdate";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <ThemeContext>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route exact path="/ForgotPassword" element={<ForgotPassword />} />
          <Route exact path="/ResetPassword" element={<ResetPassword />} />
          <Route
            exact
            path="/OrganizationCreation"
            element={<ModuleCreation />}
          />
          <Route exact path="/OrganizationIndex" element={<ModuleIndex />} />
          <Route
            exact
            path="/OrganizationUpdate/:id"
            element={<ModuleUpdate />}
          />
        </Routes>
      </Router>
    </ThemeContext>
  );
}

export default App;

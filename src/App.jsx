import React from "react";
import Login from "./containers/Login/Login";
import ThemeContext from "./utils/ThemeContext";
import ForgotPassword from "./containers/ForgotPassword/ForgotPassword";
import ResetPassword from "./containers/ResetPassword/ResetPassword";
import OrganizationCreation from "./containers/Organization/OrganizationCreation";
import OrganizationIndex from "./containers/Organization/OrganizationIndex";
import OrganizationUpdate from "./containers/Organization/OrganizationUpdate";
import ModuleCreation from "./containers/Module/ModuleCreation";
import ModuleIndex from "./containers/Module/ModuleIndex";
import ModuleUpdate from "./containers/Module/ModuleUpdate";
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
            element={<OrganizationCreation />}
          />
          <Route
            exact
            path="/OrganizationIndex"
            element={<OrganizationIndex />}
          />
          <Route
            exact
            path="/OrganizationUpdate/:id"
            element={<OrganizationUpdate />}
          />
          <Route exact path="/ModuleCreation" element={<ModuleCreation />} />
          <Route exact path="/ModuleIndex" element={<ModuleIndex />} />
          <Route exact path="/ModuleUpdate/:id" element={<ModuleUpdate />} />
        </Routes>
      </Router>
    </ThemeContext>
  );
}

export default App;

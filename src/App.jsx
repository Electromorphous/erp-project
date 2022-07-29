import React from "react";
import ThemeContext from "./utils/ThemeContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./containers/Login/Login";
import RoleIndex from "./containers/Role/RoleIndex";
import RoleCreation from "./containers/Role/RoleCreation";
import RoleUpdate from "./containers/Role/RoleUpdate";

function App() {
  return (
    <ThemeContext>
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="RoleIndex" element={<RoleIndex />}></Route>
          <Route path="RoleCreation" element={<RoleCreation />}></Route>
          <Route path="RoleUpdate/:id" element={<RoleUpdate />}></Route>
        </Routes>
      </Router>
    </ThemeContext>
  );
}

export default App;

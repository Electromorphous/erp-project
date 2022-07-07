import React from "react";
import Login from "./containers/Login/Login";
import ThemeContext from "./utils/ThemeContext";
import ForgotPassword from "./containers/ForgotPassword/ForgotPassword";
import ResetPassword from "./containers/ResetPassword/ResetPassword";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ModuleCreation from "./containers/Module/ModuleCreation";
import ModuleIndex from "./containers/Module/ModuleIndex";
import ModuleUpdate from "./containers/Module/ModuleUpdate";
import MenuCreation from "./containers/Menu/MenuCreation";
import SubmenuCreation from "./containers/SubMenu/SubmenuCreation";
import SubmenuIndex from "./containers/SubMenu/SubmenuIndex";
import UserAssignment from "./containers/SubMenu/UserAssignment";
import SubmenuUpdate from "./containers/SubMenu/SubmenuUpdate";
import MenuIndex from "./containers/Menu/MenuIndex";
import MenuUpdate from "./containers/Menu/MenuUpdate";
import GraduationCreation from "./containers/Graduation/GraduationCreation";
import GraduationIndex from "./containers/Graduation/GraduationIndex";
import GraduationUpdate from "./containers/Graduation/GraduationUpdate";
import CustomSelectSearch from "./components/Inputs/CustomSelectSearch";


function App() {
  return (
    <ThemeContext>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route
            exact
            path="/ForgotPassword"
            element={<ForgotPassword />}
          ></Route>
          <Route
            exact
            path="/ResetPassword"
            element={<ResetPassword />}
          ></Route>
          <Route
            exact
            path="/ModuleCreation"
            element={<ModuleCreation />}
          ></Route>
          <Route exact path="/MenuCreation" element={<MenuCreation />}></Route>
          <Route exact path="/MenuIndex" element={<MenuIndex />} />
          <Route exact path="/MenuUpdate/:id" element={<MenuUpdate />} />

          <Route
            exact
            path="/SubmenuCreation"
            element={<SubmenuCreation />}
          ></Route>
          <Route exact path="SubmenuIndex" element={<SubmenuIndex />} />
          <Route exact path="SubmenuUpdate/:id" element={<SubmenuUpdate />} />
          <Route exact path="UserAssignment/:id" element={<UserAssignment />} />
          <Route exact path="/ModuleIndex" element={<ModuleIndex />}></Route>
          <Route exact path="/ModuleUpdate/:id" element={<ModuleUpdate />} />
          <Route
            exact
            path="/GraduationCreation"
            element={<GraduationCreation />}
          />
          <Route exact path="/GraduationIndex" element={<GraduationIndex />} />
          <Route
            exact
            path="/CustomSelectSearch"
            element={<CustomSelectSearch />}
          />
          <Route
            exact
            path="/GraduationUpdate/:id"
            element={<GraduationUpdate />}
          />
         
        </Routes>
      </Router>
    </ThemeContext>
  );
}

export default App;

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
import OrganizationCreation from "./containers/Organization/OrganizationCreation";
import OrganizationIndex from "./containers/Organization/OrganizationIndex";
import OrganizationUpdate from "./containers/Organization/OrganizationUpdate";
import JobtypeCreation from "./containers/JobType/JobtypeCreation";
import JobtypeIndex from "./containers/JobType/JobtypeIndex";
import JobtypeUpdate from "./containers/JobType/JobtypeUpdate";
import SchoolCreation from "./containers/School/SchoolCreation";
import SchoolIndex from "./containers/School/SchoolIndex";
import SchoolUpdate from "./containers/School/SchoolUpdate";
import EmptypeCreation from "./containers/EmployeeType/EmptypeCreation";
import EmptypeIndex from "./containers/EmployeeType/EmptypeIndex";
import EmptypeUpdate from "./containers/EmployeeType/EmptypeUpdate";
import CurrencytypeCreation from "./containers/CurrencyType/CurrencytypeCreation";
import CurrencytypeIndex from "./containers/CurrencyType/CurrencytypeIndex";
import CurrencytypeUpdate from "./containers/CurrencyType/CurrencytypeUpdate";
import BoardCreation from "./containers/Board/BoardCreation";
import BoardIndex from "./containers/Board/BoardIndex";
import BoardUpdate from "./containers/Board/BoardUpdate";
import AdmCategoryCreation from "./containers/AdmissionCategory/AdmCategoryCreation";
import AdmCategoryIndex from "./containers/AdmissionCategory/AdmCategoryIndex";
import AdmCategoryUpdate from "./containers/AdmissionCategory/AdmCategoryUpdate";
import AdmSubCategoryCreation from "./containers/AdmissionSubCategory/AdmSubCategoryCreation";
import AdmSubCategoryIndex from "./containers/AdmissionSubCategory/AdmSubCategoryIndex";
import AdmSubCategoryUpdate from "./containers/AdmissionSubCategory/AdmSubCategoryUpdate";
import ProgramtypeCreation from "./containers/ProgramType/ProgramtypeCreation";
import ProgramtypeIndex from "./containers/ProgramType/ProgramtypeIndex";
import ProgramtypeUpdate from "./containers/ProgramType/ProgramtypeUpdate";
import Tabs from "./containers/Tab/Tabs";
import AcademicYearCreation from "./containers/AcademicYear/AcademicYearCreation";
import AcademicYearIndex from "./containers/AcademicYear/AcademicYearIndex";
import AcademicYearUpdate from "./containers/AcademicYear/AcademicYearUpdate";
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

          <Route
            path="/OrganizationCreation"
            element={<OrganizationCreation />}
          ></Route>
          <Route
            path="/OrganizationIndex"
            element={<OrganizationIndex />}
          ></Route>
          <Route
            path="/OrganizationUpdate/:id"
            element={<OrganizationUpdate />}
          ></Route>
          <Route path="/JobtypeCreation" element={<JobtypeCreation />}></Route>
          <Route path="/JobtypeIndex" element={<JobtypeIndex />}></Route>
          <Route path="/JobtypeUpdate/:id" element={<JobtypeUpdate />}></Route>
          <Route path="/SchoolCreation" element={<SchoolCreation />} />
          <Route path="/SchoolIndex" element={<SchoolIndex />} />
          <Route path="/SchoolUpdate/:id" element={<SchoolUpdate />} />
          <Route path="/EmptypeCreation" element={<EmptypeCreation />} />
          <Route path="/EmptypeIndex" element={<EmptypeIndex />} />
          <Route path="/EmptypeUpdate/:id" element={<EmptypeUpdate />} />
          <Route
            path="/CurrencytypeCreation"
            element={<CurrencytypeCreation />}
          />
          <Route path="/CurrencytypeIndex" element={<CurrencytypeIndex />} />
          <Route
            path="/CurrencytypeUpdate/:id"
            element={<CurrencytypeUpdate />}
          />
          <Route path="/BoardCreation" element={<BoardCreation />} />
          <Route path="/BoardIndex" element={<BoardIndex />} />
          <Route path="/BoardUpdate/:id" element={<BoardUpdate />} />
          <Route
            path="/AdmCategoryCreation"
            element={<AdmCategoryCreation />}
          />
          <Route path="/AdmCategoryIndex" element={<AdmCategoryIndex />} />
          <Route
            path="/AdmCategoryUpdate/:id"
            element={<AdmCategoryUpdate />}
          />

          <Route
            path="/AdmSubCategoryCreation"
            element={<AdmSubCategoryCreation />}
          />
          <Route
            path="/AdmSubCategoryIndex"
            element={<AdmSubCategoryIndex />}
          />
          <Route
            path="/AdmSubCategoryUpdate/:id"
            element={<AdmSubCategoryUpdate />}
          />
          <Route
            path="/ProgramtypeCreation"
            element={<ProgramtypeCreation />}
          />
          <Route path="/ProgramtypeIndex" element={<ProgramtypeIndex />} />
          <Route
            path="/ProgramtypeUpdate/:id"
            element={<ProgramtypeUpdate />}
          />
          <Route path="/Tabs" element={<Tabs />} />
          <Route
            path="/AcademicYearCreation"
            element={<AcademicYearCreation />}
          />
          <Route path="/AcademicYearIndex" element={<AcademicYearIndex />} />
          <Route
            path="/AcademicYearUpdate/:id"
            element={<AcademicYearUpdate />}
          />
        </Routes>
      </Router>
    </ThemeContext>
  );
}

export default App;

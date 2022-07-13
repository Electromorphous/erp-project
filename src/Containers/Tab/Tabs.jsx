import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import SchoolCreation from "../School/SchoolCreation";
import SchoolIndex from "../School/SchoolIndex";
import CurrencytypeCreation from "../CurrencyType/CurrencytypeCreation";
import AdmCategoryCreation from "../AdmissionCategory/AdmCategoryCreation";
import AdmSubCategoryCreation from "../AdmissionSubCategory/AdmSubCategoryCreation";
import ProgramtypeCreation from "../ProgramType/ProgramtypeCreation";
import BoardCreation from "../Board/BoardCreation";
export default function AccessibleTabs1() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Currency Type" />
        <Tab label="Admission Category Creation" />
        <Tab label="Admission Sub Category Creation" />
        <Tab label="Program Type " />
        <Tab label="Board" />
      </Tabs>

      {value === 0 && <CurrencytypeCreation />}
      {value === 1 && <AdmCategoryCreation />}
      {value === 2 && <AdmSubCategoryCreation />}
      {value === 3 && <ProgramtypeCreation />}
      {value === 4 && <BoardCreation />}
    </>
  );
}

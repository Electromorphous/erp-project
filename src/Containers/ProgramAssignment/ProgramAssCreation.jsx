import { React, useState, useEffect } from "react";
import { Grid } from "@mui/material";
import Form from "../../components/Form";
import FormLayout from "../../components/FormLayout";
import CustomTextField from "../../components/Inputs/CustomTextField";
import CustomButton from "../../components/Inputs/CustomButton";
import SubmitData from "../../components/Api/SubmitData";
import CustomSelectSearchOne from "../../components/Inputs/CustomSelectSearchOne";
import axios from "axios";
import fetchData from "../../components/Api/fetchData";
import ApiUrl from "../../services/Api";
function ProgramAssCreation() {
  useEffect(() => {
    getAcademicyear();
    getSchool();
    getProgram();
    getGraduation();
    getProgramType();
  }, []);
  const [Data, setData] = useState({ active: true });
  const [AcademicData, setAcademicData] = useState([]);
  const [SchoolData, setSchoolData] = useState([]);
  const [ProgramData, setProgramData] = useState([]);
  const [GraduationData, setGraduationData] = useState([]);
  const [ProgramTypeData, setProgramTypeData] = useState([]);

  const getAcademicyear = () => {
    axios.get(`${ApiUrl}/academic/academic_year`).then((Response) => {
      setAcademicData(Response.data.data);
    });
  };
  const AcademicOptions = AcademicData.map((val) => ({
    value: val.ac_year_id,
    label: val.ac_year,
  }));
  const getSchool = () => {
    axios.get(`${ApiUrl}/institute/school`).then((Response) => {
      setSchoolData(Response.data.data);
    });
  };
  const SchoolOptions = SchoolData.map((val) => ({
    value: val.school_id,
    label: val.school_name,
  }));
  const getProgram = () => {
    axios.get(`${ApiUrl}/academic/Program`).then((Response) => {
      setProgramData(Response.data.data);
    });
  };
  const ProgramOptions = ProgramData.map((val) => ({
    value: val.program_id,
    label: val.program_name,
  }));
  const getGraduation = () => {
    axios.get(`${ApiUrl}/employee/graduation`).then((Response) => {
      setGraduationData(Response.data.data);
    });
  };
  const GraduationOptions = GraduationData.map((val) => ({
    value: val.graduation_id,
    label: val.graduation_name,
  }));
  const getProgramType = () => {
    axios.get(`${ApiUrl}/academic/ProgramType`).then((Response) => {
      setProgramTypeData(Response.data.data);
    });
  };
  const ProgramTypeOptions = ProgramTypeData.map((val) => ({
    value: val.program_type_id,
    label: val.program_type_name,
  }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(Data);

    let postData = await SubmitData("academic/ProgramAssigment", Data);
    console.log(postData);
    if (postData === 200) {
      window.location.href = "/ProgramAssIndex";
    }
    if (postData === 201) {
      window.location.href = "/ProgramAssIndex";
    }
  };

  function handleYear(e, v) {
    setData({
      ...Data,
      number_of_years: e.target.value,
      number_of_semester: 2 * e.target.value,
    });
  }
  function handleAcademicYear(e, v) {
    setData({
      ...Data,
      ac_year_id: v.value,
    });
  }
  function handleSchool(e, v) {
    setData({
      ...Data,
      school_id: v.value,
    });
  }
  function handleProgram(e, v) {
    setData({
      ...Data,
      program_id: v.value,
    });
  }
  function handleGraduation(e, v) {
    setData({
      ...Data,
      graduation_id: v.value,
    });
  }
  function handleProgramType(e, v) {
    setData({
      ...Data,
      program_type: v.label,
    });
  }

  return (
    <>
      <FormLayout>
        <Form onSubmit={handleSubmit}>
          <Grid
            container
            alignItems="center"
            justifyContent="flex-start"
            rowSpacing={2}
            columnSpacing={{ xs: 2, md: 4 }}
          >
            <>
              <Grid item xs={12} md={6}>
                <CustomSelectSearchOne
                  label="Academic Year"
                  options={AcademicOptions}
                  handleChange={handleAcademicYear}
                  name="ac_year"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomSelectSearchOne
                  label="School"
                  options={SchoolOptions}
                  handleChange={handleSchool}
                  name="school_name"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomSelectSearchOne
                  label="Program"
                  options={ProgramOptions}
                  handleChange={handleProgram}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomSelectSearchOne
                  label="Graduation"
                  options={GraduationOptions}
                  handleChange={handleGraduation}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomSelectSearchOne
                  label="Program Type"
                  options={ProgramTypeOptions}
                  handleChange={handleProgramType}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextField
                  label="Number Of Year"
                  handleChange={handleYear}
                />
                __
                <CustomTextField
                  label="Number Of Semester"
                  handleChange={handleYear}
                  value={Data.number_of_semester ?? ""}
                  disabled
                />
              </Grid>

              <Grid item xs={12}>
                <CustomButton label="Create" />
              </Grid>
            </>
          </Grid>
        </Form>
      </FormLayout>
    </>
  );
}
export default ProgramAssCreation;

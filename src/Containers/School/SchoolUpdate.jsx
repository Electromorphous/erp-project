import { React, useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import Form from "../../components/Form";
import FormLayout from "../../components/FormLayout";
import { useParams } from "react-router-dom";
import CustomTextField from "../../components/Inputs/CustomTextField";
import CustomRadioButtons from "../../components/Inputs/CustomRadioButtons";
import CustomButton from "../../components/Inputs/CustomButton";
import SubmitData from "../../components/Api/SubmitData";

import CustomSelectSearchOne from "../../components/Inputs/CustomSelectSearchOne";
import CustomSelectSearch from "../../components/Inputs/CustomSelectSearch";
import fetchData from "../../components/Api/fetchData";
import ApiUrl from "../../services/Api";
import axios from "axios";
import UpdateData from "../../components/Api/UpdateData";
function SchoolUpdate() {
  const { id } = useParams();
  useEffect(() => {
    getOrganization();
    getJobType();
    getSchool();
  }, []);
  const [Data, setData] = useState({ active: true });
  const [Data1, setData1] = useState([]);
  const [Data2, setData2] = useState([]);
  const [Orgdata, setOrgdata] = useState([]);
  const [Jobtype, setJobtype] = useState([]);
  const [mail, setMail] = useState([]);

  const getOrganization = () => {
    axios.get(`${ApiUrl}/institute/org`).then((Response) => {
      setOrgdata(Response.data.data);
    });
  };
  const getJobType = () => {
    axios.get(`${ApiUrl}/employee/JobType`).then((Response) => {
      setJobtype(Response.data.data);
    });
  };

  const getSchool = () => {
    axios.get(`${ApiUrl}/institute/school/${id}`).then((Response) => {
      setData(Response.data.data);
    });
  };

  const optionWeb = [
    {
      value: true,
      label: "Yes",
    },
    {
      value: false,
      label: "No",
    },
  ];

  const options = Orgdata.map((m) => ({
    label: m.org_name,
    value: m.org_id,
  }));
  const Jobtypeoptions = Jobtype.map((m) => ({
    label: m.job_short_name,
    value: m.job_type_id,
  }));

  const handleChange = (e) => {
    setData((prev) => ({
      ...prev,

      [e.target.name]: e.target.value,
    }));
  };
  const handleJobtype = (e, v) => {
    v.map((m) => {
      Data1.push(m.value);
      Data2.push(m.label);
    });
    setData1([]);
    setData2([]);
    setData({
      ...Data,
      job_type_id: Data1.toString(),
      job_type_name: Data2.toString(),
    });
  };

  const handleGroup = (e, v) => {
    setData((prev) => ({ ...prev, org_id: v.value, org_name: v.label }));
  };
  const handleEmail = (e) => {
    setData((prev) => ({
      ...prev,
      email_id: e.target.value + "@acharya.ac.in",
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(Data);

    let postData = await UpdateData("institute/school", Data, id);
    console.log(postData);
    if (postData === 200) {
      window.location.href = "/SchoolIndex";
    }
    if (postData === 201) {
      window.location.href = "/SchoolIndex";
    }
  };

  return (
    <>
      <FormLayout>
        <Form onSubmit={handleSubmit}>
          <Box>
            <Grid
              container
              justifyContents="flex-start"
              alignItems="center"
              rowSpacing={2}
              columnSpacing={{ xs: 2, md: 4 }}
            >
              <Grid item xs={12} md={6}>
                <CustomTextField
                  label="School"
                  name="school_name"
                  handleChange={handleChange}
                  value={Data.school_name ?? ""}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextField
                  label="Short Name"
                  name="school_name_short"
                  value={Data.school_name_short ?? ""}
                  handleChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomSelectSearchOne
                  options={options}
                  label="Acharya Group"
                  value={Data.org_name ?? ""}
                  handleChange={handleGroup}
                  name="org_id"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomSelectSearch
                  options={Jobtypeoptions}
                  value={Data.job_type_name ?? ""}
                  label="Job Type"
                  handleChange={handleJobtype}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextField
                  type="text"
                  name="email_id"
                  label="Email"
                  value={Data.email_id ?? ""}
                  handleChange={handleEmail}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextField
                  type="number"
                  label="Reference Number"
                  name="ref_no"
                  value={Data.ref_no ?? ""}
                  handleChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextField
                  type="number"
                  name="priority"
                  label="Priority"
                  value={Data.priority ?? ""}
                  handleChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextField
                  type="color"
                  name="school_color"
                  label="Select Color "
                  value={Data.school_color ?? ""}
                  handleChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomRadioButtons
                  options={optionWeb}
                  name="web_status"
                  label="Web Status "
                  value={Data.web_status ?? ""}
                  handleChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <CustomButton label="Submit" fullWidth />
              </Grid>
            </Grid>
          </Box>
        </Form>
      </FormLayout>
    </>
  );
}
export default SchoolUpdate;

import { React, useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import Form from "../../components/Form";
import FormLayout from "../../components/FormLayout";
import CustomTextField from "../../components/Inputs/CustomTextField";
import CustomRadioButtons from "../../components/Inputs/CustomRadioButtons";
import CustomButton from "../../components/Inputs/CustomButton";
import SubmitData from "../../components/Api/SubmitData";
import CustomSelectSearchOne from "../../components/Inputs/CustomSelectSearchOne";
import CustomSelectSearch from "../../components/Inputs/CustomSelectSearch";
import fetchData from "../../components/Api/fetchData";
import ApiUrl from "../../services/Api";
import axios from "axios";
function SchoolCreation() {
  useEffect(() => {
    getOrganization();
    getJobType();
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
    console.log(v);
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

    let postData = await SubmitData("institute/school", Data);
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
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextField
                  label="Short Name"
                  name="school_name_short"
                  handleChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomSelectSearchOne
                  options={options}
                  label="Acharya Group"
                  handleChange={handleGroup}
                  name="org_id"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomSelectSearch
                  options={Jobtypeoptions}
                  label="Job Type"
                  handleChange={handleJobtype}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextField
                  type="text"
                  name="email_id"
                  label="Email"
                  handleChange={handleEmail}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextField
                  type="number"
                  label="Reference Number"
                  name="ref_no"
                  handleChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextField
                  type="number"
                  name="priority"
                  label="Priority"
                  handleChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextField
                  type="color"
                  name="school_color"
                  label="Select Color "
                  handleChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomRadioButtons
                  options={optionWeb}
                  name="web_status"
                  label="Web Status "
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
export default SchoolCreation;

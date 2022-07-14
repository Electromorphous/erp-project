import { React, useState, useEffect } from "react";
import { Grid } from "@mui/material";
import Form from "../../components/Form";
import FormLayout from "../../components/FormLayout";
import CustomTextField from "../../components/Inputs/CustomTextField";
import CustomButton from "../../components/Inputs/CustomButton";
import SubmitData from "../../components/Api/SubmitData";

function OrganizationCreation() {
  const [data, setData] = useState({ active: true });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let postData = await SubmitData("institute/org", data);
    console.log(postData);
    if (postData === 200) {
      window.location.href = "/OrganizationIndex";
    }
    if (postData === 201) {
      window.location.href = "/OrganizationIndex";
    }
  };
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
                <CustomTextField
                  label="Organization Name"
                  name="org_name"
                  handleChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextField
                  label="Organization Short Name"
                  name="org_type"
                  handleChange={handleChange}
                  fullWidth
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
export default OrganizationCreation;

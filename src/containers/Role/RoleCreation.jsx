import { React, useState } from "react";
import { Grid } from "@mui/material";
import Form from "../../components/Form";
import FormLayout from "../../components/FormLayout";
import CustomTextField from "../../components/Inputs/CustomTextField";
import CustomButton from "../../components/Inputs/CustomButton";
import SubmitData from "../../components/Api/SubmitData";
import CustomTextarea from "../../components/Inputs/CustomTextarea";

function RoleCreation() {
  const [Data, setData] = useState({ active: true });
  const handleChange = (e) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    var endPoint = "Roles";
    let postData = await SubmitData(endPoint, Data);
    if (postData === 200) {
      window.location.href = "/RoleIndex";
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
            <Grid item xs={12} md={4}>
              <CustomTextField
                label="Role Name"
                name="role_name"
                handleChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <CustomTextField
                label="Role Short Name"
                name="role_short_name"
                handleChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <CustomTextarea
                label="Description"
                name="role_desc"
                handleChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <CustomButton label="Create"></CustomButton>
            </Grid>
          </Grid>
        </Form>
      </FormLayout>
    </>
  );
}
export default RoleCreation;

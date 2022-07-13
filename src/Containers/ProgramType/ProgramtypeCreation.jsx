import { React, useState, useEffect } from "react";
import { Grid } from "@mui/material";
import Form from "../../components/Form";
import FormLayout from "../../components/FormLayout";
import CustomTextField from "../../components/Inputs/CustomTextField";
import CustomButton from "../../components/Inputs/CustomButton";
import SubmitData from "../../components/Api/SubmitData";

function ProgramtypeCreation() {
  const [Data, setData] = useState({ active: true });
  const handleChange = (e) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let postData = await SubmitData("academic/ProgramType", Data);
    console.log(postData);
    if (postData === 200) {
      window.location.href = "/ProgramtypeIndex";
    }
    if (postData === 201) {
      window.location.href = "/ProgramtypeIndex";
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
                  label="Program Type "
                  name="program_type_name"
                  handleChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextField
                  label="Short Name"
                  name="program_type_code"
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
export default ProgramtypeCreation;

import React, { useState } from "react";
import Box from "@mui/material/Box";

import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CustomTextField from "../../components/Inputs/CustomTextField";

import CustomButton from "../../components/Inputs/CustomButton";
import FormLayout from "../../components/FormLayout";
import Form from "../../components/Form";
import axios from "axios";
import ApiUrl from "../../services/Api";

const useStyles = makeStyles(() => ({}));

function GraduationCreation() {
  const [Storedata, setStoredata] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`${ApiUrl}/employee/graduation`, Storedata).then(
      (response) => {
        if (response.status == 200) {
          window.location.href = "/GraduationIndex";
        }
        console.log(response.data);
      },
      (err) => {
        console.log(err.response.data.message);
      }
    );
  };

  function handleName(e) {
    setStoredata((prev) => ({
      ...prev,
      graduation_name: e.target.value,
      active: true,
    }));
  }
  function handleShortName(e) {
    setStoredata((prev) => ({
      ...prev,
      graduation_name_short: e.target.value,
    }));
  }
  return (
    <>
      <FormLayout>
        <Form onSubmit={handleSubmit}>
          <Box>
            <Grid
              container
              justifyContent="flex-start"
              alignItems="center"
              rowSpacing={2}
              columnSpacing={{ xs: 2, md: 4 }}
            >
              <Grid item xs={12} md={6}>
                <CustomTextField
                  name="Name"
                  label="Name"
                  handleChange={handleName}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextField
                  name="Short Name"
                  label=" Short Name"
                  handleChange={handleShortName}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <CustomButton label="Create" fullWidth></CustomButton>
              </Grid>
            </Grid>
          </Box>
        </Form>
      </FormLayout>
    </>
  );
}
export default GraduationCreation;

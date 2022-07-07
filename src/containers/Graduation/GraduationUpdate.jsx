import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import CustomTextField from "../../components/Inputs/CustomTextField";
import FormLayout from "../../components/FormLayout";
import Form from "../../components/Form";
import CustomButton from "../../components/Inputs/CustomButton";
import axios from "axios";
import ApiUrl from "../../services/Api";
import { useParams } from "react-router-dom";

function GraduationUpdate() {
  const { id } = useParams();
  useEffect(() => {
    getGraduation();
  }, []);

  const [Storedata, setStoredata] = useState([]);

  const getGraduation = () => {
    axios.get(`${ApiUrl}/employee/graduation/${id}`).then((response) => {
      console.log(response);
      setStoredata(response.data.data);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`${ApiUrl}/employee/graduation/${id}`, Storedata).then(
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
                  label="Name"
                  handleChange={handleName}
                  value={Storedata.graduation_name ?? ""}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextField
                  label="Short Name"
                  handleChange={handleShortName}
                  value={Storedata.graduation_name_short ?? ""}
                  fullWidth
                />
              </Grid>
              <Grid item>
                <CustomButton label="Update"></CustomButton>
              </Grid>
            </Grid>
          </Box>
        </Form>
      </FormLayout>
    </>
  );
}
export default GraduationUpdate;

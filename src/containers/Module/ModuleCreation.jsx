import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Grid, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CustomTextField from "../../components/Inputs/CustomTextField";
import axios from "axios";
import ApiUrl from "../../services/Api";

const useStyles = makeStyles(() => ({
  form: {
    padding: "10px 0",
  },
  paper: {
    width: "60vw",
    margin: "25px auto",
    padding: "20px",
    minHeight: "200px",
    backgroundColor: "#f6f6ff",
  },
}));

function ModuleCreation() {
  const [storedata, setstoredata] = useState({ active: true });

  const classes = useStyles();

  function handleChange(e) {
    console.log(ApiUrl);
    setstoredata({ ...storedata, [e.target.name]: e.target.value });
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${ApiUrl}/Module`, storedata, {
        headers: {
          "Content-": "application/json",
          Accept: "application/json",
        },
      })
      .then(
        (response) => {
          if (response.data.success == true) {
            window.location.href = "/ModuleIndex";
          }
          console.log("success");
          console.log(response.data);
        },
        (err) => {
          alert(err.response.data.message);
        }
      );
  };

  return (
    <>
      <Paper elevation={2} sx={{ borderRadius: 3 }} className={classes.paper}>
        <Box component="form" className={classes.form}>
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
                  name="module_name"
                  label="Module Name"
                  handleChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextField
                  name="module_short_name"
                  label="Short Name"
                  handleChange={handleChange}
                  fullWidth
                />
              </Grid>
            </>
            <Grid item xs={12} md={4} variant="contained">
              <Button
                variant="contained"
                fullWidth
                sx={{ borderRadius: 2 }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </>
  );
}
export default ModuleCreation;

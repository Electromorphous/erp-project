import { Grid, Button, Paper } from "@mui/material";
import { Box } from "@mui/system";
import { React, useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { useParams } from "react-router-dom";
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

export default function ModuleUpdate() {
  const { id } = useParams();
  const classes = useStyles();
  const [Data, setData] = useState([]);
  const handleChange = (e) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    axios.get(`${ApiUrl}/Module/${id}`).then((response) => {
      setData(response.data.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`${ApiUrl}/Module/${id}`, Data).then((response) => {
      if (response.status == 200) {
        window.location.href = "/ModuleIndex";
      }
    });
  };
  return (
    <>
      <Paper elevation={4} className={classes.paper}>
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
                  label="Name"
                  name="module_name"
                  handleChange={handleChange}
                  value={Data.module_name ?? ""}
                  fullWidth
                ></CustomTextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextField
                  label="Short Name"
                  name="module_short_name"
                  value={Data.module_short_name ?? ""}
                  handleChange={handleChange}
                  fullWidth
                ></CustomTextField>
              </Grid>
            </>
            <>
              <Grid item xs={12} md={4}>
                <Button variant="contained" fullWidth onClick={handleSubmit}>
                  Update
                </Button>
              </Grid>
            </>
          </Grid>
        </Box>
      </Paper>
    </>
  );
}

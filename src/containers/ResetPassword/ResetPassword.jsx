import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Box, Grid, Paper, Button } from "@mui/material";
import CustomTextField from "../../components/Inputs/CustomTextField";
import CustomButton from "../../components/Inputs/CustomButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ApiUrl from "../../services/Api";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const useStyles = makeStyles(() => ({
  form: {
    padding: "20px 0",
  },
}));

function ResetPassword() {
  let [searchParams, setSearchParams] = useSearchParams();
  const classes = useStyles();
  const token = searchParams.get("token");
  const [storedata, setstoredata] = useState([]);
  const [reload, setreload] = useState(false);
  const [open, setOpen] = useState(false);
  const paperStyle = {
    padding: 30,
    height: "50vh",
    width: 350,
    margin: "100px 50px",
    borderRadius: 20,
  };

  function page() {
    setOpen(true);
    setreload(true);
  }

  const handleClose = () => {
    window.location.href = "/";
    setOpen(false);
  };

  const onSubmit = () => {
    console.log(token);

    axios
      .put(
        `${ApiUrl}/resetPassword?token=${token}&password=${storedata.password}`,
        storedata,
        {
          headers: {
            "Content-": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then(
        (response) => {
          console.log("success");
          console.log(response.data);
          page();
        },
        (err) => {
          alert(err.response.data.message);
        }
      );
  };
  function handleChange(e) {
    setstoredata({ ...storedata, [e.target.name]: e.target.value });
  }
  return (
    <>
      <Box component="form" className={classes.form}>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          rowSpacing={2}
          columnSpacing={{ xs: 2, md: 4 }}
        >
          {" "}
          <Paper elevation={8} style={paperStyle}>
            <>
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                rowSpacing={2}
                columnSpacing={{ xs: 2, md: 4 }}
              >
                <Grid item xs={12}>
                  <h2>Reset Password</h2>
                </Grid>
                <Grid item xs={12}>
                  <h5>Please choose your new password:</h5>
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    label="Password"
                    size="small"
                    type="password"
                    name="password"
                    handleChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  {reload ? <p>Password Changed Successfully</p> : ""}
                </Grid>
                <Grid item xs={12}>
                  <Button fullWidth variant="contained" onClick={onSubmit}>
                    Save
                  </Button>
                </Grid>
                <Grid item>
                  <Dialog open={open}>
                    <DialogContent>
                      <DialogContentText>
                        <h4>Your Password Has Been Changed Successfully</h4>
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={handleClose}
                        variant="contained"
                        autoFocus
                      >
                        Ok
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Grid>
              </Grid>
            </>
          </Paper>
        </Grid>
      </Box>
    </>
  );
}
export default ResetPassword;

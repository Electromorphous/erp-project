import React, { useState } from "react";
import { Grid, Paper, Button, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import StaffLogin from "../../components/LoginForms/StaffLogin";
import College from "../../images/College.jpg";
import logo4 from "../../images/logo4.png";
import StudentLogin from "../../components/LoginForms/StudentLogin";
const styles = makeStyles(() => ({
  form: {
    display: "flex",
    padding: "20px 0px",
    backgroundSize: "cover",
    height: "95%",
    width: "100%",
  },
  textField: {
    fontFamily: "Open Sans",
    cursor: "none",
  },
  paperStyle: {
    width: "350px",
    height: "440px",
    padding: "22px",
    margin: "100px 40px",
    borderRadius: "30px !important",
  },
  paperStyle1: {
    borderRadius: "22px !important",
    marginTop: "-55px",
    height: "60px",
    width: "60px",
  },
  btn: {
    fontFamily: "Open Sans",
    fontStyle: "normal",
    marginTop: "40px !important",
    backgroundColor: "#00A29A !important",
  },
  btnStudent: {
    fontFamily: "Open Sans",
    marginTop: "40px !important",
  },
  anchorTag: {
    textDecoration: "none",
    color: "#00A29A !important",
    fontFamily: "Open Sans",
    fontStyle: "normal",
  },
  signIn: {
    position: "absolute",
    fontFamily: "Raleway",
    fontStyle: "normal",
    fontWeight: "445",
    fontSize: "28px",
    lineHeight: "2px",
    textAlign: "right",
    color: "#5C3C55",
    opacity: 0.7,
  },
}));

function Login() {
  const [showStaff, setShowStaff] = useState("staff");

  const classes = styles();

  return (
    <>
      <Box
        component="form"
        className={classes.form}
        sx={{
          background: {
            xs: "block",
            md: "block",
            lg: `url(${College})`,
          },
        }}
      >
        <Grid container>
          <Grid item xs={12}>
            <Grid container align="right" justifyContent="right">
              <Paper elevation={8} className={classes.paperStyle}>
                <Grid container>
                  <Grid item xs={12} align="center">
                    <Paper className={classes.paperStyle1}>
                      <Grid item xs={12} align="center">
                        <img
                          src={logo4}
                          alt=""
                          style={{ width: "54px", marginTop: "4px" }}
                        />
                      </Grid>
                    </Paper>
                  </Grid>
                </Grid>

                <Grid item xs={6} className={classes.signIn}>
                  <p>Sign In</p>
                </Grid>

                <Grid
                  item
                  xs={12}
                  align="center"
                  className={classes.btnStudent}
                >
                  <Button
                    variant="text"
                    onClick={() => setShowStaff("staff")}
                    style={{
                      color: showStaff == "student" ? "#cccccc" : "#76546E",
                    }}
                    id="font"
                  >
                    <h4> Staff</h4>
                  </Button>
                  |
                  <Button
                    variant="text"
                    id="fonts"
                    onClick={() => setShowStaff("student")}
                    style={{
                      color: showStaff == "staff" ? "#cccccc" : "#76546E",
                    }}
                  >
                    <h4> Student</h4>
                  </Button>
                </Grid>

                {showStaff == "staff" ? <StaffLogin /> : <StudentLogin />}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
export default Login;

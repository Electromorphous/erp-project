import React, { useState } from "react";
import { Grid, Paper, Button, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import StaffLogin from "../../components/LoginForms/StaffLogin";
import background from "../../images/background.jpeg";
import photo from "../../images/photo.png";
import CustomTextField from "../../components/Inputs/CustomTextField";
import logo4 from "../../images/logo4.png";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
const styles = makeStyles(() => ({
  form: {
    padding: "10px 0",
    background: `url(${background})`,
    backgroundSize: "cover",
    height: "100%",
    width: "100%",
  },
  textField: {
    fontFamily: "Open Sans",
    cursor: "none",
  },
  paperStyle1: {
    borderRadius: "22px !important",
    marginLeft: "125px",
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
    marginTop: "40px",
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
    fontSize: "30px",
    lineHeight: "2px",
    textAlign: "right",
    color: "#5C3C55",
    opacity: 0.7,
  },
}));

function Login() {
  const [values, setValues] = React.useState({
    username: "",
    password: "",
  });

  const [showStudent, setShowStudent] = useState("student");

  const classes = styles();
  const paperStyle = {
    padding: 30,
    height: "72vh",
    width: 380,
    margin: "100px 40px",
    borderRadius: 30,
  };

  function handleUsername(e) {
    setValues((prev) => ({ ...prev, username: e.target.value }));
  }

  function authenticateStudent() {
    alert("Still api is not created");
    fetch("", {
      method: "POST",
      headers: {
        "Contect-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(values),
    }).then((response) => {
      response.json().then((result) => {
        if (
          values.username === result.userName &&
          values.password === result.userName
        ) {
          localStorage.setItem(
            "studentauthenticate",
            JSON.stringify({
              Studentlogin: true,
              username1: result.userName,
              token: result.token,
              userId: result.userId,
            })
          );
          setValues({
            Studentlogin: true,
          });
        } else {
          alert("unauthorized");
          setValues({ Studentlogin: false });
        }
      });
    });
  }

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <Box component="form" className={classes.form}>
        <Grid
          container
          direction="row"
          justifyContent="right"
          alignItems="right"
        >
          <Grid item>
            <img
              src={photo}
              alt=""
              style={{
                width: "40vw",
                marginTop: "-140px",
                marginRight: "280px",
              }}
            />
          </Grid>

          <Paper elevation={8} style={paperStyle}>
            <Grid item align="left">
              <Paper className={classes.paperStyle1}>
                <Grid align="center">
                  <img
                    src={logo4}
                    alt=""
                    style={{ width: "54px", marginTop: "4px" }}
                  />
                </Grid>
              </Paper>
            </Grid>
            <Grid className={classes.signIn}>
              <p>Sign In</p>
            </Grid>

            <Grid align="center" className={classes.btnStudent}>
              <Button
                variant="text"
                onClick={() => setShowStudent("student")}
                style={{
                  color: showStudent == "student" ? "#76546E" : "#cccccc",
                }}
                id="font"
              >
                <h4> Staff</h4>
              </Button>
              |
              <Button
                variant="text"
                id="fonts"
                onClick={() => setShowStudent("staff")}
                style={{
                  color: showStudent == "staff" ? "#76546E" : "#cccccc",
                }}
              >
                <h4> Student</h4>
              </Button>
            </Grid>
            {showStudent === "student" ? (
              <>
                <StaffLogin />
              </>
            ) : (
              <>
                {" "}
                <Grid item xs={12}>
                  <CustomTextField
                    id="standard-basic"
                    label="Enter AUID"
                    variant="standard"
                    style={{ marginTop: "30px" }}
                    handleChange={handleUsername}
                    size="small"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} style={{ marginTop: "20px" }}>
                  <FormControl fullWidth variant="standard">
                    <InputLabel htmlFor="standard-adornment-password">
                      Password
                    </InputLabel>
                    <Input
                      fullWidth
                      id="standard-adornment-password"
                      type={values.showPassword ? "text" : "password"}
                      value={values.password}
                      onChange={handleChange("password")}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {values.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    className={classes.btn}
                    variant="contained"
                    onClick={authenticateStudent}
                    type="submit"
                  >
                    LOGIN
                  </Button>
                </Grid>
                <Grid style={{ marginTop: "30px" }}>
                  <a href="/ForgotPassword" className={classes.anchorTag}>
                    Forgot Password ?
                  </a>
                </Grid>
              </>
            )}
          </Paper>
        </Grid>
      </Box>
    </>
  );
}
export default Login;

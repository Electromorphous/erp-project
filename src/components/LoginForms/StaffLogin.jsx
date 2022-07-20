import React from "react";
import { Grid, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ApiUrl from "../../services/Api";
import background from "../../images/background.jpeg";
import CustomTextField from "../../components/Inputs/CustomTextField";
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

  btn: {
    fontFamily: "Open Sans",
    fontStyle: "normal",
    marginTop: "40px !important",
    backgroundColor: "#00A29A !important",
  },

  anchorTag: {
    textDecoration: "none",
    color: "#00A29A !important",
    fontFamily: "Open Sans",
    fontStyle: "normal",
  },
}));

function StaffLogin() {
  const [values, setValues] = React.useState({
    username: "",
    password: "",
  });

  const classes = styles();

  function handleUsername(e) {
    setValues((prev) => ({ ...prev, username: e.target.value }));
  }

  function authenticateErp(e) {
    e.preventDefault();

    fetch(`${ApiUrl}/authenticate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        response.json().then((result) => {
          if (
            values.username === result.data.userName &&
            values.password === result.data.userName
          ) {
            localStorage.setItem(
              "authenticate",
              JSON.stringify({
                login: true,
                username1: result.data.userName,
                token: result.data.token,
                userId: result.data.userId,
              })
            );
            if (result.status == 200) {
              window.location.href = "/Header";
            }
            setValues({
              login: true,
            });
          } else {
            alert("Unauthorized");
            setValues({ login: false });
          }
        });
      })
      .catch(() => {
        alert("Error");
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
      <Grid item>
        <CustomTextField
          id="standard-basic"
          label="Enter Username"
          variant="standard"
          style={{ marginTop: "30px" }}
          handleChange={handleUsername}
          size="small"
          fullWidth
        />
      </Grid>
      <Grid style={{ marginTop: "20px" }}>
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
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
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
          onClick={authenticateErp}
          type="submit"
        >
          LOGIN
        </Button>
      </Grid>
      <Grid style={{ marginTop: "30px" }}>
        <a href="/ForgotPassword" className={classes.anchorTag}>
          Forgot Password ?
        </a>
      </Grid>{" "}
    </>
  );
}
export default StaffLogin;

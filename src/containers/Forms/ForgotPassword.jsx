import React from "react";
import ThemeContext from "../../utils/ThemeContext";
import { makeStyles } from "@mui/styles";
import { Box, Grid } from "@mui/material";
const useStyles = makeStyles(() => ({
  form: {
    padding: "10px 0",
  },
}));
function ForgotPassword() {
  const classes = useStyles();
  return (
    <>
      <Box component="form" className={classes.form}>
        <ThemeContext>
          <div className="container">hai</div>
        </ThemeContext>
      </Box>
    </>
  );
}
export default ForgotPassword;

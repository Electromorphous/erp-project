import { Breadcrumbs, Paper, Stack } from "@mui/material";
import React from "react";
import Link from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";

export default function CustomBreadcrumb() {
  const styles = {
    float: "left",
    margin: "20px",
  };
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/">
      <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
      Employee Module
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="/material-ui/getting-started/installation/"
    >
      HR Menu
    </Link>,
    <Typography key="3" color="text.primary">
      Role Index
    </Typography>,
  ];

  return (
    <>
      <Paper elevation={0} sx={styles}>
        <Stack spacing={2}>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
      </Paper>
    </>
  );
}

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import ApiUrl from "../../services/Api";
import { useParams } from "react-router-dom";
import { Box, Grid, Paper } from "@mui/material";
const ViewImage = () => {
  const { id } = useParams();
  const paperStyle = {
    padding: 30,
    height: "20vh",
    width: 200,
    margin: "100px 50px",
    borderRadius: 20,
    marginLeft: "500px",
  };
  const form = {
    padding: "20px 0",
  };
  var [fileURL, setfileURL] = useState();
  useEffect(() => {
    axios.get(`${ApiUrl}/menuImage/${id}`).then((response) => {
      var path = response.data.data.menu_image_path;
      axios(`${ApiUrl}/menuImageDownload?menu_image_path=${path}`, {
        method: "GET",
        responseType: "blob",
      })
        .then((response) => {
          const file = new Blob([response.data]);
          var url = URL.createObjectURL(file);
          setfileURL(url);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }, []);

  return (
    <Paper elevation={8} style={paperStyle}>
      <Box component="form" style={form}>
        <Grid container justifyContent="center" alignItems="center">
          {fileURL ? (
            <img src={fileURL} style={{ width: "20%", alignItems: "center" }} />
          ) : (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          )}
        </Grid>
      </Box>
    </Paper>
  );
};

export default ViewImage;

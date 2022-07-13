import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Grid, Paper, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CustomTextField from "../../components/Inputs/CustomTextField";
import CustomSelectSearch from "../../components/Inputs/CustomSelectSearch";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CustomSelect from "../../components/Inputs/CustomSelect";
import CustomButton from "../../components/Inputs/CustomButton";
import FormLayout from "../../components/FormLayout";
import Form from "../../components/Form";
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
  delete: {
    cursor: "pointer",
    padding: 40,
    background: "red",
    color: "white",
    border: "none",
  },
}));

function MenuCreation() {
  const [storedata, setstoredata] = useState([]);
  const [Storedata1, setStoredata1] = useState([]);
  const [module, setmodule] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const classes = useStyles();

  function getData() {
    axios.get(`${ApiUrl}/Module`).then(
      (response) => {
        setmodule(response.data.data);
      },
      (err) => {
        console.log(err.response.data.message);
      }
    );
  }

  useEffect(() => {
    getData();
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const Data = module.map((m) => ({
    label: m.module_short_name,
    value: m.module_id,
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(storedata);

    axios.post(`${ApiUrl}/Menu`, storedata).then(
      (response) => {
        if (response.data.success == true) {
          window.location.href = "/MenuIndex";
        }

        console.log(response);
        const dataArray = new FormData();

        dataArray.append("file", selectedImage);

        response.data.data.map((m) => {
          dataArray.append("menu_id", m.menu_id);
        });

        axios
          .post(`${ApiUrl}/menuUploadImage`, dataArray, {
            headers: {
              "Content-type": "multipart/form-data",
            },
          })
          .then(
            (response) => {
              console.log(response);
            },
            (err) => {
              console.log(err.response.data.message);
            }
          );
      },
      (err) => {
        console.log(err.response.data.message);
      }
    );
  };

  function handleName(e) {
    setstoredata((prev) => ({
      ...prev,
      menu_name: e.target.value,
      active: true,
    }));
  }
  function handleShortName(e) {
    setstoredata((prev) => ({ ...prev, menu_short_name: e.target.value }));
  }
  function handleDescription(e) {
    setstoredata((prev) => ({ ...prev, menu_desc: e.target.value }));
  }
  function handleModule(e, v) {
    v.map((m) => {
      Storedata1.push(m.value);
    });
    setStoredata1([]);
    setstoredata({ ...storedata, module_id: Storedata1 });
  }

  return (
    <>
      <FormLayout>
        <Form onSubmit={handleSubmit}>
          <Box className={classes.form}>
            <Grid
              container
              justifyContent="flex-start"
              alignItems="center"
              rowSpacing={4}
              columnSpacing={{ xs: 2, md: 4 }}
            >
              <Grid item xs={12} md={6}>
                <CustomTextField
                  label="Name"
                  name="menu_name"
                  fullWidth
                  handleChange={handleName}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextField
                  label="Short Name"
                  name="menu_short_name"
                  handleChange={handleShortName}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomSelectSearch
                  label="Module"
                  options={Data}
                  handleChange={handleModule}
                  name="module_id"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextField
                  label="Description"
                  name="menu_desc"
                  handleChange={handleDescription}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={2.2}>
                <input
                  accept="image/*"
                  type="file"
                  id="select-image"
                  style={{ display: "none" }}
                  onChange={(e) => setSelectedImage(e.target.files[0])}
                />
                <label htmlFor="select-image">
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    size="small"
                  >
                    Upload Image
                  </Button>
                </label>
              </Grid>
              <Grid item>
                {imageUrl && selectedImage && (
                  <Box mt={2} textAlign="center">
                    <img
                      src={imageUrl}
                      alt={selectedImage.name}
                      height="50px"
                    />
                  </Box>
                )}
              </Grid>
              <Grid item xs={12} md={2}>
                <CustomButton label="Create"></CustomButton>
              </Grid>
            </Grid>
          </Box>
        </Form>
      </FormLayout>
    </>
  );
}
export default MenuCreation;

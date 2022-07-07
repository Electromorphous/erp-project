import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Grid, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CustomTextField from "../../components/Inputs/CustomTextField";
import CustomSelect from "../../components/Inputs/CustomSelect";
import FormLayout from "../../components/FormLayout";
import Form from "../../components/Form";
import CustomButton from "../../components/Inputs/CustomButton";
import axios from "axios";
import ApiUrl from "../../services/Api";
import { useParams } from "react-router-dom";
import CustomSelectSearch from "../../components/Inputs/CustomSelectSearch";

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

function MenuUpdate() {
  const { id } = useParams();
  const [storedata, setstoredata] = useState([]);
  const [Storedata1, setStoredata1] = useState([]);
  const [module, setmodule] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

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

  function getMenu() {
    axios.get(`${ApiUrl}/Menu/${id}`).then(
      (response) => {
        setstoredata(response.data.data);
      },
      (err) => {
        console.log(err.response.data.message);
      }
    );
  }

  useEffect(() => {
    getData();
    getMenu();
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
    const dataArray = new FormData();

    dataArray.append("file", selectedImage);

    dataArray.append("menu_id", id);

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
    axios.put(`${ApiUrl}/Menu/${id}`, storedata).then(
      (response) => {
        if (response.status == 200) {
          window.location.href = "/MenuIndex";
        }

        console.log(response.data);
      },
      (err) => {
        console.log(err.response.data.message);
      }
    );
  };

  function handleName(e) {
    setstoredata((prev) => ({ ...prev, menu_name: e.target.value }));
  }
  function handleShortName(e) {
    setstoredata((prev) => ({ ...prev, menu_short_name: e.target.value }));
  }
  function handleDescription(e) {
    setstoredata((prev) => ({ ...prev, menu_desc: e.target.value }));
  }
  function handleModule(e, v) {
    console.log(storedata);
    v.map((m) => {
      Storedata1.push(m.value);
    });
    setStoredata1([]);
    setstoredata({ ...storedata, module_id: Storedata1 });
  }
  function handleImage(e) {
    axios.get(`${ApiUrl}/menuImagePath/${id}`).then((response) => {
      console.log(response);
    });
    setSelectedImage(e.target.files[0]);
  }

  return (
    <>
      <FormLayout>
        <Form onSubmit={handleSubmit}>
          <Box>
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
                  value={storedata.menu_name ?? ""}
                  fullWidth
                  handleChange={handleName}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextField
                  label="Short Name"
                  name="menu_short_name"
                  value={storedata.menu_short_name ?? ""}
                  handleChange={handleShortName}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomSelectSearch
                  label="Module"
                  value={storedata.module_id ?? ""}
                  options={Data}
                  handleChange={handleModule}
                  name="module_id"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextField
                  label="Description"
                  value={storedata.menu_desc ?? ""}
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
                  onChange={handleImage}
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
                <CustomButton label="Update"></CustomButton>
              </Grid>
            </Grid>
          </Box>
        </Form>
      </FormLayout>
    </>
  );
}
export default MenuUpdate;

import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Grid, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CustomTextField from "../../components/Inputs/CustomTextField";
import FormLayout from "../../components/FormLayout";
import Form from "../../components/Form";
import CustomSelect from "../../components/Inputs/CustomSelect";
import CustomSelectSearchOne from "../../components/Inputs/CustomSelectSearchOne";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import ApiUrl from "../../services/Api";
import CustomButton from "../../components/Inputs/CustomButton";

const useStyles = makeStyles(() => ({}));

function SubmenuCreation() {
  useEffect(() => {
    fetchMenu();
  }, []);
  const classes = useStyles();
  const [Menu, setMenu] = useState([]);
  const [Storedata, setStoredata] = useState({ active: true });
  const [Storedata1, setStoredata1] = useState([]);
  const [Menudata, setMenudata] = useState();

  function fetchMenu() {
    axios.get(`${ApiUrl}/Menu`).then(
      (response) => {
        setMenu(response.data.data);
      },
      (err) => {
        console.log(err.response.data.message);
      }
    );
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Storedata);

    axios.post(`${ApiUrl}/SubMenu`, Storedata).then(
      (response) => {
        if (response.status == 200) {
          window.location.href = "/SubmenuIndex";
        }
        console.log(response.data);
      },
      (err) => {
        console.log(err.response.data.message);
      }
    );
  };

  const Data = Menu.map((val) => ({
    label: val.menu_name,
    value: val.menu_id,
  }));

  const handleMenu = (e, v) => {
    setStoredata({ ...Storedata, menu_id: v.value });
  };
  function handleName(e) {
    setStoredata((prev) => ({
      ...prev,
      submenu_name: e.target.value,
    }));
  }

  function handleDesc(e) {
    setStoredata((prev) => ({
      ...prev,
      submenu_desc: e.target.value,
    }));
  }
  function handleUrl(e) {
    setStoredata((prev) => ({
      ...prev,
      submenu_url: e.target.value,
    }));
  }

  function handleStatus(e) {
    setStoredata((prev) => ({
      ...prev,
      status: e.target.value,
    }));
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
              rowSpacing={2}
              columnSpacing={{ xs: 2, md: 4 }}
            >
              <Grid item xs={12} md={6}>
                <CustomTextField
                  label="Name"
                  name="submenu_name"
                  handleChange={handleName}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextField
                  label="Description"
                  name="submenu_desc"
                  handleChange={handleDesc}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomSelectSearchOne
                  label="Menu"
                  options={Data}
                  handleChange={handleMenu}
                  name="menu_id"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextField
                  label="New Url"
                  handleChange={handleUrl}
                  fullWidth
                  name="submenu_url"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomSelect
                  label="Status"
                  name="status"
                  handleChange={handleStatus}
                  fullWidth
                  items={[
                    {
                      value: "Under Maintainence",
                      label: "Under Maintainence",
                    },
                    { value: "Blocked", label: "Blocked" },
                    { value: "Access Denied", label: "Access Denied" },
                    { value: "Working", label: "Working" },
                  ]}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomButton label="Create" fullWidth></CustomButton>
              </Grid>
            </Grid>
          </Box>
        </Form>
      </FormLayout>
    </>
  );
}
export default SubmenuCreation;

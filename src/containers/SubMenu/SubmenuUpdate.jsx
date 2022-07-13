import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Grid, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CustomTextField from "../../components/Inputs/CustomTextField";
import CustomSelectSearchOne from "../../components/Inputs/CustomSelectSearchOne";
import CustomSelect from "../../components/Inputs/CustomSelect";
import FormLayout from "../../components/FormLayout";
import Form from "../../components/Form";
import CustomButton from "../../components/Inputs/CustomButton";
import axios from "axios";
import ApiUrl from "../../services/Api";
import { useParams } from "react-router-dom";
function SubmenuUpdate() {
  const [Storedata, setStoredata] = useState([]);
  const [Menu, setMenu] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getMenu();
    getSubmenu();
  }, []);

  const getMenu = () => {
    axios.get(`${ApiUrl}/Menu`).then((Response) => {
      setMenu(Response.data.data);
    });
  };

  const getSubmenu = () => {
    axios.get(`${ApiUrl}/SubMenu/${id}`).then((Response) => {
      setStoredata(Response.data.data);
    });
  };

  const Data = Menu.map((val) => ({
    label: val.menu_short_name,
    value: val.menu_id,
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`${ApiUrl}/SubMenu/${id}`, Storedata).then((Response) => {
      console.log(Response.data);
      if (Response.status == 200) {
        window.location.href = "/SubmenuIndex";
      }
    });
  };

  function handleName(e) {
    setStoredata((prev) => ({
      ...prev,
      submenu_name: e.target.value,
      active: true,
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
  function handleMenu(e) {
    setStoredata((prev) => ({
      ...prev,
      menu_id: e.target.value,
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
                  value={Storedata.submenu_name ?? ""}
                  handleChange={handleName}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextField
                  label="Description"
                  value={Storedata.submenu_desc ?? ""}
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
                  value={Storedata.submenu_url ?? ""}
                  handleChange={handleUrl}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomSelect
                  label="Status"
                  handleChange={handleStatus}
                  value={Storedata.status ?? ""}
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
                <CustomButton label="Update" fullWidth></CustomButton>
              </Grid>
            </Grid>
          </Box>
        </Form>
      </FormLayout>
    </>
  );
}
export default SubmenuUpdate;

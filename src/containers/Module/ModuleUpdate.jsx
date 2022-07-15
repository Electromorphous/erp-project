import { React, useState, useEffect } from "react";
import { Grid } from "@mui/material";
import Form from "../../components/Form";
import FormLayout from "../../components/FormLayout";
import CustomTextField from "../../components/Inputs/CustomTextField";
import CustomButton from "../../components/Inputs/CustomButton";
import UpdateData from "../../components/Api/UpdateData";
import { useParams } from "react-router-dom";
import GetData from "../../components/Api/GetData";

function ModuleUpdate() {
  const { id } = useParams();
  const [data, setData] = useState({ active: true });
  const getData = async () => {
    let endPoint = "Module";
    let getUpdatedata = await GetData(endPoint, id);
    setData(getUpdatedata);
  };
  useEffect(() => {
    getData();
  }, []);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let endPoint = "Module";
    let Data = await UpdateData(endPoint, data, id);
    console.log(Data);
    if (Data === 200) {
      window.location.href = "/ModuleIndex";
    }
    if (Data === 201) {
      window.location.href = "/ModuleIndex";
    }
  };

  return (
    <>
      <FormLayout>
        <Form onSubmit={handleSubmit}>
          <Grid
            container
            alignItems="center"
            justifyContent="flex-start"
            rowSpacing={2}
            columnSpacing={{ xs: 2, md: 4 }}
          >
            <>
              <Grid item xs={12} md={6}>
                <CustomTextField
                  label=" Module"
                  name="module_name"
                  handleChange={handleChange}
                  value={data.module_name ?? ""}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextField
                  label="Short Name"
                  name="module_short_name"
                  handleChange={handleChange}
                  value={data.module_short_name ?? ""}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <CustomButton label="Update"></CustomButton>
              </Grid>
            </>
          </Grid>
        </Form>
      </FormLayout>
    </>
  );
}
export default ModuleUpdate;

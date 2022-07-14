import { React, useState, useEffect } from "react";
import { Grid } from "@mui/material";
import Form from "../../components/Form";
import FormLayout from "../../components/FormLayout";
import CustomTextField from "../../components/Inputs/CustomTextField";
import CustomButton from "../../components/Inputs/CustomButton";
import UpdateData from "../../components/Api/UpdateData";
import { useParams } from "react-router-dom";
import GetData from "../../components/Api/GetData";

function OrganizationUpdate() {
  const { id } = useParams();
  const [data, setData] = useState({ active: true });
  const getData = async () => {
    let endPoint = "institute/org";
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
    let endPoint = "institute/org";
    let Data = await UpdateData(endPoint, data, id);
    if (Data === 200) {
      window.location.href = "/OrganizationIndex";
    }
    if (Data === 201) {
      window.location.href = "/OrganizationIndex";
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
                  label="Organization Name"
                  name="org_name"
                  handleChange={handleChange}
                  value={data.org_name ?? ""}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextField
                  label="Organization Short Name"
                  name="org_type"
                  handleChange={handleChange}
                  value={data.org_type ?? ""}
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
export default OrganizationUpdate;

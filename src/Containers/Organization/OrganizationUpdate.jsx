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
  const [Data, setData] = useState({ active: true });
  const getData = async () => {
    let endPoint = "institute/org";
    let getUpdatedata = await GetData(endPoint, id);
    setData(getUpdatedata);
  };
  useEffect(() => {
    getData();
  }, []);
  const handleChange = (e) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    var endPoint = "institute/org";
    let data = await UpdateData(endPoint, Data, id);
    if (data === 200) {
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
              <Grid item xs={12} md={3}>
                <CustomTextField
                  label="Organization Name"
                  name="org_name"
                  handleChange={handleChange}
                  value={Data.org_name ?? ""}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <CustomTextField
                  label="Organization Short Name"
                  name="org_type"
                  handleChange={handleChange}
                  value={Data.org_type ?? ""}
                />
              </Grid>
              <Grid item xs={12} md={1}>
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

import { React, useState, useEffect } from "react";
import { Grid } from "@mui/material";
import Form from "../../components/Form";
import FormLayout from "../../components/FormLayout";
import CustomTextField from "../../components/Inputs/CustomTextField";
import CustomButton from "../../components/Inputs/CustomButton";
import UpdateData from "../../components/Api/UpdateData";
import { useParams } from "react-router-dom";
import GetData from "../../components/Api/GetData";
import CustomTextarea from "../../components/Inputs/CustomTextarea";

function RoleUpdate() {
  const { id } = useParams();
  const [Data, setData] = useState({ active: true });
  const [Roles, setRoles] = useState([]);
  const handleChange = (e) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };
  const getData = async () => {
    let endPoint = "Roles";
    let getUpdatedata = await GetData(endPoint, id);
    setData(getUpdatedata.data.data);
  };
  useEffect(() => {
    getData();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    var endPoint = "Roles";
    let data = await UpdateData(endPoint, Data, id);
    if (data === 200) {
      window.location.href = "/RoleIndex";
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
              <Grid item xs={12} md={4}>
                <CustomTextField
                  label="Role Name"
                  name="role_name"
                  handleChange={handleChange}
                  value={Data.role_name ?? ""}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <CustomTextField
                  label="Role Short Name"
                  name="role_short_name"
                  handleChange={handleChange}
                  value={Data.role_short_name ?? ""}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <CustomTextarea
                  label="Description"
                  name="role_desc"
                  handleChange={handleChange}
                  value={Data.role_desc ?? ""}
                />
              </Grid>
            </>
            <>
              <Grid item md={12}>
                <CustomButton label="Update"></CustomButton>
              </Grid>
            </>
          </Grid>
        </Form>
      </FormLayout>
    </>
  );
}
export default RoleUpdate;

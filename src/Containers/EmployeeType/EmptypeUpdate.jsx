import { React, useState, useEffect } from "react";
import { Grid } from "@mui/material";
import Form from "../../components/Form";
import FormLayout from "../../components/FormLayout";
import CustomTextField from "../../components/Inputs/CustomTextField";
import CustomButton from "../../components/Inputs/CustomButton";
import UpdateData from "../../components/Api/UpdateData";
import { useParams } from "react-router-dom";
import GetData from "../../components/Api/GetData";

function EmptypeUpdate() {
  const { id } = useParams();
  const [Data, setData] = useState({ active: true });
  const getData = async () => {
    let endPoint = "employee/EmployeeType";
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
    var endPoint = "employee/EmployeeType";
    let data = await UpdateData(endPoint, Data, id);
    if (data === 200) {
      window.location.href = "/EmptypeIndex";
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
                  label="Employee Name"
                  name="empType"
                  fullWidth
                  handleChange={handleChange}
                  value={Data.empType ?? ""}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextField
                  label=" Short Name"
                  name="empTypeShortName"
                  fullWidth
                  handleChange={handleChange}
                  value={Data.empTypeShortName ?? ""}
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
export default EmptypeUpdate;

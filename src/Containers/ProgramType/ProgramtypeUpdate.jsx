import { React, useState, useEffect } from "react";
import { Grid } from "@mui/material";
import Form from "../../components/Form";
import FormLayout from "../../components/FormLayout";
import CustomTextField from "../../components/Inputs/CustomTextField";
import CustomButton from "../../components/Inputs/CustomButton";
import UpdateData from "../../components/Api/UpdateData";
import { useParams } from "react-router-dom";
import GetData from "../../components/Api/GetData";

function ProgramtypeUpdate() {
  const { id } = useParams();
  const [Data, setData] = useState({ active: true });
  const getData = async () => {
    let getUpdatedata = await GetData("academic/ProgramType", id);
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

    let data = await UpdateData("academic/ProgramType", Data, id);
    if (data === 200) {
      window.location.href = "/ProgramtypeIndex";
    }
    if (data === 201) {
      window.location.href = "/ProgramtypeIndex";
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
                  label="Program Type"
                  name="program_type_name"
                  handleChange={handleChange}
                  value={Data.program_type_name ?? ""}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextField
                  label="Short Name"
                  name="program_type_code"
                  handleChange={handleChange}
                  value={Data.program_type_code ?? ""}
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
export default ProgramtypeUpdate;

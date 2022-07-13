import { React, useState, useEffect } from "react";
import { Grid } from "@mui/material";
import Form from "../../components/Form";
import FormLayout from "../../components/FormLayout";
import CustomTextField from "../../components/Inputs/CustomTextField";
import CustomButton from "../../components/Inputs/CustomButton";
import SubmitData from "../../components/Api/SubmitData";

function AcademicYearCreation() {
  const [Data, setData] = useState({ active: true });
  const [Firstyear, setFirstyear] = useState([]);
  const [Secondyear, setSecondyear] = useState([]);
  const handleChange = (e) => {
    let Firstyearone = e.target.value;
    setFirstyear(e.target.value);
    let Secondyearone = parseInt(e.target.value) + 1;
    setSecondyear(Secondyearone);
    let concat = Firstyearone + "-" + Secondyearone;
    setData({ ...Data, ac_year: concat, current_year: Firstyearone });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let postData = await SubmitData("academic/academic_year", Data);
    if (postData == 200) {
      window.location.href = "/AcademicYearIndex";
    }
    if (postData == 201) {
      window.location.href = "/AcademicYearIndex";
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
              <Grid item xs={12} md={2}>
                <CustomTextField
                  label="Academic Year"
                  handleChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={2}>
                <CustomTextField value={Secondyear} disabled />
              </Grid>
              <Grid item xs={12} md={2}>
                <CustomTextField
                  value={Firstyear}
                  label="Current Year"
                  disabled
                />
              </Grid>
              <Grid item>
                <CustomButton label="Create" />
              </Grid>
            </>
          </Grid>
        </Form>
      </FormLayout>
    </>
  );
}
export default AcademicYearCreation;

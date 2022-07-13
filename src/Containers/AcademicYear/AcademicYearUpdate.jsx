import { React, useState, useEffect } from "react";
import { Grid } from "@mui/material";
import Form from "../../components/Form";
import FormLayout from "../../components/FormLayout";
import CustomTextField from "../../components/Inputs/CustomTextField";
import CustomButton from "../../components/Inputs/CustomButton";
import UpdateData from "../../components/Api/UpdateData";
import { useParams } from "react-router-dom";
import GetData from "../../components/Api/GetData";

function AcademicYearUpdate() {
  const { id } = useParams();
  const [Data, setData] = useState({ active: true });
  const [Firstyear, setFirstyear] = useState([]);
  const [Secondyear, setSecondyear] = useState([]);
  const getData = async () => {
    let endPoint = "academic/academic_year";
    let getUpdatedata = await GetData(endPoint, id);
    setData(getUpdatedata);
  };
  useEffect(() => {
    getData();
  }, []);

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
    var endPoint = "academic/academic_year";
    let data = await UpdateData(endPoint, Data, id);
    if (data === 200) {
      window.location.href = "/AcademicYearIndex";
    }
    if (data === 201) {
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
                  value={Data.current_year ?? ""}
                />
              </Grid>

              <Grid item xs={12} md={2}>
                <CustomTextField value={Secondyear} disabled />
              </Grid>
              <Grid item xs={12} md={2}>
                <CustomTextField
                  value={Data.current_year ?? ""}
                  label="Current Year"
                  disabled
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
export default AcademicYearUpdate;

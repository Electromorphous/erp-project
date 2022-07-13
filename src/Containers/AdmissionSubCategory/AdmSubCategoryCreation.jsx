import { React, useState, useEffect } from "react";
import { Grid } from "@mui/material";
import Form from "../../components/Form";
import FormLayout from "../../components/FormLayout";
import CustomTextField from "../../components/Inputs/CustomTextField";
import CustomButton from "../../components/Inputs/CustomButton";
import SubmitData from "../../components/Api/SubmitData";
import GetData from "../../components/Api/GetData";
import CustomSelectSearchOne from "../../components/Inputs/CustomSelectSearchOne";
import fetchData from "../../components/Api/fetchData";
import ApiUrl from "../../services/Api";
import axios from "axios";
function AdmSubCategoryCreation() {
  useEffect(() => {
    getFeeAdmissionCategory();
    getBoardData();
  }, []);
  const [Data, setData] = useState({ active: true });
  const [Admcategorydata, setAdmcategorydata] = useState([]);
  const [BoardData, setBoardData] = useState([]);
  const handleChange = (e) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };
  const handleAdmCategory = (e, v) => {
    setData({ ...Data, fee_admission_category_id: v.value });
  };
  const handleBoard = (e, v) => {
    setData({ ...Data, board_unique_id: v.value });
  };
  const getFeeAdmissionCategory = () => {
    axios.get(`${ApiUrl}/student/FeeAdmissionCategory`).then((response) => {
      setAdmcategorydata(response.data.data);
    });
  };
  const getBoardData = () => {
    axios.get(`${ApiUrl}/student/Board`).then((response) => {
      setBoardData(response.data.data);
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(Data);

    let postData = await SubmitData("student/FeeAdmissionSubCategory", Data);
    if (postData == 200) {
      window.location.href = "/AdmSubCategoryIndex";
    }
    if (postData == 201) {
      window.location.href = "/AdmSubCategoryIndex";
    }
  };

  const options = Admcategorydata.map((val) => ({
    value: val.fee_admission_category_id,
    label: val.fee_admission_category_type,
  }));

  const BoardOptions = BoardData.map((val) => ({
    value: val.board_unique_id,
    label: val.board_unique_name,
  }));
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
                  label="Admission Sub Category "
                  name="fee_admission_sub_category_name"
                  handleChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextField
                  label="Short Name "
                  name="fee_admission_sub_category_short_name"
                  handleChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomSelectSearchOne
                  label="Admission Category"
                  options={options}
                  handleChange={handleAdmCategory}
                  name="fee_admission_category_id"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomSelectSearchOne
                  options={BoardOptions}
                  handleChange={handleBoard}
                  label="Board"
                  name="board_unique_id"
                />
              </Grid>
              <Grid item xs={12}>
                <CustomButton label="Create" />
              </Grid>
            </>
          </Grid>
        </Form>
      </FormLayout>
    </>
  );
}
export default AdmSubCategoryCreation;

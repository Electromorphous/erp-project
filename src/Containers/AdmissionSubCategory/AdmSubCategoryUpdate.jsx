import { React, useState, useEffect } from "react";
import { Grid } from "@mui/material";
import Form from "../../components/Form";
import FormLayout from "../../components/FormLayout";
import CustomTextField from "../../components/Inputs/CustomTextField";
import CustomButton from "../../components/Inputs/CustomButton";
import UpdateData from "../../components/Api/UpdateData";
import { useParams } from "react-router-dom";
import GetData from "../../components/Api/GetData";
import fetchData from "../../components/Api/fetchData";
import CustomSelectSearchOne from "../../components/Inputs/CustomSelectSearchOne";
import axios from "axios";
import ApiUrl from "../../services/Api";
function AdmSubCategoryUpdate() {
  const { id } = useParams();
  const [Data, setData] = useState({ active: true });
  const [AdmCategoryData, setAdmCategoryData] = useState([]);
  const [BoardData, setBoardData] = useState([]);
  const getData = async () => {
    let endPoint = "student/FeeAdmissionSubCategory";
    let getUpdatedata = await GetData(endPoint, id);
    setData(getUpdatedata);
  };

  useEffect(() => {
    getData();
    getBoardData();
    getAdmCategoryData();
  }, []);
  const getAdmCategoryData = async () => {
    axios.get(`${ApiUrl}/student/FeeAdmissionCategory`).then((response) => {
      setAdmCategoryData(response.data.data);
    });
  };
  const getBoardData = async () => {
    axios.get(`${ApiUrl}/student/Board`).then((response) => {
      setBoardData(response.data.data);
    });
  };
  const handleChange = (e) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };

  const handleAdmCategory = (e, v) => {
    setData({ ...Data, fee_admission_category_id: v.value });
  };
  const handleBoard = (e, v) => {
    setData({ ...Data, board_unique_id: v.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var endPoint = "student/FeeAdmissionSubCategory";
    let data = await UpdateData(endPoint, Data, id);
    if (data === 200) {
      window.location.href = "/AdmSubCategoryIndex";
    }
    if (data === 201) {
      window.location.href = "/AdmSubCategoryIndex";
    }
  };
  const options = AdmCategoryData.map((val) => ({
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
                  label="Admission Subcategory Name"
                  name="fee_admission_sub_category_name"
                  fullWidth
                  handleChange={handleChange}
                  value={Data.fee_admission_sub_category_name ?? ""}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextField
                  label=" Short Name"
                  name="fee_admission_sub_category_short_name"
                  fullWidth
                  handleChange={handleChange}
                  value={Data.fee_admission_sub_category_short_name ?? ""}
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
                <CustomButton label="Update"></CustomButton>
              </Grid>
            </>
          </Grid>
        </Form>
      </FormLayout>
    </>
  );
}
export default AdmSubCategoryUpdate;

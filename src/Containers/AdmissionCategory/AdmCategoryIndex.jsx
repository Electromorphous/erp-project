import { React, useState, useEffect } from "react";
import Grid from "../../components/Api/Grid";
import GridIndex from "../../components/GridIndex";
import IndexCreateButton from "../../components/Inputs/IndexCreateButton";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { Check, HighlightOff } from "@mui/icons-material";
import ActivateInactive from "../../components/Api/ActivateInactive";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

function AdmCategoryIndex() {
  const [rows, setrows] = useState([]);
  const getData = async () => {
    let data = await Grid(
      "student/fetchAllFeeAdmissionCategoryDetail",
      "created_date"
    );
    setrows(data);
  };
  useEffect(() => {
    getData();
  }, []);

  const handleActive = async (params) => {
    var id = params.row.id;
    var check = params.row.active;
    let endPoint = "";
    if (check === true) {
      endPoint = "student/FeeAdmissionCategory";
    } else {
      endPoint = "student/ActivatefeeAdmissionCategory";
    }

    let data = await ActivateInactive(endPoint, id);
    if (data === 200) {
      getData();
    }
  };

  const columns = [
    {
      field: "fee_admission_category_type",
      headerName: "Admission Category",
      flex: 1,
    },
    {
      field: "fee_admission_category_short_name",
      headerName: "Short Name",
      flex: 1,
    },
    { field: "created_username", headerName: "Created By", flex: 1 },
    {
      field: "created_date",
      headerName: "Created Date",
      flex: 1,
      type: "date",
      valueGetter: (params) => new Date(params.row.created_date),
    },
    {
      field: "created_by",
      headerName: "Update",
      renderCell: (params) => {
        return (
          <Link to={`/AdmCategoryUpdate/${params.row.id}`}>
            <GridActionsCellItem icon={<EditIcon />} label="Update" />
          </Link>
        );
      },
    },
    {
      field: "active",
      headerName: "Active",
      flex: 1,
      type: "actions",
      getActions: (params) => [
        params.row.active === true ? (
          <GridActionsCellItem
            icon={<Check />}
            label="Result"
            style={{ color: "green" }}
            onClick={() => handleActive(params)}
          >
            {params.active}
          </GridActionsCellItem>
        ) : (
          <GridActionsCellItem
            icon={<HighlightOff />}
            label="Result"
            style={{ color: "red" }}
            onClick={() => handleActive(params)}
          >
            {params.active}
          </GridActionsCellItem>
        ),
      ],
    },
  ];
  return (
    <>
      <IndexCreateButton label="Create" path="/AdmCategoryCreation" />
      <GridIndex rows={rows} columns={columns} />
    </>
  );
}
export default AdmCategoryIndex;
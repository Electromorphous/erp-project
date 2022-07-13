import { React, useState, useEffect } from "react";
import Grid from "../../components/Api/Grid";
import GridIndex from "../../components/GridIndex";
import IndexCreateButton from "../../components/Inputs/IndexCreateButton";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { Check, HighlightOff } from "@mui/icons-material";
import ActivateInactive from "../../components/Api/ActivateInactive";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

function SchoolIndex() {
  const [rows, setrows] = useState([]);
  const getData = async () => {
    let data = await Grid("institute/fetchAllSchoolDetail", "created_date");

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
      endPoint = "institute/school";
    } else {
      endPoint = "institute/activateSchool";
    }

    let data = await ActivateInactive(endPoint, id);
    if (data === 200) {
      getData();
    }
  };

  const columns = [
    { field: "school_name", headerName: "School", flex: 1 },
    { field: "school_name_short", headerName: "Short Name", flex: 1 },
    { field: "email_id", headerName: "Email", flex: 1 },
    { field: "org_name", headerName: "Organization Name", flex: 1 },
    { field: "job_type_name", headerName: "Job Type", flex: 1 },
    { field: "priority", headerName: "Priority", flex: 1 },
    { field: "school_color", headerName: "Color", flex: 1 },
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
          <Link to={`/SchoolUpdate/${params.row.id}`}>
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
      <IndexCreateButton label="Create" path="/SchoolCreation" />
      <GridIndex rows={rows} columns={columns} />
    </>
  );
}
export default SchoolIndex;

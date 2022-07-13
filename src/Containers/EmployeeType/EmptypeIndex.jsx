import { React, useState, useEffect } from "react";
import Grid from "../../components/Api/Grid";
import GridIndex from "../../components/GridIndex";
import IndexCreateButton from "../../components/Inputs/IndexCreateButton";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { Check, HighlightOff } from "@mui/icons-material";
import ActivateInactive from "../../components/Api/ActivateInactive";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

function EmptypeIndex() {
  const [rows, setrows] = useState([]);
  const getData = async () => {
    let data = await Grid(
      "employee/fetchAllEmployeeTypeDetails",
      "createdDate"
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
      endPoint = "employee/EmployeeType";
    } else {
      endPoint = "employee/activateEmployeeType";
    }

    let data = await ActivateInactive(endPoint, id);
    if (data === 200) {
      getData();
    }
  };

  const columns = [
    { field: "empType", headerName: "Employee Type", flex: 1 },
    { field: "empTypeShortName", headerName: "Short Name", flex: 1 },
    { field: "createdUsername", headerName: "Created By", flex: 1 },
    {
      field: "createdDate",
      headerName: "Created Date",
      flex: 1,
      type: "date",
      valueGetter: (params) => new Date(params.row.createdDate),
    },
    {
      field: "created_by",
      headerName: "Update",
      renderCell: (params) => {
        return (
          <Link to={`/EmptypeUpdate/${params.row.id}`}>
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
      <IndexCreateButton label="Create" path="/EmptypeCreation" />
      <GridIndex rows={rows} columns={columns} />
    </>
  );
}
export default EmptypeIndex;

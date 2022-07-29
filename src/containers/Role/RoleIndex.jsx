import { React, useState, useEffect } from "react";
import Grid from "../../components/Api/GridData";
import GridIndex from "../../components/GridIndex";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { Check, HighlightOff } from "@mui/icons-material";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import ActivateInactive from "../../components/Api/ActivateInactive";
import IndexCreateButton from "../../components/Inputs/IndexCreateButton";

function RoleIndex() {
  const [rows, setrows] = useState([]);
  const getData = async () => {
    let endPoint = "fetchAllRolesDetails";
    let data = await Grid(endPoint, "created_Date");
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
      endPoint = "Roles";
    } else {
      endPoint = "activateRoles";
    }

    let data = await ActivateInactive(endPoint, id);
    if (data === 200) {
      getData();
    }
  };
  const columns = [
    { field: "role_name", headerName: "Role Name", flex: 1 },
    { field: "role_short_name", headerName: "Role Short Name", flex: 1 },
    {
      field: "role_desc",
      headerName: "Role Description",
      minWidth: 110,
      flex: 1,
    },
    { field: "created_username", headerName: "Created By", flex: 1 },
    {
      field: "created_Date",
      headerName: "Created Date",
      flex: 1,
      type: "date",
      valueGetter: (params) => new Date(params.row.created_Date),
    },
    {
      field: "count",
      headerName: "Update",
      renderCell: (params) => {
        return (
          <Link to={`/RoleUpdate/${params.row.id}`}>
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
      <IndexCreateButton label="Create" path="/RoleCreation" />
      <GridIndex rows={rows} columns={columns} />
    </>
  );
}
export default RoleIndex;

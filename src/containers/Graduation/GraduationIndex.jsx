import { Check, HighlightOff } from "@mui/icons-material";

import { GridActionsCellItem } from "@mui/x-data-grid";
import axios from "axios";
import { React, useEffect, useState } from "react";
import GridIndex from "../../components/GridIndex";
import ApiUrl from "../../services/Api";

import EditIcon from "@mui/icons-material/Edit";

import { Link } from "react-router-dom";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

function GraduationIndex() {
  const [rows, setrows] = useState([]);
  const [Size, setSize] = useState(20);

  const getData = () => {
    axios
      .get(
        `${ApiUrl}/employee/fetchAllgraduationDetail?page=0&page_size=100&sort=created_date`
      )
      .then((Response) => {
        setrows(Response.data.data.Paginated_data.content);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleActive = (params) => {
    var id = params.row.id;
    var check = params.row.active;
    if (check === true) {
      axios.delete(`${ApiUrl}/employee/graduation/${id}`).then((Response) => {
        if (Response.data.status == 200) {
          getData();
        }
      });
    } else {
      axios
        .delete(`${ApiUrl}/employee/activategraduation/${id}`)
        .then((Response) => {
          if (Response.data.status == 200) {
            getData();
          }
        });
    }
  };

  const columns = [
    { field: "graduation_name", headerName: "Graduation Name", flex: 1 },
    {
      field: "graduation_name_short",
      headerName: "Graduation Short Name",
      flex: 1,
    },

    { field: "created_username", headerName: "Created By", flex: 1 },
    { field: "created_date", headerName: "Created Date", flex: 1 },
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
          >
            {params.active}
          </GridActionsCellItem>
        ) : (
          <GridActionsCellItem
            icon={<HighlightOff />}
            label="Result"
            style={{ color: "red" }}
          >
            {params.active}
          </GridActionsCellItem>
        ),
      ],
    },
    {
      field: "id",
      type: "actions",
      flex: 1,
      headerName: "Update",
      getActions: (params) => [
        <Link to={`/GraduationUpdate/${params.row.id}`}>
          <GridActionsCellItem icon={<EditIcon />} label="Update" />
        </Link>,
      ],
    },
    {
      headerName: "Actions",
      field: "actions",
      type: "actions",
      width: 150,
      headerClassName: "headerClass",
      getActions: (params) => [
        params.row.active == true ? (
          <GridActionsCellItem
            label="Deactivate"
            icon={<PowerSettingsNewIcon />}
            onClick={() => handleActive(params)}
            style={{ color: "red" }}
          />
        ) : (
          <GridActionsCellItem
            label="Activate"
            icon={<PowerSettingsNewIcon />}
            onClick={() => handleActive(params)}
            style={{ color: "green" }}
          />
        ),
      ],
    },
  ];

  return (
    <>
      <GridIndex rows={rows} columns={columns} Size={Size} />
    </>
  );
}
export default GraduationIndex;

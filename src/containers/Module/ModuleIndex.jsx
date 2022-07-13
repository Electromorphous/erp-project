import { Check, HighlightOff } from "@mui/icons-material";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import Dialog from "@material-ui/core/Dialog";
import { GridActionsCellItem } from "@mui/x-data-grid";
import axios from "axios";
import { React, useEffect, useState } from "react";
import GridIndex from "../../components/GridIndex";
import ApiUrl from "../../services/Api";
import { Box, Grid, Paper, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import { Link } from "react-router-dom";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

function ModuleIndex() {
  const [rows, setrows] = useState([]);
  const [Size, setSize] = useState(20);
  const [open, setOpen] = useState(false);
  const [id, setid] = useState();

  const getData = () => {
    axios
      .get(
        `${ApiUrl}/fetchAllModuleDetails?page=${0}&page_size=${100}&sort=created_date`
      )
      .then((Response) => {
        setrows(Response.data.data.Paginated_data.content);
      });
  };

  useEffect(() => {
    getData();
  }, []);
  const handleInactive = (params) => {
    var id = params.row.id;
    axios.delete(`${ApiUrl}/Module/${id}`).then((Response) => {
      if (Response.data.status == 200) {
        getData();
      }
    });
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleActive = (params) => {
    var id = params.row.id;
    var check = params.row.active;

    if (check === true && setOpen(true)) {
      handleInactive(params);
      setid(id);
    } else {
      axios.delete(`${ApiUrl}/activateModule/${id}`).then((Response) => {
        if (Response.data.status == 200) {
          getData();
        }
      });
    }
  };

  const columns = [
    { field: "module_name", headerName: " Name", flex: 1 },
    { field: "module_short_name", headerName: " Short Name", flex: 1 },
    { field: "created_username", headerName: "Created By", flex: 1 },
    {
      field: "created_date",
      headerName: "Created Date",
      flex: 1,
      type: "date",
      valueGetter: (params) => new Date(params.row.created_date),
    },

    {
      field: "id",
      type: "actions",
      flex: 1,
      headerName: "Update",
      getActions: (params) => [
        <Link to={`/ModuleUpdate/${params.row.id}`}>
          <GridActionsCellItem icon={<EditIcon />} label="Update" />
        </Link>,
      ],
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
      <Grid item>
        <Dialog open={open}>
          <DialogContent>
            <DialogContentText sx={{ color: "black" }}>
              Do you want to make it Inactive ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleInactive}
              variant="contained"
              size="small"
              autoFocus
            >
              Yes
            </Button>
            <Button
              onClick={handleClose}
              variant="contained"
              size="small"
              autoFocus
            >
              No
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
      <GridIndex rows={rows} columns={columns} Size={Size} />
    </>
  );
}
export default ModuleIndex;

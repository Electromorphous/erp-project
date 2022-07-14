import { React, useState, useEffect } from "react";
import Grid from "../../components/Api/Grid";
import GridIndex from "../../components/GridIndex";
import IndexCreateButton from "../../components/Inputs/IndexCreateButton";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { Check, HighlightOff } from "@mui/icons-material";
import ActivateInactive from "../../components/Api/ActivateInactive";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
function ProgramAssIndex() {
  const [rows, setrows] = useState([]);
  const [open, setOpen] = useState(false);
  const [ActiveId, setActiveId] = useState();
  const getData = async () => {
    let data = await Grid(
      "academic/fetchAllProgramAssigmentDetail",
      "created_date"
    );

    setrows(data);
  };
  useEffect(() => {
    getData();
  }, []);

  const handleActive = async (params) => {
    setOpen(true);
    setActiveId(params.row);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleActivee = async () => {
    var id = ActiveId.id;
    var check = ActiveId.active;
    let endPoint = "";
    if (check === true) {
      endPoint = "academic/ProgramAssigment";
    } else {
      endPoint = "academic/activateProgramAssigment";
    }

    let data = await ActivateInactive(endPoint, id);
    if (data === 200) {
      getData();
      setOpen(false);
    }
  };
  const columns = [
    { field: "ac_year", headerName: "Academic Year", flex: 1 },
    { field: "school_name_short", headerName: "School", flex: 1 },
    { field: "program_short_name", headerName: "Program", flex: 1 },
    { field: "program_type", headerName: "Program Type", flex: 1 },
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
          <Link to={`/ProgramSpeUpdate/${params.row.id}`}>
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
      <Dialog open={open}>
        <DialogContent>
          <DialogContentText sx={{ color: "black" }}>
            Do you want to make it Inactive ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleActivee()}
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
      <IndexCreateButton label="Create" path="/ProgramSpeCreation" />
      <GridIndex rows={rows} columns={columns} />
    </>
  );
}
export default ProgramAssIndex;

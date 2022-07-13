import { Check, HighlightOff } from "@mui/icons-material";
import { Button, Paper } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import axios from "axios";
import { React, useEffect, useState } from "react";
import GridIndex from "../../components/GridIndex";
import ApiUrl from "../../services/Api";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CircularProgress from "@mui/material/CircularProgress";
import EditIcon from "@mui/icons-material/Edit";
import { Grid, Box } from "@mui/material";
import CustomButton from "../../components/Inputs/CustomButton";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import Dialog from "@material-ui/core/Dialog";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

function MenuIndex() {
  const [rows, setrows] = useState([]);
  const [Size, setSize] = useState(20);
  const [open, setOpen] = useState(false);

  const paperStyle = {
    padding: 30,
    height: "20vh",
    width: 200,
    margin: "100px 50px",
    borderRadius: 20,
    marginLeft: "500px",
  };
  const form = {
    padding: "20px 0",
  };
  var [fileURL, setfileURL] = useState();
  useEffect(() => {}, []);

  const getData = () => {
    axios
      .get(
        `${ApiUrl}/fetchAllMenuDetails?page=${0}&page_size=${100}&sort=created_date`
      )
      .then((Response) => {
        console.log(rows);

        setrows(Response.data.data.Paginated_data.content);
      });
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleActive = (params) => {
    var id = params.row.id;
    var check = params.row.active;
    if (check === true) {
      axios.delete(`${ApiUrl}/Menu/${id}`).then((Response) => {
        if (Response.data.status == 200) {
          getData();
        }
      });
    } else {
      axios.delete(`${ApiUrl}/activteMenu/${id}`).then((Response) => {
        if (Response.data.status == 200) {
          getData();
        }
      });
    }
  };

  const handleOpen = (params) => {
    var id = params.row.id;
    axios.get(`${ApiUrl}/menuImagePath/${id}`).then((response) => {
      console.log(response);
      var path = response.data.data;
      axios(`${ApiUrl}/menuImageDownload?menu_image_path=${path}`, {
        method: "GET",
        responseType: "blob",
      })
        .then((response) => {
          const file = new Blob([response.data]);
          var url = URL.createObjectURL(file);
          setfileURL(url);
        })
        .catch((error) => {
          console.log(error);
        });
    });
    setOpen(true);
  };

  const columns = [
    { field: "menu_name", headerName: " Name", flex: 1 },
    { field: "menu_short_name", headerName: " Short Name", flex: 1 },
    { field: "menu_desc", headerName: "Description", flex: 1 },
    { field: "module_name", headerName: "Module Name", flex: 1 },
    { field: "created_username", headerName: "Created By", flex: 1 },
    {
      field: "created_date",
      headerName: "Created Date",
      flex: 1,
      type: "date",
      valueGetter: (params) => new Date(params.row.created_date),
    },
    {
      headerName: "View",
      field: "menu_id",
      type: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          label="User Assignment"
          icon={<RemoveRedEyeIcon />}
          onClick={() => handleOpen(params)}
        />,
      ],
    },

    {
      field: "id",
      type: "actions",
      flex: 1,
      headerName: "Update",
      getActions: (params) => [
        <Link to={`/MenuUpdate/${params.row.id}`}>
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
          <DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent align="center">
            {fileURL ? (
              <img
                src={fileURL}
                style={{ width: "20%", alignItems: "center" }}
              />
            ) : (
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            )}
          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog>
      </Grid>
      <GridIndex rows={rows} columns={columns} Size={Size} />
    </>
  );
}
export default MenuIndex;

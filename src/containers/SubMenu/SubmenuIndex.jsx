import { React, useEffect, useState } from "react";
import ApiUrl from "../../services/Api";
import axios from "axios";

import ApiIndex from "../../components/Api/ApiIndex";
import GridIndex from "../../components/GridIndex";
import { GridActionsCellItem } from "@mui/x-data-grid";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AddBoxIcon from "@mui/icons-material/AddBox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import {
  Alert,
  Checkbox,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Snackbar,
  Stack,
  Button,
} from "@mui/material";
import { Grid, Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
import CustomDialogue from "../../components/Inputs/CustomDialogue";
import SuccessAlert from "../../components/Alerts/SuccessAlert";
import { Check, HighlightOff } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { useParams } from "react-router-dom";
import CustomTextField from "../../components/Inputs/CustomTextField";
import CustomSelect from "../../components/Inputs/CustomSelect";
import CustomSelectSearch from "../../components/Inputs/CustomSelectSearch";
function SubmenuIndex() {
  const [rows, setrows] = useState([]);
  const [Open, setOpen] = useState(false);
  const [Storedata, setStoredata] = useState([]);
  const [Storedata1, setStoredata1] = useState([]);
  const [checked, setChecked] = useState([]);
  const [AssignedUserList, setAssignedUserList] = useState([]);
  const [UnAssignedUserList, setUnAssignedUserList] = useState([]);

  const [AlertOpen, setAlertOpen] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  const getData = () => {
    axios
      .get(
        `${ApiUrl}/fetchAllSubMenuDetails?page=${0}&page_size=${100}&sort=created_date`
      )
      .then((Response) => {
        console.log(Storedata);

        setrows(Response.data.data.Paginated_data.content);
      });
  };

  useEffect(() => {
    getData();
    getUserDetails();
    // getUserRelatedSubmenu();
  }, []);

  const getUserDetails = () => {
    axios.get(`${ApiUrl}/UserAuthentication`).then((response) => {
      setAllUsers(response.data.data);
    });
  };

  const handleOpen = (params) => {
    setStoredata({
      ...Storedata,
      menu_id: params.row.menu_id,
      active: true,
      status: params.row.status,
      submenu_desc: params.row.submenu_desc,
      submenu_name: params.row.submenu_name,
      submenu_id: params.row.id,
    });

    axios
      .get(`${ApiUrl}/getSubMenuRelatedUser/${params.row.id}`)
      .then((response) => {
        setAssignedUserList(response.data.data.AssignedUser);
        setUnAssignedUserList(response.data.data.UnassignedUser);
      });

    console.log(AssignedUserList);
    setOpen(true);
  };

  const handleClose = () => {
    setAlertOpen(false);
    setOpen(false);
  };

  const handleToggle = (value) => {
    console.log(checked);
    setStoredata({ ...Storedata, user_ids: checked.toString() });
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  const handleActive = (params) => {
    var id = params.row.id;
    var check = params.row.active;
    if (check === true) {
      axios.delete(`${ApiUrl}/SubMenu/${id}`).then((Response) => {
        if (Response.data.status == 200) {
          getData();
        }
      });
    } else {
      axios.delete(`${ApiUrl}/activateSubMenu/${id}`).then((Response) => {
        if (Response.data.status == 200) {
          getData();
        }
      });
    }
  };
  function handleUserId(e, v) {
    console.log(v);
    console.log(Storedata1);
    v.map((m) => {
      Storedata1.push(m.value);
    });
    setStoredata1([]);

    setStoredata({ ...Storedata, user_ids: Storedata1.toString() });
  }
  const Data = allUsers.map((val) => ({
    label: val.username,
    value: val.id,
  }));

  const update = (e) => {
    console.log(Storedata);
    e.preventDefault();

    axios
      .post(`${ApiUrl}/postUserDetails/${Storedata.submenu_id}`, Storedata)
      .then((response) => {
        if (response.status == 200) {
          setAlertOpen(true);
        }
        console.log(response);
      });
  };

  const columns = [
    { field: "submenu_name", headerName: "Submenu ", flex: 1 },
    { field: "menu_name", headerName: "Menu ", flex: 1 },
    { field: "submenu_url", headerName: "Url", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "created_username", headerName: "Created By", flex: 1 },
    { field: "created_date", headerName: "Created Date", flex: 1 },
    {
      headerName: "User Assignment",
      field: "actions",
      type: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          label="User Assignment"
          icon={<AddBoxIcon />}
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
        <Link to={`/SubmenuUpdate/${params.row.id}`}>
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
  ];
  return (
    <>
      <CustomDialogue
        open={Open}
        handleClose={handleClose}
        update={update}
        label="User Assignment"
        alertLabel="Updated Successfully"
      >
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Autocomplete
            multiple
            size="small"
            id="combo-box-demo"
            onChange={handleUserId}
            options={Data}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Users" />}
          />

          {AlertOpen ? (
            <Alert severity="success">Assigned Successfully</Alert>
          ) : (
            ""
          )}
        </Stack>
      </CustomDialogue>

      <GridIndex rows={rows} columns={columns} />
    </>
  );
}
export default SubmenuIndex;

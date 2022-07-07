import { Alert, Button, Snackbar } from "@mui/material";
import React from "react";

export default function SuccessAlert({ open, label, handleClose }) {
  return (
    <>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={10000}
        onClose={handleClose}
      >
        <Alert severity="success" variant="filled" elevation={6}>
          {label}
        </Alert>
      </Snackbar>
    </>
  );
}

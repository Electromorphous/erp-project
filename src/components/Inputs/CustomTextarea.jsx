import React from "react";
import { TextField } from "@mui/material";

export default function CustomTextarea({ label, handleChange, name, value }) {
  return (
    <>
      <TextField
        multiline
        maxRows={4}
        fullWidth
        label={label}
        onChange={handleChange}
        name={name}
        value={value}
      ></TextField>
    </>
  );
}

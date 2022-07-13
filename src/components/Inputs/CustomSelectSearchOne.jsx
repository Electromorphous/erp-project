import { Autocomplete, TextField } from "@mui/material";
import React from "react";

export default function CustomSelectSearchOne({
  label,
  options,
  handleChange,
  name,
  value,
}) {
  function ok(o, v) {
    console.log(v.value);
  }
  return (
    <>
      <Autocomplete
        size="small"
        filterSelectedOptions
        options={options}
        id="auto"
        getOptionLabel={(option) => (option.label ? option.label : "")}
        onChange={handleChange}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
    </>
  );
}

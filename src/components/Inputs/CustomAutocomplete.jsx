import { Autocomplete, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  errorText: {
    fontSize: 12,
    margin: "2px 10px",
    color: theme.palette.error.main,
  },
}));

function CustomAutocomplete({
  label,
  options,
  value,
  name,
  handleChange,
  error,
  required = false,
  disabled = false,
}) {
  const classes = useStyles();

  return (
    <>
      <Autocomplete
        size="small"
        disableClearable
        name={name}
        options={options}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        isOptionEqualToValue={(option, value) => option.label === value.label}
        renderInput={(params) => (
          <TextField
            {...params}
            error={!!error}
            required={required}
            label={label}
          />
        )}
      />
      {error && <p className={classes.errorText}>{error}</p>}
    </>
  );
}

export default CustomAutocomplete;

import {FieldProps} from "formik";
import React, {useState} from "react";
import {FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {ISelectOptions} from "../../store/modalSlice.ts";

interface CustomFormikInputProps extends FieldProps {
  label: string;
  type: "text" | "email" | "password" | "number" | "select";
  selectOptions?: ISelectOptions[];
}

const CustomMuiToFormikInput: React.FC<CustomFormikInputProps> = (
    {field, form, label, type, selectOptions}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = type === "password";
  const errorText = form.touched[field.name] && form.errors[field.name];

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  if (type === "select") {
    return (
        <FormControl fullWidth>
          <InputLabel id={field.name + label}>{label}</InputLabel>
          <Select
              labelId={field.name + label}
              label={label}
              {...field}
          >
            {selectOptions!.map(({name, id}) => <MenuItem value={id}>{name}</MenuItem>)}
          </Select>
        </FormControl>
    );
  }

  return (
      <TextField
          {...field}
          label={label}
          type={isPasswordType && showPassword ? "text" : type}
          variant="outlined"
          fullWidth
          error={Boolean(errorText)}
          helperText={errorText ? errorText.toString() : ""}
          InputProps={{
            endAdornment: isPasswordType && (
                <InputAdornment position="end">
                  <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                  >
                    {showPassword ? <Visibility/> : <VisibilityOff/>}
                  </IconButton>
                </InputAdornment>
            ),
          }}
      />
  );
};

export default CustomMuiToFormikInput;

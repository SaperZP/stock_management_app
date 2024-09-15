import {FieldProps} from "formik";
import React, {useState} from "react";
import {FormControl, FormHelperText, InputAdornment, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {ISelectOptions} from "../../store/modalSlice.ts";

interface CustomFormikInputProps extends FieldProps {
  label: string;
  type: "text" | "email" | "password" | "number" | "select";
  selectOptions?: ISelectOptions[];
  activeOptions?: Record<string, number>;
}

const CustomMuiToFormikInput: React.FC<CustomFormikInputProps> = (
    {field, form, label, type, selectOptions, activeOptions}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = type === "password";
  const errorText = form.touched[field.name] && form.errors[field.name];
  const [optionValue, setOptionValue] = useState(activeOptions ? activeOptions[field.name] : 0);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  if (type === "select") {
    return (
        <FormControl fullWidth error={Boolean(errorText)}>
          <InputLabel id={field.name + label}>{label}</InputLabel>
          <Select
              {...field}
              labelId={field.name + label}
              label={label}
              value={optionValue}
          >
              {selectOptions!.map(({name, id}) => {

                    return (
                        <MenuItem
                            onClick={() => setOptionValue(id)}
                            key={id}
                            value={id}>{name}
                        </MenuItem>
                    )
                  }
              )}
          </Select>
          <FormHelperText>{errorText ? errorText.toString() : ""}</FormHelperText>
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

import {FieldProps} from "formik";
import React, {useState} from "react";
import {InputAdornment, TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";

interface CustomFormikInputProps extends FieldProps {
  label: string;
  type: string;
}

const CustomMuiToFormikInput: React.FC<CustomFormikInputProps> = (
    {
      field,
      form,
      label,
      type,
      ...props
    }
) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = type === "password";
  const errorText = form.touched[field.name] && form.errors[field.name];

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (
      event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
      <TextField
          {...field}
          {...props}
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

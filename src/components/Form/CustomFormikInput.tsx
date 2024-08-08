import {FieldProps} from "formik";
import React from "react";
import {TextField} from "@mui/material";

interface CustomFormikInputProps extends FieldProps {
  label: string;
  type: string;
}

const CustomFormikInput: React.FC<CustomFormikInputProps> = (
    {
      field,
      form,
      label,
      type,
      ...props
    }
) => {
  const errorText = form.errors[field.name];
  const isTouched = form.touched[field.name];

  return (
      <TextField
          {...field}
          {...props}
          label={label}
          type={type}
          variant="outlined"
          fullWidth
          error={Boolean(isTouched && errorText)}
          helperText={(isTouched && errorText) && errorText.toString()}
      />
  )
};

export default CustomFormikInput;

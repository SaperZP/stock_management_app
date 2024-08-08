import React, {ReactNode} from "react";
import {Box, Typography} from "@mui/material";
import {formBodyStyles} from "./formStyles.ts";

type CustomFormBodyProps = {
  children: ReactNode;
  title: string;
};

const FormBody: React.FC<CustomFormBodyProps> = ({children, title}) => (
    <Box sx={formBodyStyles.container}>
      <Typography variant={"h4"} component={"h2"}>{title}</Typography>
      {children}
    </Box>
);

export default FormBody;



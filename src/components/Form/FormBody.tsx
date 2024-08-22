import React, { ReactNode } from "react";
import { Box, Typography } from "@mui/material";
import { formBodyStyles } from "./formStyles";

type CustomFormBodyProps = {
  children: ReactNode;
  title: string;
};

const FormBody = React.forwardRef<HTMLDivElement, CustomFormBodyProps>(({ children, title }, ref) => (
    <Box sx={formBodyStyles.container} ref={ref} tabIndex={-1}>
      <Typography variant="h4" component="h2">
        {title}
      </Typography>
      {children}
    </Box>
));

export default FormBody;

import React from "react";
import { useFormikContext } from "formik";
import {Button} from "@mui/material";

type SubmitButtonProps = {
  text: string;
};

const SubmitButton: React.FC<SubmitButtonProps> = ({ text }) => {
  const { isValid, dirty } = useFormikContext();
  const shouldDisable = !isValid || !dirty;

  return (
        <Button
            type="submit"
            variant="contained"
            disabled={shouldDisable}
        >
          {text}
        </Button>
  );
};
export default SubmitButton;

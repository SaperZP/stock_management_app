import React from "react";
import { useFormikContext } from "formik";
import {Button} from "@mui/material";
import {submitButtonStyles} from "./formStyles.ts";

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
            sx={submitButtonStyles.button}
            // className={`mb-4 w-full rounded py-2 text-white hover:bg-blue-700 ${shouldDisable ? "bg-gray-400" : "bg-blue-600"} `}
            disabled={shouldDisable}
        >
          {text}
        </Button>
  );
};
export default SubmitButton;

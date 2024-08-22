import {getSxStyles} from "../../utils/getSxStyles.ts";
import {yellow} from "@mui/material/colors";

export const formBodyStyles = getSxStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px',
  },

  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
  },

  link: {
    textDecoration: 'none',
    color: yellow[800],
    fontWeight: "bold",
  }
});

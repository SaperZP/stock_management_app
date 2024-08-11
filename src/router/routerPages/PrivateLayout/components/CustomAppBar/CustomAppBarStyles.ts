import {getSxStyles} from "../../../../../utils/getSxStyles.ts";
import {Theme} from "@mui/material/styles";

const CustomAppBarStyles = getSxStyles({
  toolbar_left: {
    flexGrow: 1,
    display: "flex",
    flexDirection: 'row',
    gap: '20px',
    alignItems: "center",
  },
  menuItem: {
    display: "flex",
    gap: '20px',
  },
  menuItemIcon: {
    color: (theme: Theme) => theme.palette.common.black,
  }
});

export default CustomAppBarStyles;

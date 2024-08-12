import {getSxStyles} from "../../../../../utils/getSxStyles.ts";
import {Theme} from "@mui/material";
import theme from "../../../../../theme.ts";

export const customSidebarStyles = getSxStyles({
  listItem: {
    display: "block",
  },
  listItemButton: {
    minHeight: 48,
    px: 2.5,
  },
  listItemIcon: {
    minWidth: 0,
    mr: 0,
    justifyContent: 'center',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  listItemIcon_open: {
    mr: 3,
  },
  icon: {
    color: (theme: Theme) => theme.palette.common.white,
  },
  listItemText: {
    opacity: 0,
    '.MuiListItemText-primary': {fontWeight: 'bold'},
    color: (theme: Theme) => theme.palette.common.white,

    transition: theme.transitions.create('opacity', {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  listItemText_open: {
    opacity: 1,
  }

});

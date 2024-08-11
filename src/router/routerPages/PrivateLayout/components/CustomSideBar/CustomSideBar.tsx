import {StyledDrawer, StyledDrawerHeader} from "../../styledComponents.ts";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import * as React from "react";

type CustomSideBarProps = {
      isDrawerOpen: boolean;
};

const CustomSideBar: React.FC<CustomSideBarProps> = ({isDrawerOpen}) => (
    <StyledDrawer variant="permanent" open={isDrawerOpen}>
      <StyledDrawerHeader/>
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{display: 'block'}}>
              <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: isDrawerOpen ? 'initial' : 'center',
                    px: 2.5,
                  }}
              >
                <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: isDrawerOpen ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                >
                  {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                </ListItemIcon>
                <ListItemText primary={text} sx={{opacity: isDrawerOpen ? 1 : 0}}/>
              </ListItemButton>
            </ListItem>
        ))}
      </List>
      <Divider/>
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{display: 'block'}}>
              <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: isDrawerOpen ? 'initial' : 'center',
                    px: 2.5,
                  }}
              >
                <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: isDrawerOpen ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                >
                  {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                </ListItemIcon>
                <ListItemText primary={text} sx={{opacity: isDrawerOpen ? 1 : 0}}/>
              </ListItemButton>
            </ListItem>
        ))}
      </List>
    </StyledDrawer>
);
export default CustomSideBar;

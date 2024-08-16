import {StyledDrawer, StyledDrawerHeader} from "../../styledComponents.ts";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import {
  AdminPanelSettings,
  Dashboard,
  Inventory,
  Receipt,
  ShoppingCart,
  AccountBalance,
  Stars,
  Category
} from '@mui/icons-material/';
import {useLocation, useNavigate} from "react-router-dom";
import {customSidebarStyles} from "./CustomSidebarStyles.ts";

const pages = [
  {name: 'Admin Panel', path: '/admin', icon: AdminPanelSettings},
  {name: 'Dashboard', path: '/', icon: Dashboard},
  {name: 'Products', path: '/products', icon: Inventory},
  {name: 'Sales', path: '/sales', icon: Receipt},
  {name: 'Purchases', path: '/purchases', icon: ShoppingCart},
  {name: 'Firms', path: '/firms', icon: AccountBalance},
  {name: 'Brands', path: '/brands', icon: Stars},
  {name: 'Categories', path: '/categories', icon: Category},
];

type CustomSideBarProps = {
  isDrawerOpen: boolean;
};

const CustomSideBar: React.FC<CustomSideBarProps> = ({isDrawerOpen}) => {
  const location = useLocation();
  const navigation = useNavigate();

  return (
      <StyledDrawer variant="permanent" open={isDrawerOpen}>
        <StyledDrawerHeader/>
        <List>
          {pages.map((page, index) => (
              <ListItem key={page.name + index} disablePadding sx={customSidebarStyles.listItem}>
                <ListItemButton
                    onClick={() => navigation(page.path)}
                    sx={[
                      customSidebarStyles.listItemButton,
                      page.path === location.pathname && customSidebarStyles.listItemButtonActive
                    ]}
                >
                  <ListItemIcon
                      sx={[customSidebarStyles.listItemIcon, isDrawerOpen && customSidebarStyles.listItemIcon_open]}>
                    <page.icon sx={customSidebarStyles.icon}/>
                  </ListItemIcon>
                  <ListItemText
                      primary={page.name}
                      sx={[customSidebarStyles.listItemText, isDrawerOpen && customSidebarStyles.listItemText_open]}/>
                </ListItemButton>
              </ListItem>
          ))}
        </List>
      </StyledDrawer>
  )
};
export default CustomSideBar;

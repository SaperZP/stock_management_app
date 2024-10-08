import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import {Avatar, Menu, MenuItem, Tooltip} from "@mui/material";
import {StyledAppBar} from "../../styledComponents.ts";
import * as React from "react";
import {useAppDispatch, useAppSelector} from "../../../../../store/hooks.ts";
import {Navigate, useNavigate} from "react-router-dom";
import ListItemIcon from "@mui/material/ListItemIcon";
import PasswordIcon from '@mui/icons-material/Password';
import ListItemText from "@mui/material/ListItemText";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CustomAppBarStyles from "./CustomAppBarStyles.ts";
import Divider from "@mui/material/Divider";
import {logoutUserAction} from "../../../../../store/authUserSlice.ts";

type CustomAppBarProps = {
  isDrawerOpen: boolean;
  drawerOpenHandler: () => void;
};

const CustomAppBar: React.FC<CustomAppBarProps> = ({isDrawerOpen, drawerOpenHandler}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {user} = useAppSelector((state) => state.auth);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  if (!user) return <Navigate to={'/'}/>


  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    dispatch(logoutUserAction(user.token));
  };

  const handleGoToProfile = () => {
    setAnchorElUser(null);
    navigate("/profile");
  };


  return (
      <StyledAppBar position="fixed" isDrawerOpen={isDrawerOpen}>
        <Toolbar>
          <Box sx={CustomAppBarStyles.toolbar_left}>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={drawerOpenHandler}
                edge="start"
            >
              <MenuIcon/>
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Stock app
            </Typography>
          </Box>
          <Box>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu}>
                <Avatar alt={user.username} src="/"/>
              </IconButton>
            </Tooltip>
            <Menu
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
              <MenuItem sx={CustomAppBarStyles.menuItem}>
                <Avatar variant={"square"} alt={user.username} src="/"/>
                <Box>
                  <Typography textAlign="center">{user.email}</Typography>
                  <Typography sx={{fontWeight: 'bold'}} textAlign="center">{user.is_superuser ? 'Admin' : 'User'}</Typography>
                </Box>
              </MenuItem>

              <Divider />

              <MenuItem sx={CustomAppBarStyles.menuItem} onClick={handleGoToProfile}>
                <ListItemIcon>
                  <PasswordIcon sx={CustomAppBarStyles.menuItemIcon} />
                </ListItemIcon>
                <ListItemText>Change password</ListItemText>
              </MenuItem>

              <Divider />

              <MenuItem sx={CustomAppBarStyles.menuItem} onClick={handleLogout}>
                <ListItemIcon>
                  <ExitToAppIcon sx={CustomAppBarStyles.menuItemIcon} />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </MenuItem>
            </Menu>
          </Box>

        </Toolbar>
      </StyledAppBar>
  )
}
export default CustomAppBar;

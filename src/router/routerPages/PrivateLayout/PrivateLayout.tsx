import * as React from 'react';
import {Outlet} from "react-router-dom";
import {StyledDrawerHeader} from "./styledComponents.ts";
import CustomAppBar from "./components/CustomAppBar/CustomAppBar.tsx";
import CustomSideBar from "./components/CustomSideBar/CustomSideBar.tsx";
import {Box} from "@mui/material";
import CustomModal from "../../../components/CustomModal/CustomModal.tsx";

const PrivateLayout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  return (
      <Box sx={{display: 'flex', bgcolor: 'project_color_gray.main', minHeight: '100vh'}}>
        <CustomAppBar isDrawerOpen={isDrawerOpen} drawerOpenHandler={handleDrawerToggle}/>
        <CustomSideBar isDrawerOpen={isDrawerOpen}/>
        <Box component="main" sx={{flexGrow: 1, p: 3}}>
          <StyledDrawerHeader/>
          <Outlet/>
          <CustomModal />
        </Box>
      </Box>
  );
}

export default PrivateLayout;

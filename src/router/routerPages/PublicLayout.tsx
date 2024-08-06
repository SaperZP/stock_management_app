import { Outlet } from 'react-router-dom';
import { Box, SvgIcon, Typography } from '@mui/material';
import Icon from '../../assets/images/welcome.svg?react';

const PublicLayout = () => {
  return (
      <Box>
        <Typography variant="h1">PublicLayout</Typography>
        <Box width="500px" height="500px">
          <SvgIcon sx={{width: "100%", height: "100%"}} inheritViewBox component={Icon} />
        </Box>
        <Box>
          <Outlet />
        </Box>
      </Box>
  );
};

export default PublicLayout;

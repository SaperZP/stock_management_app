import {Outlet} from 'react-router-dom';
import {Box, SvgIcon, Typography} from '@mui/material';
import Icon from '/src/assets/images/welcome.svg?react';
import {publicLayoutStyles} from "./styles.ts";

const PublicLayout = () => {

  return (
      <Box sx={publicLayoutStyles.container}>
        <Typography
            sx={publicLayoutStyles.title}
            component="h1"
            variant="h2"
        >
          Stock management app
        </Typography>

        <Box sx={publicLayoutStyles.wrapper}>
          <SvgIcon
              sx={publicLayoutStyles.icon}
              inheritViewBox
              component={Icon}
          />

          <Outlet/>
        </Box>
      </Box>
  );
};

export default PublicLayout;

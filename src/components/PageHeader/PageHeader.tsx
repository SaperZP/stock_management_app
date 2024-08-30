import React from 'react';
import {default as styles} from './PageHeaderStyles.ts'
import Typography from "@mui/material/Typography";
import {Box, Button} from "@mui/material";

type PageHeaderProps = {
  title: string;
  buttonText: string;
  onClick: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({title, onClick, buttonText}) => (
    <Box sx={styles.header}>
      <Typography variant={'h4'}>
        {title}
      </Typography>
      <Button onClick={onClick} variant={"contained"}>
        {buttonText}
      </Button>
    </Box>
);

export default PageHeader;

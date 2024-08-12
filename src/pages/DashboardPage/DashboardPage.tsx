import {FC} from 'react';
import styles from './dashboardPageStyles.ts';
import {Box} from "@mui/material";

interface DashboardPageProps {
}

const DashboardPage: FC<DashboardPageProps> = () => (
    <Box sx={styles.box}>
      DashboardPage Component
    </Box>
);

export default DashboardPage;

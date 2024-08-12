import {FC} from 'react';
import styles from './salesPageStyles.ts';
import {Box} from "@mui/material";

interface SalesPageProps {
}

const SalesPage: FC<SalesPageProps> = () => (
    <Box sx={styles.box}>
      SalesPage Component
    </Box>
);

export default SalesPage;

import {FC} from 'react';
import styles from './purchasesPageStyles.ts';
import {Box} from "@mui/material";

interface PurchasesPageProps {
}

const PurchasesPage: FC<PurchasesPageProps> = () => (
    <Box sx={styles.box}>
      PurchasesPage Component
    </Box>
);

export default PurchasesPage;

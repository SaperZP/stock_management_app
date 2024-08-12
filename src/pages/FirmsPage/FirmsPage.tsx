import {FC} from 'react';
import styles from './firmsPageStyles.ts';
import {Box} from "@mui/material";

interface FirmsPageProps {
}

const FirmsPage: FC<FirmsPageProps> = () => (
    <Box sx={styles.box}>
      FirmsPage Component
    </Box>
);

export default FirmsPage;

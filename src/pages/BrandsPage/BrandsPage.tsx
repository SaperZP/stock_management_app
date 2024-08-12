import {FC} from 'react';
import styles from './brandsPageStyled.ts';
import {Box} from "@mui/material";

interface BrandsPageProps {
}

const BrandsPage: FC<BrandsPageProps> = () => (
    <Box sx={styles.box}>
      BrandsPage Component
    </Box>
);

export default BrandsPage;

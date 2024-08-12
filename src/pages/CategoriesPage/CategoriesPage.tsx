import {FC} from 'react';
import styles from './categoriesPageStyled.ts';
import {Box} from "@mui/material";

interface CategoriesPageProps {
}

const CategoriesPage: FC<CategoriesPageProps> = () => (
    <Box sx={styles.box}>
      CategoriesPage Component
    </Box>
);

export default CategoriesPage;

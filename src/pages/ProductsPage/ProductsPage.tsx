import {FC} from 'react';
import styles from './productsPageStyles.ts';
import {Box} from "@mui/material";

interface ProductsPageProps {
}

const ProductsPage: FC<ProductsPageProps> = () => (
    <Box sx={styles.box}>
      ProductsPage Component
    </Box>
);

export default ProductsPage;

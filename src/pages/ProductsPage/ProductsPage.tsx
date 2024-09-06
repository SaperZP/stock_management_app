import {FC} from 'react';
import styles from './productsPageStyles.ts';
import {Box} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {InputFieldData} from "../../store/modalSlice.ts";

interface ProductsPageProps {
}

const ProductsPage: FC<ProductsPageProps> = () => {
  const dispatch = useAppDispatch();
  const {brands, loading} = useAppSelector(state => state.brands);
  const {formShape, submittedModalData} = useAppSelector(state => state.modal);
  const {user} = useAppSelector(state => state.auth);
  const inputFields: InputFieldData[] = [
    {
      name: 'name',
      label: 'Product Name',
      type: 'text',
    },
    {
      name: 'brand_id',
      label: 'Brand',
      type: 'text',
    },
    {
      name: 'phone',
      label: 'Phone number',
      type: 'text',
    },
    {
      name: 'address',
      label: 'Firm address',
      type: 'text',
    },
  ];

  return (
      <Box sx={styles.box}>
        ProductsPage Component
      </Box>
  )
};

export default ProductsPage;

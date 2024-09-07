import {FC, useEffect} from 'react';
import styles from './productsPageStyles.ts';
import {Box, CircularProgress, Stack} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {clearFormData, InitialValuesTypes, InputFieldData, openModal} from "../../store/modalSlice.ts";
import {getBrandsAction} from "../../store/brandsSlice.ts";
import {getCategoriesAction} from "../../store/categoriesSlice.ts";
import {modalValidationSchemasType} from "../../components/CustomModal/modalValidationSchemas.ts";
import {
  addProductAction,
  deleteProductAction,
  editProductAction,
  getProductsAction
} from "../../store/productsSlice.ts";
import {ICreateProductReq, IEditProductReq, IProductsResp} from "../../types/productsTypes.ts";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import PageHeader from "../../components/PageHeader/PageHeader.tsx";
import IconButton from "@mui/material/IconButton";
import {Edit, DeleteOutline} from "@mui/icons-material/";

interface ProductsPageProps {
}

const ProductsPage: FC<ProductsPageProps> = () => {
  const dispatch = useAppDispatch();
  const {brands, loading: brandsLoading} = useAppSelector(state => state.brands);
  const {categories, loading: categoriesLoading} = useAppSelector(state => state.categories);
  const {products, loading: productsLoading} = useAppSelector(state => state.products);
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
      type: 'select',
      selectOptions: brands,
    },
    {
      name: 'category_id',
      label: 'Category',
      type: 'select',
      selectOptions: categories,
    },
  ];
  const isResourcesLoading = brandsLoading && categoriesLoading && productsLoading;

  const createNewProductModal = () => {
    const initialValues: InitialValuesTypes = {
      name: '',
      category_id: 0,
      brand_id: 0,
    };
    const validationSchema: modalValidationSchemasType = 'newProduct';
    const buttonsText = {submit: 'Add new product', cancel: 'Cancel'}
    dispatch(openModal({initialValues, validationSchema, inputFields, buttonsText}))
  };

  const createEditProduct = (initialValues: InitialValuesTypes, id: number) => {
    const validationSchema: modalValidationSchemasType = 'editProduct';
    const buttonsText = {submit: 'Update product', cancel: 'Cancel'}

    dispatch(openModal({initialValues, validationSchema, inputFields, buttonsText, id}))
  };

  const rows = products.map((product) => ({
    id: product.id,
    name: product.name,
    category: product.category,
    brand: product.brand,
    stock: product.stock
  }));

  const columns = [
    {field: "id", headerName: "#"},
    {field: "name", headerName: 'Name', width: 150},
    {field: "category", headerName: 'Category', width: 150},
    {field: "brand", headerName: 'Brand', width: 150},
    {field: "stock", headerName: 'Stock', width: 150},
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: ({row}: { row: IProductsResp }) => {

        return (
            <Stack direction="row" spacing={2} mt={1} alignItems="center">
              <IconButton onClick={() => createEditProduct(row, row.id)}>
                <Edit sx={{color: 'orange'}}/>
              </IconButton>
              <IconButton onClick={() => dispatch(deleteProductAction({token: user!.token, id: row.id}))}>
                <DeleteOutline sx={{color: 'red'}}/>
              </IconButton>
            </Stack>
        )
      }
    }
  ]

  useEffect(() => {
    dispatch(getBrandsAction(user!.token));
    dispatch(getCategoriesAction(user!.token));
    dispatch(getProductsAction(user!.token));
  }, [dispatch, user]);

  useEffect(() => {
    if (submittedModalData && formShape) {
      switch (formShape.validationSchema) {
        case 'newProduct' : {
          dispatch(addProductAction({
            token: user!.token,
            input: submittedModalData as ICreateProductReq,
          }));
          break;
        }

        case 'editProduct' : {
          dispatch(editProductAction({
            token: user!.token,
            input: submittedModalData as IEditProductReq,
            id: formShape.id as number
          })).then(() => dispatch(clearFormData()));
          break;
        }

        default : {
          console.error('firm action is not recognized!');
        }
      }
    }

  }, [submittedModalData, dispatch, user, formShape]);

  return (
      <Box sx={styles.box}>
        {!isResourcesLoading
            ? <>
              <PageHeader
                  title='Products'
                  buttonText="Add new product"
                  onClick={createNewProductModal}
              />

              <DataGrid
                  columns={columns}
                  rows={rows}
                  slots={{toolbar: GridToolbar}}
                  disableRowSelectionOnClick
                  sx={{
                    bgcolor: 'white',
                    '&.MuiDataGrid-root .MuiDataGrid-cell': {outline: 'none !important'}
                  }}

              />
            </>
            : <CircularProgress color={"error"}/>}
      </Box>
  )
};

export default ProductsPage;

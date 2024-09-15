import {Box, CircularProgress, Stack} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {clearFormData, InitialValuesTypes, InputFieldData, openModal} from "../../store/modalSlice.ts";
import {useCallback, useEffect, useMemo} from "react";
import {modalValidationSchemasType} from "../../components/CustomModal/modalValidationSchemas.ts";
import IconButton from "@mui/material/IconButton";
import {DeleteOutline, Edit} from "@mui/icons-material";
import {getProductsAction} from "../../store/productsSlice.ts";
import {format} from "date-fns";
import {getBrandsAction} from "../../store/brandsSlice.ts";
import {getFirmsAction} from "../../store/firmsSlice.ts";
import {
  addPurchaseAction,
  deletePurchaseAction,
  editPurchaseAction,
  getPurchasesAction
} from "../../store/purchasesSlice.ts";
import {IPurchaseReq} from "../../types/purchasesTypes.ts";
import PageHeader from "../../components/PageHeader/PageHeader.tsx";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";

const PurchasesPage = () => {
  const dispatch = useAppDispatch();
  const {brands, loading: brandsLoading} = useAppSelector(state => state.brands);
  const {products, loading: productsLoading} = useAppSelector(state => state.products);
  const {firms, loading: firmsLoading} = useAppSelector(state => state.firms);
  const {purchases, loading: purchasesLoading} = useAppSelector(state => state.purchases);
  const {formShape, submittedModalData} = useAppSelector(state => state.modal);
  const {user} = useAppSelector(state => state.auth);
  const inputFields: InputFieldData[] = useMemo(() => ([
    {
      name: 'firm_id',
      label: 'Firm',
      type: 'select',
      selectOptions: firms,
    },
    {
      name: 'brand_id',
      label: 'Brand',
      type: 'select',
      selectOptions: brands,
    },
    {
      name: 'product_id',
      label: 'Product',
      type: 'select',
      selectOptions: products,
    },
    {
      name: 'quantity',
      label: 'Quantity',
      type: 'number',
    },
    {
      name: 'price',
      label: 'Price',
      type: 'number',
    },
  ]), [brands, firms, products]);
  const isResourcesLoading = brandsLoading && productsLoading && firmsLoading && purchasesLoading;

  const createNewPurchaseModal = () => {
    const initialValues: InitialValuesTypes = {
      firm_id: 0,
      brand_id: 0,
      product_id: 0,
      quantity: 0,
      price: '',
    };
    const validationSchema: modalValidationSchemasType = 'newPurchase';
    const buttonsText = {submit: 'Add new Purchase', cancel: 'Cancel'}
    dispatch(openModal({initialValues, validationSchema, inputFields, buttonsText}))
  };

  const createEditPurchaseModal = useCallback((id: number) => {
    const initialValues = purchases.find(product => product.id === id) as InitialValuesTypes;
    const purchase = purchases.find(product => product.id === id);
    const activeOptions = {
      firm_id: purchase!.firm_id,
      brand_id: purchase!.brand_id,
      product_id: purchase!.product_id,
    };
    const validationSchema: modalValidationSchemasType = 'editPurchase';
    const buttonsText = {submit: 'Update purchase', cancel: 'Cancel'}

    dispatch(openModal({initialValues, validationSchema, inputFields, buttonsText, id, activeOptions}))
  }, [dispatch, inputFields, purchases]);

  const rows = useMemo(() => purchases.map((product, index) => (
      {
        index,
        id: product.id,
        product: product.product,
        firm: product.firm,
        brand: product.brand,
        category: product.category[0].name,
        price: product.price,
        quantity: product.quantity,
        totalPrice: product.quantity * Number(product.price),
        date: format(new Date(product.created), 'dd.MM.yyyy - HH:mm'),
        owner: product.user,
      }
  )), [purchases]);

  const columns = useMemo(() => ([
    {field: "index", headerName: "#", width: 25},
    {field: "id", headerName: "ProdID", width: 50},
    {field: "product", headerName: 'Product', width: 100},
    {field: "firm", headerName: 'Firm', width: 150},
    {field: "brand", headerName: 'Brand', width: 100},
    {field: "category", headerName: 'Category', width: 150},
    {field: "price", headerName: 'Price', width: 100},
    {field: "quantity", headerName: 'Quantity', width: 100},
    {field: "totalPrice", headerName: 'Total', width: 100},
    {field: "date", headerName: 'Date', width: 150},
    {field: "owner", headerName: 'Owner', width: 150},
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: ({row}: { row: typeof rows[number] }) => (
          <Stack direction="row" spacing={2} mt={1} alignItems="center">
            <IconButton onClick={() => createEditPurchaseModal(row.id)}>
              <Edit sx={{color: 'orange'}}/>
            </IconButton>
            <IconButton onClick={() => dispatch(deletePurchaseAction({token: user!.token, id: row.id}))}>
              <DeleteOutline sx={{color: 'red'}}/>
            </IconButton>
          </Stack>
      )
    }
  ]), [createEditPurchaseModal, dispatch, user]);

  useEffect(() => {
    dispatch(getBrandsAction(user!.token));
    dispatch(getProductsAction(user!.token));
    dispatch(getFirmsAction(user!.token));
    dispatch(getPurchasesAction(user!.token));
  }, [dispatch, user]);

  useEffect(() => {
    if (submittedModalData && formShape) {
      switch (formShape.validationSchema) {
        case 'newPurchase' : {
          dispatch(addPurchaseAction({
            token: user!.token,
            input: submittedModalData as IPurchaseReq,
          }));
          break;
        }

        case 'editPurchase' : {
          dispatch(editPurchaseAction({
            token: user!.token,
            input: submittedModalData as IPurchaseReq,
            id: formShape.id as number
          })).then(() => dispatch(clearFormData()));
          break;
        }

        default : {
          console.error('purchase action is not recognized!');
        }
      }
    }

  }, [submittedModalData, dispatch, user, formShape]);

  return (
      <Box>
        {!isResourcesLoading
            ? <>
              <PageHeader
                  title='Purchases'
                  buttonText="Add new purchase"
                  onClick={createNewPurchaseModal}
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

export default PurchasesPage;

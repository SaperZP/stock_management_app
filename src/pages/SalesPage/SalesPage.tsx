import {Box, CircularProgress, Stack} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {clearFormData, InputFieldData, openModal} from "../../store/modalSlice.ts";
import {useCallback, useEffect, useMemo} from "react";
import {modalValidationSchemasType} from "../../components/CustomModal/modalValidationSchemas.ts";
import {format} from "date-fns";
import IconButton from "@mui/material/IconButton";
import {DeleteOutline, Edit} from "@mui/icons-material";
import {getBrandsAction} from "../../store/brandsSlice.ts";
import {getProductsAction} from "../../store/productsSlice.ts";
import PageHeader from "../../components/PageHeader/PageHeader.tsx";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import {ISalesReq} from "../../types/salesTypes.ts";
import {addSaleAction, deleteSaleAction, editSaleAction, getSalesAction} from "../../store/salesSlice.ts";


const SalesPage = () => {
  const dispatch = useAppDispatch();
  const {brands, loading: brandsLoading} = useAppSelector(state => state.brands);
  const {products, loading: productsLoading} = useAppSelector(state => state.products);
  const {sales, loading: salesLoading} = useAppSelector(state => state.sales);
  const {formShape, submittedModalData} = useAppSelector(state => state.modal);
  const {user} = useAppSelector(state => state.auth);
  const inputFields: InputFieldData[] = useMemo(() => ([
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
  ]), [brands, products]);
  const isResourcesLoading = brandsLoading && productsLoading && salesLoading;

  const createNewSaleModal = () => {
    const initialValues: ISalesReq = {
      brand_id: 0,
      product_id: 0,
      quantity: 0,
      price: '',
    };
    const validationSchema: modalValidationSchemasType = 'newSale';
    const buttonsText = {submit: 'Add new Sale', cancel: 'Cancel'}
    dispatch(openModal({initialValues, validationSchema, inputFields, buttonsText}))
  };

  const createEditSaleModal = useCallback((id: number) => {
    const initialValues = sales.find(sale => sale.id === id) as ISalesReq;
    const activeOptions = {
      brand_id: initialValues.brand_id,
      product_id: initialValues.product_id,
    };
    const validationSchema: modalValidationSchemasType = 'editSale';
    const buttonsText = {submit: 'Update sale', cancel: 'Cancel'}

    dispatch(openModal({initialValues, validationSchema, inputFields, buttonsText, id, activeOptions}))
  }, [dispatch, inputFields, sales]);

  const rows = useMemo(() => sales.map((sale, index) => (
      {
        index,
        id: sale.id,
        product: sale.product,
        brand: sale.brand,
        category: sale.category[0].name,
        price: sale.price,
        quantity: sale.quantity,
        totalPrice: sale.quantity * Number(sale.price),
        date: format(new Date(sale.created), 'dd.MM.yyyy - HH:mm'),
        owner: sale.user,
      }
  )), [sales]);

  const columns = useMemo(() => ([
    {field: "index", headerName: "#", width: 25},
    {field: "id", headerName: "ProdID", width: 50},
    {field: "product", headerName: 'Product', width: 100},
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
            <IconButton onClick={() => createEditSaleModal(row.id)}>
              <Edit sx={{color: 'orange'}}/>
            </IconButton>
            <IconButton onClick={() => dispatch(deleteSaleAction({token: user!.token, id: row.id}))}>
              <DeleteOutline sx={{color: 'red'}}/>
            </IconButton>
          </Stack>
      )
    }
  ]), [createEditSaleModal, dispatch, user]);

  useEffect(() => {
    dispatch(getBrandsAction(user!.token));
    dispatch(getProductsAction(user!.token));
    dispatch(getSalesAction(user!.token));
  }, [dispatch, user]);

  useEffect(() => {
    if (submittedModalData && formShape) {
      switch (formShape.validationSchema) {
        case 'newSale' : {
          dispatch(addSaleAction({
            token: user!.token,
            input: submittedModalData as ISalesReq,
          }));
          break;
        }

        case 'editSale' : {
          dispatch(editSaleAction({
            token: user!.token,
            input: submittedModalData as ISalesReq,
            id: formShape.id as number
          })).then(() => dispatch(clearFormData()));
          break;
        }

        default : {
          console.error('sale action is not recognized!');
        }
      }
    }

  }, [submittedModalData, dispatch, user, formShape]);

  return (
      <Box>
        {!isResourcesLoading
            ? <>
              <PageHeader
                  title='Sales'
                  buttonText="Add new sale"
                  onClick={createNewSaleModal}
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

export default SalesPage;

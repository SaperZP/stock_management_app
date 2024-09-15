import {useEffect} from 'react';
import styles from './categoriesPageStyled.ts';
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {
  addCategoryAction,
  deleteCategoryAction,
  editCategoryAction,
  getCategoriesAction
} from "../../store/categoriesSlice.ts";
import {Create, DeleteOutline} from "@mui/icons-material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from "@mui/material/IconButton";
import {Box, CircularProgress} from "@mui/material";
import {clearFormData, InitialValuesTypes, InputFieldData, openModal} from "../../store/modalSlice.ts";
import {modalValidationSchemasType} from "../../components/CustomModal/modalValidationSchemas.ts";
import PageHeader from "../../components/PageHeader/PageHeader.tsx";
import {ICategoryReq} from "../../types/categoriesServerTypes.ts";

const CategoriesPage = () => {
  const dispatch = useAppDispatch();
  const {categories, loading} = useAppSelector(state => state.categories);
  const {formShape, submittedModalData} = useAppSelector(state => state.modal);
  const {user} = useAppSelector(state => state.auth);

  const createEditModal = (initialValues: InitialValuesTypes, id: number) => {
    const validationSchema: modalValidationSchemasType = 'editCategory';

    const inputFields: InputFieldData[] = [{
      name: 'name',
      label: 'Category Name',
      type: 'text',
    }];

    const buttonsText = {submit: 'Update category', cancel: 'Cancel'}

    dispatch(openModal({initialValues, validationSchema, inputFields, buttonsText, id}))
  };

  const createNewCategoryModal = () => {
    const initialValues: InitialValuesTypes = {name: ''};
    const validationSchema: modalValidationSchemasType = 'newCategory';
    const inputFields: InputFieldData[] = [{
      name: 'name',
      label: 'Category Name',
      type: 'text',
    }];

    const buttonsText = {submit: 'Add new category', cancel: 'Cancel'}

    dispatch(openModal({initialValues, validationSchema, inputFields, buttonsText}))
  }

  useEffect(() => {
    dispatch(getCategoriesAction(user!.token))
  }, [dispatch, user]);

  useEffect(() => {
    if (submittedModalData && formShape) {
      switch (formShape.validationSchema) {
        case 'editCategory' : {
          dispatch(editCategoryAction({
            token: user!.token,
            input: submittedModalData  as ICategoryReq,
            id: formShape.id as number
          })).then(() => dispatch(clearFormData()))
          break;
        }

        case 'newCategory' : {
          dispatch(addCategoryAction({
            token: user!.token,
            input: submittedModalData  as ICategoryReq,
          })).then(() => dispatch(clearFormData()))
          break;
        }

        default : {
          console.error('category action is not recognized!');
        }
      }

    }
  }, [submittedModalData, dispatch, user, formShape])

  return (
      <Box sx={styles.container}>
        {!loading
            ? <>
              <PageHeader
                  title="Categories"
                  buttonText="New Category"
                  onClick={createNewCategoryModal}
              />

              <TableContainer component={Paper}>
                <Table sx={styles.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell align="right">Name</TableCell>
                      <TableCell align="right">Number of Products</TableCell>
                      <TableCell align="right">Edit</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {categories.map(({id, name, product_count}) => (
                        <TableRow key={id} sx={styles.tableRow}>
                          <TableCell component="th" scope="row">
                            {id}
                          </TableCell>
                          <TableCell align="right">{name}</TableCell>
                          <TableCell align="right">{product_count}</TableCell>
                          <TableCell align="right">
                            <IconButton onClick={() => createEditModal({name}, id)}>
                              <Create color="info"/>
                            </IconButton>

                            <IconButton onClick={() => dispatch(deleteCategoryAction({token: user!.token, id}))}>
                              <DeleteOutline color="error"/>
                            </IconButton>
                          </TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
            : <CircularProgress color={"error"}/>
        }
      </Box>
  )
};

export default CategoriesPage;


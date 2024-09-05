import styles from './brandsPageStyles.ts';
import {Box, CircularProgress} from "@mui/material";
import CustomCard from "../../components/Card/CustomCard.tsx";
import PageHeader from "../../components/PageHeader/PageHeader.tsx";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {useEffect} from "react";
import {addBrandAction, deleteBrandAction, editBrandAction, getBrandsAction} from "../../store/brandsSlice.ts";
import {clearFormData, InitialValuesTypes, InputFieldData, openModal} from "../../store/modalSlice.ts";
import {modalValidationSchemasType} from "../../components/CustomModal/modalValidationSchemas.ts";
import {IBrandReq} from "../../types/brandTypes.ts";

const BrandsPage = () => {
  const dispatch = useAppDispatch();
  const {brands, loading} = useAppSelector(state => state.brands);
  const {formShape, submittedModalData} = useAppSelector(state => state.modal);
  const {user} = useAppSelector(state => state.auth);
  const inputFields: InputFieldData[] = [
    {
      name: 'name',
      label: 'Brand Name',
      type: 'text',
    },
    {
      name: 'image',
      label: 'Image Url',
      type: 'text',
    }
  ];

  const createNewBrandModal = () => {
    const initialValues: InitialValuesTypes = {name: '', image: ''};
    const validationSchema: modalValidationSchemasType = 'newBrand';
    const buttonsText = {submit: 'Add new brand', cancel: 'Cancel'}

    dispatch(openModal({initialValues, validationSchema, inputFields, buttonsText}))
  };

  const createEditModal = (initialValues: InitialValuesTypes, id: number) => {
    const validationSchema: modalValidationSchemasType = 'editBrand';
    const buttonsText = {submit: 'Update brand', cancel: 'Cancel'}

    dispatch(openModal({initialValues, validationSchema, inputFields, buttonsText, id}))

  }

  useEffect(() => {
    dispatch(getBrandsAction(user!.token));
  }, [dispatch, user]);

  useEffect(() => {
    if (submittedModalData && formShape) {
      switch (formShape.validationSchema) {
        case 'newBrand' : {
          dispatch(addBrandAction({
            token: user!.token,
            input: submittedModalData as IBrandReq,
          }));
          break;
        }

        case 'editBrand' : {
          dispatch(editBrandAction({
            token: user!.token,
            input: submittedModalData as IBrandReq,
            id: formShape.id as number
          })).then(() => dispatch(clearFormData()));
          break;
        }

        default : {
          console.error('brand action is not recognized!');
        }
      }
    }

  }, [submittedModalData, dispatch, user, formShape]);

  return (
      <Box>
        {!loading
            ? <>
              <PageHeader
                  title='Brands'
                  buttonText="Add new brand"
                  onClick={createNewBrandModal}
              />

              <Box sx={styles.brands}>
                {brands.map((brand) =>
                    <CustomCard
                        id={brand.id}
                        name={brand.name}
                        image={brand.image}
                        key={brand.id}
                        onEdit={() => createEditModal({name: brand.name, image: brand.image}, brand.id)}
                        onDelete={() => dispatch(deleteBrandAction({token: user!.token, id: brand.id}))}
                    />
                )}
              </Box>
            </>
            : <CircularProgress color={"error"}/>
        }
      </Box>
  )
};

export default BrandsPage;

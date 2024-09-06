import {useEffect, useState} from 'react';
import {Box, CircularProgress} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {clearFormData, InitialValuesTypes, InputFieldData, openModal} from "../../store/modalSlice.ts";
import {modalValidationSchemasType} from "../../components/CustomModal/modalValidationSchemas.ts";
import PageHeader from "../../components/PageHeader/PageHeader.tsx";
import CustomCard from "../../components/Card/CustomCard.tsx";
import {addFirmAction, deleteFirmAction, editFirmAction, getFirmsAction} from "../../store/firmsSlice.ts";
import {IFirmsReq} from "../../types/firmsTypes.ts";
import {default as styles} from "./firmsPageStyles.ts";

const FirmsPage = () => {
  const dispatch = useAppDispatch();
  const {firms, loading} = useAppSelector(state => state.firms);
  const {formShape, submittedModalData} = useAppSelector(state => state.modal);
  const {user} = useAppSelector(state => state.auth);
  const inputFields: InputFieldData[] = [
    {
      name: 'name',
      label: 'Firm Name',
      type: 'text',
    },
    {
      name: 'image',
      label: 'Image Url',
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
  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  const createNewFirmModal = () => {
    const initialValues: InitialValuesTypes = {
      name: '',
      image: '',
      phone: '',
      address: '',
    };
    const validationSchema: modalValidationSchemasType = 'newFirm';
    const buttonsText = {submit: 'Add new firm', cancel: 'Cancel'}

    dispatch(openModal({initialValues, validationSchema, inputFields, buttonsText}))
  };

  const createEditFirmModal = (initialValues: InitialValuesTypes, id: number) => {
    const validationSchema: modalValidationSchemasType = 'editFirm';
    const buttonsText = {submit: 'Update firm', cancel: 'Cancel'}

    dispatch(openModal({initialValues, validationSchema, inputFields, buttonsText, id}))
  }

  useEffect(() => {
    dispatch(getFirmsAction(user!.token));
  }, [dispatch, user]);

  useEffect(() => {
    if (submittedModalData && formShape) {
      switch (formShape.validationSchema) {
        case 'newFirm' : {
          dispatch(addFirmAction({
            token: user!.token,
            input: submittedModalData as IFirmsReq,
          }));
          break;
        }

        case 'editFirm' : {
          dispatch(editFirmAction({
            token: user!.token,
            input: submittedModalData as IFirmsReq,
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
      <Box>
        {!loading
            ? <>
              <PageHeader
                  title='Firms'
                  buttonText="Add new firm"
                  onClick={createNewFirmModal}
              />

              <Box sx={styles.firmsContainer}>
                {firms.map((firm) =>
                    <CustomCard
                        id={firm.id}
                        name={firm.name}
                        image={firm.image}
                        key={firm.id}
                        onEdit={() => createEditFirmModal({...firm}, firm.id)}
                        onDelete={() => dispatch(deleteFirmAction({token: user!.token, id: firm.id}))}
                        activeCardId={activeCardId}
                        onCardClick={setActiveCardId}
                    />
                )}
              </Box>
            </>
            : <CircularProgress color={"error"}/>
        }
      </Box>
  )

};

export default FirmsPage;

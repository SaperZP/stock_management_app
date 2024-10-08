import {Box, Button, Modal} from "@mui/material";
import {default as styles} from "./CustomModalStyles.ts";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {closeModal, InitialValuesTypes, submitData} from "../../store/modalSlice.ts";
import {Field, Form, Formik, FormikConfig} from "formik";
import {formBodyStyles} from "../Form/formStyles.ts";
import CustomMuiToFormikInput from "../Form/CustomMuiToFormikInput.tsx";
import SubmitButton from "../Form/SubmitButton.tsx";
import FormBody from "../Form/FormBody.tsx";
import {modalValidationSchemas as schema} from "./modalValidationSchemas.ts"

const CustomModal = () => {
  const dispatch = useAppDispatch();
  const {isOpen, formShape} = useAppSelector(state => state.modal);

  if (!formShape) {
    return null;
  }

  const handleSubmit = (values: InitialValuesTypes) => {
    dispatch(submitData(values));
    dispatch(closeModal());
  };

  const formikConfig: FormikConfig<InitialValuesTypes> = {
    initialValues: formShape.initialValues,
    validationSchema: schema[formShape.validationSchema],
    onSubmit: handleSubmit,
  };

  return (
      <Modal
          open={isOpen}
          onClose={() => dispatch(closeModal())}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
      >
        <FormBody title={""}>
          <Formik {...formikConfig}>
            <Form style={formBodyStyles.form}>
              {formShape.inputFields.map(({name, label, type, selectOptions}) => {
                return (
                    <Field
                        key={name}
                        name={name}
                        label={label}
                        type={type}
                        selectOptions={selectOptions}
                        activeOptions={formShape.activeOptions}
                        component={CustomMuiToFormikInput}
                    />
                )
                  }
              )}

              <Box sx={styles.boxGroup}>
                <SubmitButton text={formShape.buttonsText.submit}/>
                <Button variant={"contained"} onClick={() => dispatch(closeModal())}>
                  {formShape.buttonsText.cancel}
                </Button>
              </Box>
            </Form>
          </Formik>
        </FormBody>
      </Modal>
  )
};

export default CustomModal

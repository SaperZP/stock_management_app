import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IAddCategoryRequest} from "../types/categoriesServerTypes.ts";
import {modalValidationSchemasType} from "../components/CustomModal/modalValidationSchemas.ts";
import {IBrandReq} from "../types/brandTypes.ts";

export interface InputFieldData {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'checkbox';
}

export type InitialValuesTypes = IAddCategoryRequest | IBrandReq;

export type FormShapeType = {
  id?: number;
  initialValues: InitialValuesTypes;
  validationSchema: modalValidationSchemasType;
  inputFields: InputFieldData[];
  buttonsText: {
    submit: string;
    cancel: string;
  }
}

export type ModalState = {
  isOpen: boolean;
  formShape: FormShapeType | null;
  submittedModalData: InitialValuesTypes | null;
}

export const initialState: ModalState = {
  isOpen: false,
  formShape: null,
  submittedModalData: null,
};


const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<FormShapeType>) => {
      state.isOpen = true;
      state.formShape = action.payload;
      state.submittedModalData = null;
    },

    submitData: (state, action: PayloadAction<InitialValuesTypes | null>) => {
      state.submittedModalData = action.payload;
    },

    closeModal: (state) => {
      state.isOpen = false;
    },

    clearFormData: (state) => {
      state.formShape = null;
      state.submittedModalData = null;
    }
  },
});

export const {openModal, closeModal, submitData, clearFormData} = modalSlice.actions;
export default modalSlice.reducer;

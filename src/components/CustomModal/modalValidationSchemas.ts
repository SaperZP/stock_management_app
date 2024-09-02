import * as Yup from 'yup';

export const modalValidationSchemas = {
  newCategory: Yup.object().shape({
    name: Yup.string().required("Required").min(1),
  }),
  editCategory: Yup.object().shape({
    name: Yup.string().required("Required").min(1),
  }),
  newBrand: Yup.object().shape({
    name: Yup.string().required("Required").min(1),
    image: Yup.string().required("Required").min(1),
  }),
  editBrand: Yup.object().shape({
    name: Yup.string().required("Required").min(1),
    image: Yup.string().required("Required").min(1),
  }),
};

export type modalValidationSchemasType = keyof typeof modalValidationSchemas;

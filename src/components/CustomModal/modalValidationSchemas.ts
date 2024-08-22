import * as Yup from 'yup';

export const modalValidationSchemas = {
  editCategory: Yup.object().shape({
    name: Yup.string().required("Required").min(1),
  }),
  newCategory: Yup.object().shape({
    name: Yup.string().required("Required").min(1),
  }),
};

export type modalValidationSchemasType = keyof typeof modalValidationSchemas;

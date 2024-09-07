import * as Yup from 'yup';

export const modalValidationSchemas = {
  newCategory: Yup.object().shape({
    name: Yup.string().required("Required").min(3),
  }),
  editCategory: Yup.object().shape({
    name: Yup.string().required("Required").min(3),
  }),
  newBrand: Yup.object().shape({
    name: Yup.string().required("Required").min(3),
    image: Yup.string().required("Required").min(1),
  }),
  editBrand: Yup.object().shape({
    name: Yup.string().required("Required").min(3),
    image: Yup.string().required("Required").min(1),
  }),
  newFirm: Yup.object().shape({
    name: Yup.string().required("Required").min(3),
    phone: Yup.string().required("Required").min(10),
    image: Yup.string().required("Required").min(1),
    address: Yup.string().required("Required").min(10),
  }),
  editFirm: Yup.object().shape({
    name: Yup.string().required("Required").min(3),
    phone: Yup.string().required("Required").min(10),
    image: Yup.string().required("Required").min(1),
    address: Yup.string().required("Required").min(10),
  }),
  newProduct: Yup.object().shape({
    name: Yup.string().required("Required").min(3),
    category_id: Yup.number().required("Required"),
    brand_id: Yup.number().required("Required"),
  }),
  editProduct: Yup.object().shape({
    name: Yup.string().required("Required").min(3),
    category_id: Yup.number().required("Required"),
    brand_id: Yup.number().required("Required"),
  })
};

export type modalValidationSchemasType = keyof typeof modalValidationSchemas;

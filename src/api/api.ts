import axios from "axios";
import {
  IUserLoginData,
  IUserLoginResponse,
  IUserPassChangeData,
  IUserPassChangeResponse,
  IUserRegisterData,
  IUserRegisterResponse
} from "../types/authServerTypes.ts";
import {ICategoryReq, ICategoryResp} from "../types/categoriesServerTypes.ts";
import {IBrandReq, IBrandResp} from "../types/brandTypes.ts";
import {IFirmsReq, IFirmsResp} from "../types/firmsTypes.ts";
import {IProductReq, IProductsResp} from "../types/productsTypes.ts";
import {IPurchaseReq, IPurchaseResp} from "../types/purchasesTypes.ts";
import {ISalesReq, ISalesResp} from "../types/salesTypes.ts";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const registerUser = async (input: IUserRegisterData): Promise<IUserRegisterResponse> => {

  try {
    const res = await axios.post(`${baseUrl}/account/register/`, input);

    if (!res?.data?.token) {
      console.error("Something went wrong: Missing token in response");
      return Promise.reject(new Error("Something went wrong: Missing token in response"));
    }

    return res.data;
  } catch (error) {
    console.error("An error occurred while registering the user:", error);
    return Promise.reject(error);
  }
};
export const loginUser = async (input: IUserLoginData): Promise<IUserLoginResponse> => {
  try {
    const res = await axios.post(`${baseUrl}/account/auth/login/`, input);

    if (!res?.data?.key) {
      console.error("Something went wrong: Missing key in response");
      return Promise.reject(new Error("Something went wrong: Missing key in response"));
    }

    return res.data;
  } catch (error) {
    console.error("An error occurred while login the user:", error);
    return Promise.reject(error);
  }
}
export const logoutUser = async (token: string) => {
  const headers = {Authorization: `Token ${token}`};
  try {
    const res = await axios.post(`${baseUrl}/account/auth/logout/`, headers);

    if (res.status === 200) {
      return Promise.resolve(res);
    }

    return Promise.reject(new Error(res.statusText + res.status));
  } catch (error) {
    console.error("An error occurred while logout the user:", error);
    return Promise.reject(error);
  }
}
export const changePassword = async (token: string, input: IUserPassChangeData): Promise<IUserPassChangeResponse> => {
  const headers = {Authorization: `Token ${token}`};

  try {
    const res = await axios.post(`${baseUrl}/account/auth/password/change/`, input, {headers});

    if (res.status === 200) {
      return Promise.resolve(res.data);
    }

    return Promise.reject(new Error(res.statusText + res.status));
  } catch (error) {
    console.error("An error occurred while changing password:", error);
    return Promise.reject(error);
  }
};

const getData = async <T>(url: string, token: string): Promise<T> => {
  const headers = {Authorization: `Token ${token}`};

  try {
    const res = await axios.get<T>(url, {headers});
    return res.data;
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    return Promise.reject(error);
  }
};
const addData = async <T, U>(url: string, data: U, token: string): Promise<T> => {
  const headers = {Authorization: `Token ${token}`};

  try {
    const res = await axios.post<T>(url, data, {headers});
    return res.data;
  } catch (error) {
    console.error("An error occurred while posting data:", error);
    return Promise.reject(error);
  }
};
const editData = async <T, U>(url: string, data: U, token: string): Promise<T> => {
  const headers = {Authorization: `Token ${token}`};

  try {
    const res = await axios.put<T>(url, data, {headers});
    return res.data;
  } catch (error) {
    console.error("An error occurred while updating data:", error);
    return Promise.reject(error);
  }
};
const deleteData = async (url: string, token: string): Promise<void> => {
  const headers = {Authorization: `Token ${token}`};

  try {
    await axios.delete(url, {headers});
    return Promise.resolve();
  } catch (error) {
    console.error("An error occurred while deleting data:", error);
    return Promise.reject(error);
  }
};

export const getCategories = (token: string) => getData<ICategoryResp[]>(`${baseUrl}/stock/categories/`, token);
export const addCategory = (data: { token: string, input: ICategoryReq }): Promise<ICategoryResp> =>
    addData<ICategoryResp, ICategoryReq>(`${baseUrl}/stock/categories/`, data.input, data.token);
export const editCategory = (data: { token: string, input: ICategoryReq, id: number }): Promise<ICategoryResp> =>
    editData<ICategoryResp, ICategoryReq>(`${baseUrl}/stock/categories/${data.id}/`, data.input, data.token);
export const deleteCategory = (data: { token: string, id: number }) =>
    deleteData(`${baseUrl}/stock/categories/${data.id}/`, data.token).then(() => data.id);

export const getBrands = (token: string) => getData<IBrandResp[]>(`${baseUrl}/stock/brands/`, token);
export const addBrand = (data: { token: string, input: IBrandReq }) =>
    addData<IBrandResp, IBrandReq>(`${baseUrl}/stock/brands/`, data.input, data.token);
export const editBrand = (data: { token: string, input: IBrandReq, id: number }) =>
    editData<IBrandResp, IBrandReq>(`${baseUrl}/stock/brands/${data.id}/`, data.input, data.token);
export const deleteBrand = (data: { token: string, id: number }) =>
    deleteData(`${baseUrl}/stock/brands/${data.id}/`, data.token).then(() => data.id);

export const getFirms = (token: string) => getData<IFirmsResp[]>(`${baseUrl}/stock/firms/`, token);
export const addFirm = (data: { token: string, input: IFirmsReq }) =>
    addData<IFirmsResp, IFirmsReq>(`${baseUrl}/stock/firms/`, data.input, data.token);
export const editFirm = (data: { token: string, input: IFirmsReq, id: number }) =>
    editData<IFirmsResp, IFirmsReq>(`${baseUrl}/stock/firms/${data.id}/`, data.input, data.token);
export const deleteFirm = (data: { token: string, id: number }) =>
    deleteData(`${baseUrl}/stock/firms/${data.id}/`, data.token).then(() => data.id);

export const getProducts = (token: string) => getData<IProductsResp[]>(`${baseUrl}/stock/products/`, token);
export const addProduct = (data: { token: string, input: IProductReq }) =>
    addData<IProductsResp, IProductReq>(`${baseUrl}/stock/products/`, data.input, data.token);
export const editProduct = (data: { token: string, input: IProductReq, id: number }) =>
    editData<IProductsResp, IProductReq>(`${baseUrl}/stock/products/${data.id}/`, data.input, data.token);
export const deleteProduct = (data: { token: string, id: number }) =>
    deleteData(`${baseUrl}/stock/products/${data.id}/`, data.token).then(() => data.id);

export const getPurchases = (token: string) => getData<IPurchaseResp[]>(`${baseUrl}/stock/purchases/`, token);
export const addPurchase = (data: { token: string, input: IPurchaseReq }) =>
    addData<IPurchaseResp, IPurchaseReq>(`${baseUrl}/stock/purchases/`, data.input, data.token);
export const editPurchase = (data: { token: string, input: IPurchaseReq, id: number }) =>
    editData<IPurchaseResp, IPurchaseReq>(`${baseUrl}/stock/purchases/${data.id}/`, data.input, data.token);
export const deletePurchase = (data: { token: string, id: number }) =>
    deleteData(`${baseUrl}/stock/purchases/${data.id}/`, data.token).then(() => data.id);

export const getSales = (token: string) => getData<ISalesResp[]>(`${baseUrl}/stock/firms/`, token);
export const addSale = (data: { token: string, input: ISalesReq }) =>
    addData<ISalesResp, ISalesReq>(`${baseUrl}/stock/firms/`, data.input, data.token);
export const editSale = (data: { token: string, input: ISalesReq, id: number }) =>
    editData<ISalesResp, ISalesReq>(`${baseUrl}/stock/firms/${data.id}/`, data.input, data.token);
export const deleteSale = (data: { token: string, id: number }) =>
    deleteData(`${baseUrl}/stock/firms/${data.id}/`, data.token).then(() => data.id);

import axios, { AxiosRequestConfig} from "axios";
import {
  IUserLoginData,
  IUserLoginResponse,
  IUserPassChangeData,
  IUserPassChangeResponse,
  IUserRegisterData,
  IUserRegisterResponse
} from "../types/authServerTypes.ts";
import {IAddCategoryRequest, ICategory} from "../types/categoriesServerTypes.ts";
import {IBrandReq, IBrandResp} from "../types/brandTypes.ts";

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
  const headers = { Authorization: `Token ${token}` };

  try {
    const res = await axios.get<T>(url, {headers});
    return res.data;
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    return Promise.reject(error);
  }
};

const addData = async <T, U>(url: string, data: U, token: string): Promise<T> => {
  const headers = { Authorization: `Token ${token}` };

  try {
    const res = await axios.post<T>(url, data, {headers});
    return res.data;
  } catch (error) {
    console.error("An error occurred while posting data:", error);
    return Promise.reject(error);
  }
};

const editData = async <T, U>(url: string, data: U, token: string): Promise<T> => {
  const headers = { Authorization: `Token ${token}` };

  try {
    const res = await axios.put<T>(url, data, {headers});
    return res.data;
  } catch (error) {
    console.error("An error occurred while updating data:", error);
    return Promise.reject(error);
  }
};

const deleteData = async (url: string, token: string): Promise<void> => {
  const headers = { Authorization: `Token ${token}` };

  try {
    await axios.delete(url, {headers});
    return Promise.resolve();
  } catch (error) {
    console.error("An error occurred while deleting data:", error);
    return Promise.reject(error);
  }
};


export const getCategories = (token: string): Promise<ICategory[]> => {
  return getData<ICategory[]>(`${baseUrl}/stock/categories/`, token);
};

export const addCategory = (token: string, input: IAddCategoryRequest): Promise<ICategory> => {
  return addData<ICategory, IAddCategoryRequest>(`${baseUrl}/stock/categories/`, input, token);
};

export const editCategory = (token: string, input: IAddCategoryRequest, id: number): Promise<ICategory> => {
  return editData<ICategory, IAddCategoryRequest>(`${baseUrl}/stock/categories/${id}/`, input, token);
};

export const deleteCategory = (token: string, id: number): Promise<number> => {
  return deleteData(`${baseUrl}/stock/categories/${id}/`, token).then(() => id);
};

export const getBrands = (token: string): Promise<IBrandResp[]> => {
  return getData<IBrandResp[]>(`${baseUrl}/stock/brands/`, token);
};

export const addBrand = (token: string, input: IBrandReq): Promise<IBrandResp> => {
  return addData<IBrandResp, IBrandReq>(`${baseUrl}/stock/brands/`, input, token);
};

export const editBrand = (token: string, input: IBrandReq, id: number): Promise<IBrandResp> => {
  return editData<IBrandResp, IBrandReq>(`${baseUrl}/stock/brands/${id}/`, input, token);
};

export const deleteBrand = (token: string, id: number): Promise<number> => {
  return deleteData(`${baseUrl}/stock/brands/${id}/`, token).then(() => id);
};

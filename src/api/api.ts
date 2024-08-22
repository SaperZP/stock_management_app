import axios from "axios";
import {
  IUserLoginData,
  IUserLoginResponse,
  IUserPassChangeData,
  IUserPassChangeResponse,
  IUserRegisterData,
  IUserRegisterResponse
} from "../types/authServerTypes.ts";
import {IAddCategoryRequest, ICategory} from "../types/categoriesServerTypes.ts";

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

export const getCategories = async (token: string): Promise<ICategory[]> => {
  const headers = {Authorization: `Token ${token}`};

  try {
    const res = await axios.get(`${baseUrl}/stock/categories/`, {headers});

    if (res.status === 200) {
      return Promise.resolve(res.data);
    }

    return Promise.reject(new Error(res.statusText + res.status));
  } catch (error) {
    console.error("An error occurred while fetching categories:", error);
    return Promise.reject(error);
  }
};

export const addCategory = async (token: string, input: IAddCategoryRequest): Promise<ICategory> => {
  const headers = {Authorization: `Token ${token}`};

  try {
    const res = await axios.post(`${baseUrl}/stock/categories/`, input, {headers});

    if (res.status === 201) {
      return Promise.resolve(res.data);
    }

    return Promise.reject(new Error(res.statusText + res.status));
  } catch (error) {
    console.error("An error occurred while adding new category:", error);
    return Promise.reject(error);
  }
};

export const editCategory = async (token: string, input: IAddCategoryRequest, id: number): Promise<ICategory> => {
  const headers = {Authorization: `Token ${token}`};

  try {
    const res = await axios.put(`${baseUrl}/stock/categories/${id}/`, input, {headers});

    if (res.status === 200) {
      return Promise.resolve(res.data);
    }

    return Promise.reject(new Error(res.statusText + res.status));
  } catch (error) {
    console.error("An error occurred while editing category:", error);
    return Promise.reject(error);
  }
};

export const deleteCategory = async (token: string, id: number) => {
  const headers = {Authorization: `Token ${token}`};

  try {
    const res = await axios.delete(`${baseUrl}/stock/categories/${id}/`, {headers});

    if (res.status === 204) {
      return Promise.resolve(id);
    }

    return Promise.reject(new Error(res.statusText + res.status));
  } catch (error) {
    console.error("An error occurred while deleting category:", error);
    return Promise.reject(error);
  }
};

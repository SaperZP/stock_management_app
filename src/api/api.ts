import axios from "axios";
import {IUserLoginData, IUserLoginResponse, IUserRegisterData, IUserRegisterResponse} from "../types/serverTypes.ts";

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

import {createAsyncThunk, createSlice, SerializedError} from "@reduxjs/toolkit";
import {IUserLoginData, IUserRegisterData} from "../types";
import {loginUser, logoutUser, registerUser} from "../api/api.ts";

export interface IAuthUser {
  token: string,
  username: string,
  first_name: string,
  last_name: string,
  email: string,
  is_superuser: boolean
}

type authUserStateType = {
  error: SerializedError | null,
  loading: boolean,
  user: IAuthUser | null
};

const getUserStateFromSession = (): IAuthUser | null => {
  try {
    const serializedUser = sessionStorage.getItem("authUserState");

    if (serializedUser === null) {
      return null
    }

    return JSON.parse(serializedUser);
  } catch (error) {
    console.error("An error occurred while getting user from session:", error);
    return null;
  }
}

const saveUserStateToSession = (user: IAuthUser) => {
  try {
    const serializedState = JSON.stringify(user);
    sessionStorage.setItem('authUserState', serializedState);
  } catch (error) {
    console.error("An error occurred while saving user:", error);
  }
};

const initialState: authUserStateType = {
  error: null,
  loading: false,
  user: getUserStateFromSession(),
};

const authUserSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUserAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.user = {...action.payload, is_superuser: false};
      saveUserStateToSession(state.user);
    });
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    });

    builder.addCase(loginUserAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      const {key, user: {username, first_name, last_name, email, is_superuser}} = action.payload;

      state.loading = false;
      state.user = {token: key, username, first_name, last_name, email, is_superuser};

      saveUserStateToSession(state.user);
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    });

    builder.addCase(logoutUserAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logoutUserAction.fulfilled, (state) => {
      state.loading = false;
      state.user = null;
      sessionStorage.clear();
    });
    builder.addCase(logoutUserAction.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    });
  },
});

const registerUserAction = createAsyncThunk(
    "auth/registerUser",
    (input: IUserRegisterData) => registerUser(input),
);

const loginUserAction = createAsyncThunk(
    "auth/loginUser",
    (input: IUserLoginData) => loginUser(input),
);

const logoutUserAction = createAsyncThunk(
    "auth/logoutUser",
    (token: string) => logoutUser(token),
);

export default authUserSlice.reducer;
export {registerUserAction, loginUserAction, logoutUserAction};

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthError {
  message: string;
}

export interface AuthState {
  isAuth: boolean;
  currentUser?: CurrentUser;
  isLoading: boolean;
  error: AuthError;
}

export interface CurrentUser {
  userName: string;
  name: string;
  email: string;
  mobile: string;
  address: string;
}
export const initialState: AuthState = {
  isAuth: false,
  isLoading: false,
  error: { message: "An Error occurred" },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
    setAuthSuccess: (state, { payload }: PayloadAction<CurrentUser>) => {
      state.currentUser = payload;
      state.isAuth = true;
    },
    setLogOut: (state) => {
      state.isAuth = false;
      state.currentUser = undefined;
      localStorage.removeItem("currentUser");
      localStorage.removeItem("isAuthenticated");
    },
  },
});

export const { setAuthSuccess, setLogOut, setLoading } = authSlice.actions;

export const isAuthSelector = (): boolean => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  return isAuthenticated === "true";
};

export const currentUserSelector = () => {
  const parsedCurrentUser = localStorage.getItem("currentUser");
  if (parsedCurrentUser) {
    return JSON.parse(parsedCurrentUser);
  } else {
    return {};
  }
};

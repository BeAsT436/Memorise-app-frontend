import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Token } from "@/types/user";
import { getToken, removeToken, setToken } from "@/utils/token";
import { parseJWT } from "@/utils/parseJWT";
import { AppError } from "@/types/AppError";
import { toast } from "react-toastify";
import { authURL, baseURL } from "@/consts/api-urls";

interface AuthBody{email:string,password:string}

export const registerUser = createAsyncThunk<ActionPayload,AuthBody>(
  "auth/register",
  async (values, { rejectWithValue }) => {
    try {
      const res = await fetch(baseURL + authURL.REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      return data;
    } catch (error) {
      toast.error((error as AppError)?.response?.data?.message);
      return rejectWithValue({
        message: (error as AppError)?.response?.data?.message,
      });
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (values, { rejectWithValue }) => {
    try {
      const res = await fetch(baseURL + authURL.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      return data;
    } catch (error) {
      toast.error((error as AppError)?.response?.data?.message);
      return rejectWithValue({
        message: (error as AppError)?.response?.data?.message,
      });
    }
  },
);

interface AuthState {
  token: Token | null;
  isAuthenticated: boolean;
}
interface ActionPayload {
  token: string;
  message: string;
}

function authSuccess(state: AuthState, payload: ActionPayload) {
  console.log(payload.token);

  setToken(payload.token);
  state.isAuthenticated = true;
}

const initialState: AuthState = {
  token: parseJWT(getToken()),
  isAuthenticated: parseJWT(getToken()) !== null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthToken: (state, action: PayloadAction<ActionPayload>) => {
      const tokenString = action.payload.token;
      if (!tokenString) {
        state.token = null;
        state.isAuthenticated = false;
        return;
      }
      const token = parseJWT(action.payload.token);
      if (token) {
        state.token = token;
        state.isAuthenticated = true;
        setToken(action.payload.token);
      } else {
        state.token = null;
        state.isAuthenticated = false;
        console.log("error");
      }
    },
    logout: (state) => {
      removeToken();
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        authSuccess(state, action.payload);
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        authSuccess(state, action.payload);
      });
  },
});

export const { setAuthToken, logout } = authSlice.actions;
export const selectAuthState = (state: RootState) => state.auth;
export default authSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { TUser } from "@/types/user";
import { getToken, removeToken, setToken } from "@/utils/auth";

function parseJWT(token: string | null) {
  if (!token) return null;
  try {
    const data = JSON.parse(atob(token.split(".")[1]));
    if (data.exp * 1000 < Date.now()) return null;
    return data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
}



interface AuthState {
  user: TUser | null;
  isAuthenticated: boolean;
}
interface ActionPayload {
  token: string;
  message: string;
}

const initialState: AuthState = {
  user: parseJWT(getToken()),
  isAuthenticated: parseJWT(getToken()) !== null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<ActionPayload>) => {
      const tokenString = action.payload.token;
      if (!tokenString) {
        state.user = null;
        state.isAuthenticated = false;
        return;
      }
      const user = parseJWT(action.payload.token);
      if (user) {
        state.user = user;
        state.isAuthenticated = true;
        setToken(action.payload.token)
      } else {
        state.user = null;
        state.isAuthenticated = false;
        console.log("error");
      }
    },
    logout: (state) => {
      removeToken()
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export const selectAuthState = (state: RootState) => state.auth;
export default authSlice.reducer;

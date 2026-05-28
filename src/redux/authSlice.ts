import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Token} from "@/types/user";
import { getToken, removeToken, setToken } from "@/utils/token";
import { parseJWT } from "@/utils/parseJWT";


interface AuthState {
  token: Token | null;
  isAuthenticated: boolean;
}
interface ActionPayload {
  token: string;
  message: string;
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
        setToken(action.payload.token)
      } else {
        state.token = null;
        state.isAuthenticated = false;
        console.log("error");
      }
    },
    logout: (state) => {
      removeToken()
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setAuthToken, logout } = authSlice.actions;
export const selectAuthState = (state: RootState) => state.auth;
export default authSlice.reducer;

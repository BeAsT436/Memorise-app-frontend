import { RootState } from "./store";
import { TUser } from "@/types/user";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { URL } from "./memorySlice";

interface UpdateDTO {
  name: string;
  email: string;
  id: string
}
// todo connect to extra redusers
export const updateUser = createAsyncThunk(
  "user/update",
  async ( data: UpdateDTO, { rejectWithValue }) => {
    const {id,...rest } = data
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${URL}/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body:JSON.stringify(rest)
      });
      if (!res.ok) {
        throw new Error("failed to update")
      }
      return res.json()
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

interface UserState {
  user: TUser | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({ name: "user", initialState, reducers: {} });

export const selectUserState = (state: RootState) => state.user;

export default userSlice.reducer;


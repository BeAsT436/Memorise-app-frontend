import { baseURL, userURL } from "@/consts/api-urls";
import { RootState } from "./store";
import { TUser } from "@/types/user";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface UpdateDTO {
  name: string;
  email: string;
  id: string;
}
// todo implement get my info
export const updateUser = createAsyncThunk(
  "user/update",
  async (data: UpdateDTO, { rejectWithValue }) => {
    const { id, ...rest } = data;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(baseURL + userURL.UPDATE(id), {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type":"application/json"
        },
        body: JSON.stringify(rest),

      });
      if (!res.ok) {
        throw new Error("failed to update");
      }
      return res.json();
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearState: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export const selectUserState = (state: RootState) => state.user;

export default userSlice.reducer;

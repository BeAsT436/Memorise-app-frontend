import { baseURL, userURL } from "@/consts/api-urls";
import { RootState } from "./store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getToken } from "@/utils/auth";

interface UpdateDTO {
  name: string;
  email: string;
  avatar: string;
  id: string;
}
export const getProfile = createAsyncThunk(
  "user/getProfile",
  async (id: string, { rejectWithValue }) => {
    try {
      const token = getToken();
      const res = await fetch(baseURL + userURL.GET_PROFILE(id), {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        throw new Error("failed to get profile");
      }
      return await res.json();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const updateUser = createAsyncThunk(
  "user/update",
  async (data: UpdateDTO, { rejectWithValue }) => {
    const { id, ...rest } = data;
    try {
      const token = getToken();
      const res = await fetch(baseURL + userURL.UPDATE(id), {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
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

export const getAllUsers = createAsyncThunk(
  "user/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      const res = await fetch(baseURL + userURL.GET_ALL_USERS, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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


interface User {
  createdAt: string;
  email: string;
  name: string;
  password: string;
  role: string;
  updatedAt: string;
  avatar: string;
  __v: number;
  _id: string;
}

interface UserState {
  users: User[] | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: null,
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearState: (state) => {
      state.users = null
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
      })

      .addCase(getProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })

      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export const selectUserState = (state: RootState) => state.user;

export default userSlice.reducer;

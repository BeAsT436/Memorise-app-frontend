import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface Memory {
  id: string;
  title: string;
  desc: string;
  img: string;
}

export const fetchMemories = createAsyncThunk("memory/fetchAll", async () => {
  const token = localStorage.getItem("token");
  const data = await fetch("http://localhost:3001/api/memory", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.json();
});

const initialState: { memories: Memory[] } = { memories: [] };
const memorySlice = createSlice({
  name: "memory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMemories.fulfilled, (state, action) => {
      state.memories = action.payload;
    });
  },
});
export const selectMemoriesState = (state: RootState) => state.memories;
export default memorySlice.reducer;

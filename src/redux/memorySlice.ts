import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface Memory {
  _id: string;
  userId: string;
  local: string;
  title: string;
  desc: string;
  img: string;
}
export interface MemoryCreateDTO{
  title: string;
  desc: string;
  img: string;
}


const URL = "http://localhost:3001/api/memory";
export const fetchMemories = createAsyncThunk("memory/fetchAll", async () => {
  const token = localStorage.getItem("token");
  const data = await fetch(URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.json();
});

export const deleteMemoryThunk = createAsyncThunk(
  "memory/delete",
  async (id: string) => {
    const token = localStorage.getItem("token");
    await fetch(`${URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return id;
  }
);

export const addMemoryThunk = createAsyncThunk(
  "memory/add",
  async (memoryData: MemoryCreateDTO) => {
    const token = localStorage.getItem("token");
    const responce = await fetch(URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(memoryData),
    });
    return responce.json();
  }
);

const initialState: { memories: Memory[]; loading: boolean } = {
  memories: [],
  loading: false,
};
const memorySlice = createSlice({
  name: "memory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMemories.fulfilled, (state, action) => {
        state.memories = action.payload;
        state.loading = false;
      })
      .addCase(fetchMemories.pending, (state) => {
        state.loading = true;
      });
    builder.addCase(deleteMemoryThunk.fulfilled, (state, action) => {
      state.memories = state.memories.filter(
        (memory) => memory._id !== action.payload
      );
    });
    builder.addCase(addMemoryThunk.fulfilled, (state, action) => {
      state.memories.push(action.payload);
    });
  },
});
export const selectMemoriesState = (state: RootState) => state.memories;

export default memorySlice.reducer;

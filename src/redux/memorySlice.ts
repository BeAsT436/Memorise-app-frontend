import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { getToken } from "@/utils/auth";
import api from "@/api/api";
import { memoryURL } from "@/consts/api-urls";

type Local = "private" | "public";

export interface Memory {
  _id: string;
  userId: string;
  local: Local;
  title: string;
  desc: string;
  img: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface MemoryCreateDTO {
  title: string;
  desc: string;
  img?: string;
  local: Local;
}

const URL = "http://localhost:3001/api/memory";

export const fetchMyMemories = createAsyncThunk("memory/fetchMy", async () => {
  const res = await api.get<Memory[]>(memoryURL.ME);
  return res.data;
});

export const fetchMemories = createAsyncThunk("memory/fetchAll", async () => {
  const token = getToken();
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
    await api.delete(memoryURL.DELETE(id));

    return id;
  }
);

export const addMemoryThunk = createAsyncThunk(
  "memory/add",
  async (memoryData: MemoryCreateDTO) => {
    if (!memoryData.img) {
      delete memoryData.img;
    }

    const res = await api.post(memoryURL.ADD, memoryData);
    return res.data;
  }
);

export const updateMemoryThunk = createAsyncThunk(
  "memory/update",
  async (memoryData: Partial<MemoryCreateDTO> & { id: string }) => {
    const { id, ...rest } = memoryData;

    const res = await api.put(memoryURL.PUT(id), rest);
    console.log("res", res.data);

    return res.data;
  }
);

const initialState: {
  memoryForm: MemoryCreateDTO | null;
  memories: Memory[];
  loading: boolean;
  myMemories: Memory[];
} = {
  memories: [],
  loading: false,
  memoryForm: null,
  myMemories: [],
};

const memorySlice = createSlice({
  name: "memory",
  initialState,
  reducers: {
    openForm: (state) => {
      state.memoryForm = {} as MemoryCreateDTO;
    },
    closeForm: (state) => {
      state.memoryForm = null;
    },
    openEditForm: (state, action: PayloadAction<MemoryCreateDTO>) => {
      state.memoryForm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMemories.fulfilled, (state, action) => {
        state.memories = action.payload;
        state.loading = false;
      })
      .addCase(fetchMemories.pending, (state) => {
        state.loading = true;
      });
    builder.addCase(fetchMyMemories.fulfilled, (state, action) => {
      state.myMemories = action.payload;
    });
    builder.addCase(deleteMemoryThunk.fulfilled, (state, action) => {
      state.myMemories = state.myMemories.filter(
        (memory) => memory._id !== action.payload
      );
      state.memories = state.memories.filter(
        (memory) => memory._id !== action.payload
      );
    });
    builder.addCase(addMemoryThunk.fulfilled, (state, action) => {
      state.myMemories.push(action.payload);
      if (action.payload.local == "public") {
        state.memories.push(action.payload);
      }
    });
    builder.addCase(updateMemoryThunk.fulfilled, (state, action) => {
      const index = state.myMemories.findIndex((memory) => {
        return memory._id === action.payload._id;
      });
      if (index !== -1) {
        state.myMemories[index] = action.payload;
      }
// todo make reverse logic(my memories)

      const globalIndex = state.memories.findIndex((memory) => {
        return memory._id === action.payload._id;
      });
      if (action.payload.local == "private") {
        state.memories = state.memories.filter((memory) => {
          return memory._id !== action.payload._id;
        });
      } else if (globalIndex !== -1) {
        state.memories[globalIndex] = action.payload;
      }
    });
  },
});

export const selectMemoriesState = (state: RootState) => state.memories;
export const selectMemoryForm = (state: RootState) => state.memories.memoryForm;
export const { closeForm, openEditForm, openForm } = memorySlice.actions;
export default memorySlice.reducer;

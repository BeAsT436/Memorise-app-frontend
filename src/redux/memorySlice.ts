import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

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
// {
//     "desc": "85585858585",
//     "title": "28585588",
//     "img": "https://res.cloudinary.com/dexfy4ite/image/upload/v1747980374/ntftvvzhbdk54jydeicc.png",
//     "userId": "67dd1196e51469be5c6fd17d",
//     "local": "public",
//     "_id": "68301073e389afb9d70dc0f1",
//     "createdAt": "2025-05-23T06:06:43.104Z",
//     "updatedAt": "2025-05-23T06:06:43.104Z",
//     "__v": 0,
//     "id": "68301073e389afb9d70dc0f1"
// }

export interface MemoryCreateDTO {
  title: string;
  desc: string;
  img: string;
  local: Local;
}

const URL = "http://localhost:3001/api/memory";
// todo fetch my memories
export const fetchMyMemories = createAsyncThunk(
  "memory/fetchMy",
  async () => {
    const token = localStorage.getItem("token");
    const data = await fetch(`${URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.json()
  }
);
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

export const updateMemoryThunk = createAsyncThunk(
  "memory/update",
  async (memoryData: Partial<MemoryCreateDTO> & { id: string }) => {
    const token = localStorage.getItem("token");
    const { id, ...rest } = memoryData;
    const responce = await fetch(`${URL}/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rest),
    });
    return responce.json();
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
    // todo builder for my memories
    builder.addCase(fetchMyMemories.fulfilled, (state, action) => {
      state.myMemories = action.payload;
    });
    builder.addCase(deleteMemoryThunk.fulfilled, (state, action) => {
      state.memories = state.memories.filter(
        (memory) => memory._id !== action.payload
      );
    });
    builder.addCase(addMemoryThunk.fulfilled, (state, action) => {
      state.memories.push(action.payload);
    });
    builder.addCase(updateMemoryThunk.fulfilled, (state, action) => {
      const index = state.memories.findIndex(
        (memory) => memory._id === action.payload._id
      );
      if (index !== -1) {
        state.memories[index] = action.payload;
      }
    });
  },
});

export const selectMemoriesState = (state: RootState) => state.memories;
export const selectMemoryForm = (state: RootState) => state.memories.memoryForm;
export const { closeForm, openEditForm, openForm } = memorySlice.actions;
export default memorySlice.reducer;

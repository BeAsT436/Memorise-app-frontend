import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { getToken } from "@/utils/token";
import api from "@/api/api";
import { memoryURL } from "@/consts/api-urls";
import { toast } from "react-toastify";

type Local = "private" | "public";

export interface Memory {
  userId: string;
  local: Local;
  title: string;
  desc: string;
  img: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface MemoryUpdateDTO extends MemoryCreateDTO {
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
  },
);

export const addMemoryThunk = createAsyncThunk(
  "memory/add",
  async (memoryData: MemoryCreateDTO) => {
    if (!memoryData.img) {
      delete memoryData.img;
    }

    const res = await api.post(memoryURL.ADD, memoryData);
    return res.data;
  },
);

export const updateMemoryThunk = createAsyncThunk(
  "memory/update",
  async (memoryData: Partial<MemoryUpdateDTO>, { rejectWithValue }) => {
    try {
      const { id, ...rest } = memoryData;
      if (!id) return;

      const res = await api.put(memoryURL.PUT(id), rest);

      toast.success("memory was successfully updated");
      return res.data;
    } catch (error) {
      console.log("error: ", error);

      toast.error(error?.response?.data?.message);
      return rejectWithValue(error.message);
    }
  },
);
type ChangeLocalMemoryResponse = { local: Local; id: string };
export const changeLocalMemoryThunk = createAsyncThunk<
  ChangeLocalMemoryResponse,
  string
>(
  "memory/local",
  // todo fix type
  async (id: string) => {
    try {
      const res = await api.put(memoryURL.LOCAL(id));
      console.log(res.data);
      console.log(id);

      return { local: res.data, id };
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  },
);

const initialState: {
  memoryForm: MemoryCreateDTO | MemoryUpdateDTO | null;
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
        (memory) => memory.id !== action.payload,
      );
      state.memories = state.memories.filter(
        (memory) => memory.id !== action.payload,
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
        return memory.id === action.payload.id;
      });
      if (index !== -1) {
        state.myMemories[index] = action.payload;
      }
      // todo make reverse logic(my memories)

      const globalIndex = state.memories.findIndex((memory) => {
        return memory.id === action.payload.id;
      });
      if (action.payload.local == "private") {
        state.memories = state.memories.filter((memory) => {
          return memory.id !== action.payload.id;
        });
      } else if (globalIndex !== -1) {
        state.memories[globalIndex] = action.payload;
      }
    });

    builder.addCase(changeLocalMemoryThunk.fulfilled, (state, action) => {
      const { local, id } = action.payload;

      const myMemory = state.myMemories.find((memory) => memory.id === id);
      if (myMemory) {
        myMemory.local = local;
      }

      if (local === "private") {
        state.memories = state.memories.filter((memory) => memory.id !== id);
      } else {
        const memory = state.memories.find((memory) => memory.id === id);
        if (memory) {
          memory.local = local;
        }
        if (myMemory) {
          state.memories.push(myMemory);
        }
      }
    });
  },
});

export const selectMemoriesState = (state: RootState) => state.memories;
export const selectMemoryForm = (state: RootState) => state.memories.memoryForm;
export const { closeForm, openEditForm, openForm } = memorySlice.actions;
export default memorySlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = { memories: [] };
const memorySlice = createSlice({
  name: "memory",
  initialState,
  reducers:{
    setMemories:(state, action)=>{
        state.memories = action.payload
    }
  }

});
export const {setMemories} = memorySlice.actions
export const selectMemoriesState = (state)=>state.memories
export default memorySlice.reducer
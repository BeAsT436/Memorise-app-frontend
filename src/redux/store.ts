import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authReducer from "./authSlice"
import memoriesReducer from "./memorySlice"
import userReducer from "./userSlice";

 const store = configureStore({
    reducer: {
        auth: authReducer,
        memories: memoriesReducer,
        user: userReducer
    }
 })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = ()=>useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export default store
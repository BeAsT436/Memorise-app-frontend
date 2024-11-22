import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

type TUser = {
    email:string
    name:string}

interface AuthState{
    user:TUser|null,
    isAuthenticated:boolean
}

const initialState:AuthState  = {
    user: null,
    isAuthenticated: false
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers: {
        setUser: (state, action:PayloadAction<TUser>)=>{
            state.user = action.payload
        }
    }
})

export const {setUser} = authSlice.actions
export const selectAuthState = (state:RootState)=>state.auth
export default authSlice.reducer
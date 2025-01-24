import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

function parseJWT(token:string|null) {
    if (!token) return null
    try {
       const data = JSON.parse(atob(token.split(".")[1]))
       if (data.exp*1000 < Date.now()) return null
       return data
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return null
    }

}

type TUser = {
    email:string
    name:string
    id:string
    iat:number
    exp:number
}

interface AuthState{
    user:TUser|null,
    isAuthenticated:boolean
}
interface ActionPayload{
    token:{
        token:string
    }
    message:string
}

const initialState:AuthState  = {
    user: parseJWT(localStorage.getItem("token")),
    isAuthenticated: parseJWT(localStorage.getItem("token")) !== null
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers: {
        setUser: (state, action:PayloadAction<ActionPayload>)=>{
            const tokenString = action.payload.token.token
            if(!tokenString){
                state.user = null
                state.isAuthenticated = false
                return
            }
            const user = parseJWT(action.payload.token.token)
            if (user) {
                state.user = user
                state.isAuthenticated = true
                localStorage.setItem("token", action.payload.token.token)
            }
            else{
                state.user = null
                state.isAuthenticated = false
                console.log("error");
                
            }
        }
    }
})

export const {setUser} = authSlice.actions
export const selectAuthState = (state:RootState)=>state.auth
export default authSlice.reducer
import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

interface AuthState {
    token: string | null,
    user: {

        name: string,
        email: string
    } | null
}

const initialState:AuthState = {
    token: localStorage.getItem("token"),
    user: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action:PayloadAction<{token: string, user:{name: string , email: string}| null}>) =>{
            state.token = action.payload.token;
            state.user = action.payload.user;
            localStorage.setItem("token", action.payload.token) 
        },
        logout:(state)=>{
            state.token = null
            state.user = null;
            localStorage.removeItem("token") 


        }
    }
})

export const { setCredentials, logout } = authSlice.actions;  // actions export karo
export default authSlice.reducer;  // reducer export karo
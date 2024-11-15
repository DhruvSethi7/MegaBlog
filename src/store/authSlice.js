import { createSlice } from "@reduxjs/toolkit"

const initialState={
    authStatus:false,
    userData:null
}

export const authSlice=createSlice(
    {
        name:'auth',
        initialState,
        reducers:{
            login:(state,action)=>{
                console.log('login');
                console.log(action.payload)
                state.authStatus=true
                state.userData=action.payload
            },
            logout:(state,action)=>{
                state.authStatus=false
                state.userData=null
            }
        }
    }
)
export const {login,logout} = authSlice.actions
export default authSlice.reducer

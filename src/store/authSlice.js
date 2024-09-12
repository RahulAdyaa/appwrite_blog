import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    status:false, // abhi user authenticated nai hai
    userData:null
}
// this createslice is for tracing the authentication
const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers: {
        login:(state,action)=>{
            state.status = true;
            state.userData = action.payload.userData
        },
        logout:(state,action)=>{
            state.status = false;
            state.userData = null
        }

    }
 

})
// reducer ke individual functions bhi export krne padte hain kyuki alag alag componets un functions ko use krke state vagera jaan skta hai
export const {login,logout}=authSlice.actions // ye ese hi export hota hai
export default authSlice.reducer

//ham jo track krne wale hain vo bss inhi do chizo ko hi track krnge 




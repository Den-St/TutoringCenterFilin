import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserT } from "../types/user";

const initialState:UserT = {
    email:'',
    createdAt:null,
    displayName:'',
    photoURL:'',   
    id:'',
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUser(state,payload:PayloadAction<UserT>){
            state.email = payload?.payload.email;
            state.createdAt = payload?.payload.createdAt;
            state.displayName = payload?.payload.displayName;
            state.photoURL = payload?.payload.photoURL;
            state.id = payload?.payload.id; 
        },
        clearAuthedUser(state){
            state.email = '';
            state.createdAt = '';
            state.displayName = '';
            state.photoURL = '';
            state.id = ''; 
        },
    }
});

export const {setUser} = userSlice.actions;
export const {clearAuthedUser} = userSlice.actions;
export default userSlice.reducer;
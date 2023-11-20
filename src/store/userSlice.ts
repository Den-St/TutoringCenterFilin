import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserT } from "../types/user";

const initialState:UserT = {
    email:'',
    createdAt:null,
    displayName:'',
    photoURL:'',   
    id:'',
    name:'',
    surname:'',
    patronymic:'',
    isTeacher:false,
    teacherInfo:undefined
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
            state.name = payload?.payload.name;
            state.surname = payload?.payload.surname;
            state.isTeacher = payload?.payload.isTeacher
            state.teacherInfo = payload?.payload.teacherInfo
            state.patronymic = payload?.payload.patronymic
        },
        clearAuthedUser(state){
            state.email = '';
            state.createdAt = null;
            state.displayName = '';
            state.photoURL = '';
            state.id = ''; 
            state.name = '';
            state.surname = '';
            state.isTeacher = false;
            state.teacherInfo = undefined;
            state.patronymic = '';
        },
    }
});

export const {setUser} = userSlice.actions;
export const {clearAuthedUser} = userSlice.actions;
export default userSlice.reducer;
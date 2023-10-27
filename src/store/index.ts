import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import userReducer from "./userSlice";

export const store = configureStore({
    reducer: {
        user:userReducer,
    },
    middleware:getDefaultMiddleware({
        immutableCheck:false,
        serializableCheck: false,
    })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
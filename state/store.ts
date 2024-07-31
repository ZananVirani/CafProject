import { configureStore } from "@reduxjs/toolkit";
import resReducer from "./residence/resSlice"

export const store = configureStore({
    reducer : {
        resList : resReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
import { configureStore } from "@reduxjs/toolkit";
import resReducer from "./residence/resSlice"
import presetReducer from "./presets/presetSlice"

export const store = configureStore({
    reducer : {
        resList : resReducer,
        presetList : presetReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
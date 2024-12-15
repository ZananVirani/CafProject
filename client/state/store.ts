import { configureStore } from "@reduxjs/toolkit";
import resReducer from "./residence/resSlice"
import presetReducer from "./presets/presetSlice"

// Create the Redux store, with the reducers for the residence (used in account info screen for selecting favourite cafeterias) 
// and preset slices (used to select the "temporary menu" of food items when cafeteria staff are updating the menu).
export const store = configureStore({
    reducer : {
        resList : resReducer,
        presetList : presetReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
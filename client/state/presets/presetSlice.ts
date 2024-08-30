import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface presetState {
    presetList : {
        _id : string;
        name: string;
        image: string;
        allergies: string[];
        type: string;
        averageRating?: Number;
        cafeterias: string[];
      }[]
}

const initState : presetState = {
    presetList : []
}

const presetSlice = createSlice({
    name : "presets",
    initialState : initState,
    reducers : {
        add : (state, action : PayloadAction<    {
            _id : string;
            name: string;
            image: string;
            allergies: string[];
            type: string;
            averageRating?: Number;
            cafeterias: string[];
          }>)=>{
            let unique = true
            for (let item of state.presetList){
                if (action.payload.name == item.name) {
                    unique = false;
                    break;
                }
            }
            unique && state.presetList.push(action.payload);
        },
        rid : (state, action : PayloadAction<{
            _id : string;
            name: string;
            image: string;
            allergies: string[];
            type: string;
            averageRating?: Number;
            cafeterias: string[];
          }>)=>{
            state.presetList = state.presetList.filter((value)=>value.name!=action.payload.name)        },
        clear : (state, action : PayloadAction)=>{
            state.presetList = []
        }
    }
})

export const {add, rid, clear} = presetSlice.actions;
export type {presetState}
export default presetSlice.reducer;
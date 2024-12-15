import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Array of Cafeteria Names.
interface resState {
    resList : Array<string>
}

// Initial State of the Residence Slice, the empty array.
const initState : resState = {
    resList : []
}

/* Slice for the residence state, with the add, rid, and clear reducers.
    
        add : adds an array of residence naems to the list of residences.
        rid : removes a residence from the list of residences.
        clear : clears the list of residences.
*/
const resSlice = createSlice({
    name : "residence",
    initialState : initState,
    reducers : {
        add : (state, action : PayloadAction<string[]>)=>{
            if (!(state.resList.includes(action.payload[0]))) state.resList = state.resList.concat(action.payload);
        },
        rid : (state, action : PayloadAction<string>)=>{
            state.resList = state.resList.filter((value)=>value!==action.payload)
        },
        clear : (state, action : PayloadAction<string[]>)=>{
            state.resList = []
        }
    }
})

export const {add, rid, clear} = resSlice.actions;
export default resSlice.reducer;
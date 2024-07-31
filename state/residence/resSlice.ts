import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface resState {
    resList : Array<string>
}

const initState : resState = {
    resList : []
}

const resSlice = createSlice({
    name : "residence",
    initialState : initState,
    reducers : {
        add : (state, action : PayloadAction<string[]>)=>{
            if (!(state.resList.includes(action.payload[0]))) state.resList = state.resList.concat(action.payload);
   //         !(state.resList.includes(action.payload)) && state.resList.push(action.payload);
            console.log(state.resList);
        },
        rid : (state, action : PayloadAction<string>)=>{
            state.resList = state.resList.filter((value)=>value!==action.payload)
            console.log(state.resList);
        }
    }
})

export const {add, rid} = resSlice.actions;
export default resSlice.reducer;
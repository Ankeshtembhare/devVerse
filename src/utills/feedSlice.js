
import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({

    name: "feed",
    initialState:null,
    reducers:{
        addFeed:(state,action)=> action.payload,
        removeuserFeed:(state , action)=>{
            const newfeed  = state.filter((user)=> user._id !== action.payload);
            return newfeed;
        },
    },

});

export const {addFeed,removeuserFeed} = feedSlice.actions;

export default feedSlice.reducer;
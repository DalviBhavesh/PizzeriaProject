import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//async Action
export const getAllIngredients = createAsyncThunk("getAllIngredients",async()=>{
    const response = await axios.get('http://localhost:7002/fetchIngredients/all')
    return response.data;
})

const ingredientsSlice = createSlice({

    name: 'ingredientsSlice',
    
    initialState:{
        isLoading:true,
        data:false,
        isError:false
    },
    
    extraReducers:(builder)=>{
        builder.addCase(getAllIngredients.fulfilled,(state, action)=>{
            state.isLoading = false;
            state.data = action.payload;
        })
        builder.addCase(getAllIngredients.pending,(state, action)=>{
            state.isLoading = true;
            state.isError = false;
        })
        builder.addCase(getAllIngredients.rejected,(state,action)=>{
            state.isError = true;
            state.isLoading = false;
        })
    }

})

export default ingredientsSlice.reducer;
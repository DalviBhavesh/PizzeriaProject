import { createSlice } from '@reduxjs/toolkit';
import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';

//async Action
export const getAllPizzas = createAsyncThunk("getAllPizzas", async ()=>{
    const response = await axios.get("http://localhost:7001/fetchPizzas/all");
    return response.data;
})

const dataSlice = createSlice({
    
    name: 'dataSlice',
    
    initialState: {
        isLoading: true,
        data:{},
        isError: false,
    },
    
    extraReducers: (builder)=>{

        builder.addCase(getAllPizzas.pending, (state, action)=>{
            state.isLoading = true;
            state.isError = false;
        });

        builder.addCase(getAllPizzas.rejected, (state, action)=>{
            console.log('ERROR', action.payload);
            state.isLoading = false;
            state.isError = true;
        });

        builder.addCase(getAllPizzas.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.data = action.payload;
        });
    },

})


export default dataSlice.reducer;
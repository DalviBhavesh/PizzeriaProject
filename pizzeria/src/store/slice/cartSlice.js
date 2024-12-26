import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//async Action
export const getCart = createAsyncThunk("getCart", async () => {
  let response = await axios.post("http://localhost:7003/fetchCart/userCart", {
    userID: "Bhavesh",
    password: "Bhavesh@18",
  });

  return response.data;
});

const cartSlice = createSlice({
  name: "cartSlice",

  initialState: {
    isLoading: true,
    data: {},
    isError: false,
  },

  extraReducers: (builder) => {
    builder.addCase(getCart.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });

    builder.addCase(getCart.rejected, (state, action) => {
      console.log("ERROR", action.payload);
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(getCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
  },
});

export default cartSlice.reducer;

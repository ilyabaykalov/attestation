import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axios } from '../../utils';

export const getDishes = createAsyncThunk(
   'cart/getCartList',
   () =>
      axios.get('/dishes')
         .then(({ data }) => data),
);

export const dishSlice = createSlice({
   name: 'dish',
   initialState: {
      list: [],
   },
   extraReducers: (builder) => {
      builder.addCase(
         getDishes.fulfilled,
         (state, { payload: data }) => {
            state.list = data;
         },
      );
   },
});

export const {
   addToCartList,
   removeFromCartList,
} = dishSlice.actions;

export default dishSlice.reducer;

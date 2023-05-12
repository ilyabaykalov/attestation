import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
   name: 'cart',
   initialState: {
      list: [],
      totalPrice: 0,
      dishCount: 0,
   },
   reducers: {
      addToCartList: (state, { payload }) => {
         state.list.push(payload);

         state.totalPrice += payload.price;
         state.dishCount++;
      },
      removeFromCartList: (state, { payload: id }) => {
         state.totalPrice -= state.list.find((dish) => dish.id === id).price;

         state.list = state.list.filter((dish) => dish.id !== id);
         state.dishCount--;
      },
   },
});

export const {
   addToCartList,
   removeFromCartList,
} = cartSlice.actions;

export default cartSlice.reducer;

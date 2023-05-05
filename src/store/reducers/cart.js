import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axios } from '../../utils';

export const getCartList = createAsyncThunk(
   'cart/getCartList',
   () =>
      axios.get('/dishes')
         .then(({ data }) => data),
);

const addToLocalStorage = (id) => {
   const cart = JSON.parse(localStorage.getItem('cart')) || [];

   cart.push(id);

   localStorage.setItem('cart', JSON.stringify(cart));
};

const removeFromLocalStorage = (id) => {
   let cart = JSON.parse(localStorage.getItem('cart')) || [];

   cart = cart.filter((dishId) => dishId !== id);

   localStorage.setItem('cart', JSON.stringify(cart));
};

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

         addToLocalStorage(payload.id);
      },
      removeFromCartList: (state, { payload: id }) => {
         state.totalPrice -= state.list.find((dish) => dish.id === id).price;

         state.list = state.list.filter((dish) => dish.id !== id);
         state.dishCount--;

         removeFromLocalStorage(id);
      },
   },
   extraReducers: (builder) => {
      builder.addCase(
         getCartList.fulfilled,
         (state, action) => {
            const cartIds = JSON.parse(localStorage.getItem('cart')) || [];

            const cart = action.payload.filter(({ id }) => cartIds.includes(id));

            state.list = cart;
            state.dishCount = cart.length;
            state.totalPrice = cart.reduce((totalPrice, { price }) => totalPrice + price, 0);
         },
      );
   },
});

export const {
   addToCartList,
   removeFromCartList,
} = cartSlice.actions;

export default cartSlice.reducer;

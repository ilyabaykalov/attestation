import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
   name: 'user',
   initialState: {},
   reducers: {
      login: (state, { payload }) => {
         const { email, username, accessToken } = payload;

         state.email = email;
         state.username = username;
         state.accessToken = accessToken;
      },
      logout: (state) => {
         state.email = '';
         state.username = '';
         state.accessToken = '';
      },
   },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;

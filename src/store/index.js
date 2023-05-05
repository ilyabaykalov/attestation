import { configureStore } from '@reduxjs/toolkit';

import { cart, user } from './reducers';

export const store = configureStore({
   reducer: { cart, user },
});

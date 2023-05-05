import React from 'react';
import { createRoot } from 'react-dom/client';

import {
   createBrowserRouter,
   RouterProvider,
} from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from './store';

import { DishesPage, CartPage, Auth } from './pages';
import { PrivateRoute, PublicRoute } from './components';

import './style.scss';

const router = createBrowserRouter([{
   path: '/auth',
   element: <PublicRoute element={<Auth/>}/>,
}, {
   path: '/',
   element: <PrivateRoute element={<DishesPage/>}/>,
}, {
   path: '/cart',
   element: <PrivateRoute element={<CartPage/>}/>,
}]);

const rootContainer = document.getElementById('root');
const root = createRoot(rootContainer);

root.render(
   <Provider store={store}>
      <RouterProvider router={router} />
   </Provider>,
);

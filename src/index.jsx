import React from 'react';
import { createRoot } from 'react-dom/client';

import {
   createBrowserRouter,
   RouterProvider,
} from 'react-router-dom';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store';

import { DishesPage, CartPage, Auth, DishPage } from './pages';
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
}, {
   path: '/dish/:id',
   element: <PrivateRoute element={<DishPage/>}/>,
}]);

const rootContainer = document.getElementById('root');
const root = createRoot(rootContainer);

root.render(
   <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
         <RouterProvider router={router}/>
      </PersistGate>
   </Provider>,
);

import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
   const username = useSelector(({ user }) => user.username);

   if (!username) return <Navigate to={'/auth'} replace/>;

   return element;
};

export default PrivateRoute;

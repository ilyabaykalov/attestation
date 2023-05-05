import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ element }) => {
   const username = useSelector(({ user }) => user.username);

   if (username) return <Navigate to={'/'} replace/>;

   return element;
};

export default PublicRoute;

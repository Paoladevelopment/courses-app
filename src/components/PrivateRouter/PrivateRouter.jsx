import { Outlet, Navigate } from 'react-router-dom';

export const PrivateRoutes = ({ role }) => {
  return role === 'admin' ? <Outlet /> : <Navigate to='/courses' />;
};

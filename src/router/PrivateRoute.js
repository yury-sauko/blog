import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export default function PrivateRoute() {
  const { loginStatus } = useSelector((state) => state.userData);

  return loginStatus === 'loggedIn' ? <Outlet /> : <Navigate to="sign-in" />;
}

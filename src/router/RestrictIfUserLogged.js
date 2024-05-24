import { useSelector } from 'react-redux';
import { useLocation, Outlet, Navigate } from 'react-router-dom';

export default function RestrictIfUserLogged() {
  const { loginStatus } = useSelector((state) => state.userData);
  const location = useLocation();

  return loginStatus === 'loggedIn' &&
    (location.pathname === '/sign-in' || location.pathname === '/sign-up') ? (
    <Navigate to="/" />
  ) : (
    <Outlet />
  );
}

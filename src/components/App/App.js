import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import mwFetchArticles from '../../middlewares/mwFetchArticles';
import AppHeader from './AppHeader/AppHeader';
import AppMainContent from './AppMainContent/AppMainContent';
import classes from './app.module.scss';

export default function App() {
  const { currentPage, offset } = useSelector((state) => state.startPage);
  const { token } = useSelector((state) => state.userData.currUserData);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => dispatch(mwFetchArticles({ token, offset })), 1500);
    return () => {
      clearTimeout(timer);
    };
  }, [currentPage]);

  return (
    <div className={classes.app}>
      <AppHeader />
      <AppMainContent>
        <Outlet />
      </AppMainContent>
    </div>
  );
}

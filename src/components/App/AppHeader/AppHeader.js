import { Link } from 'react-router-dom';
import classes from './app-header.module.scss';

export default function AppHeader() {
  return (
    <header className={classes['app-header']}>
      <Link to="/" className={classes['app-header__link-main']}>
        <h1 className={classes['app-header__h1']}>Realworld Blog</h1>
      </Link>
      <Link to="sign-in" className={classes['app-header__link-sign-in']}>
        Sign In
      </Link>
      <Link to="sign-up" className={classes['app-header__link-sign-up']}>
        Sign Up
      </Link>
    </header>
  );
}

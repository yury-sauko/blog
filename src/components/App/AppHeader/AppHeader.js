import { Link } from 'react-router-dom';
import Button from '../../Button/Button';
import classes from './app-header.module.scss';

export default function AppHeader() {
  return (
    <header className={classes['app-header']}>
      <Link to="/" className={classes['app-header__link-main']}>
        <h1 className={classes['app-header__h1']}>Realworld Blog</h1>
      </Link>
      <Button classMod="button--sign-in">Sign In</Button>
      <Button classMod="button--sign-up">Sign Up</Button>
    </header>
  );
}

import Button from '../Button/Button';
import classes from './app-header.module.scss';

export default function AppHeader() {
  return (
    <header className={classes['app-header']}>
      <h1 className={classes['app-header__h1']}>Realworld Blog</h1>
      <Button classMod="button--sign-in">Sign In</Button>
      <Button classMod="button--sign-up">Sign Up</Button>
    </header>
  );
}

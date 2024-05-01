import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import classes from './sign-in.module.scss';

export default function SignIn() {
  return (
    <form name="sign-in" className={classes['sign-in-form']} noValidate>
      <h2 className={classes['sign-in-form__header']}>Sign In</h2>

      <label htmlFor="email_addr" className={classes['sign-in-form__label']}>
        <span className={classes['sign-in-form__label-text']}>Email address</span>
        <input
          type="email"
          autoComplete="on"
          placeholder="Email address"
          id="email_addr"
          className={classes['sign-in-form__input']}
        />
      </label>

      <label htmlFor="passw" className={classes['sign-in-form__label']}>
        <span className={classes['sign-in-form__label-text']}>Password</span>
        <input
          type="password"
          autoComplete="off"
          placeholder="Password"
          id="passw"
          className={classes['sign-in-form__input']}
        />
      </label>

      <Button classMod="button--full-width">Login</Button>

      <span className={classes['sign-in-form__text-sign-up']}>
        Don’t have an account?{' '}
        <Link to="../sign-up" className={classes['sign-in-form__link-sign-up']}>
          Sign Up
        </Link>
        .
      </span>
    </form>
  );
}

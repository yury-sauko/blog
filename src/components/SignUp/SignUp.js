import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import classes from './sign-up.module.scss';

export default function SignUp() {
  return (
    <form name="sign-up" className={classes['sign-up-form']} noValidate>
      <h2 className={classes['sign-up-form__header']}>Create new account</h2>

      <label htmlFor="userName" className={classes['sign-up-form__label']}>
        <span className={classes['sign-up-form__label-text']}>Username</span>
        <input
          type="text"
          autoComplete="on"
          placeholder="Username"
          id="userName"
          className={classes['sign-up-form__input']}
        />
      </label>

      <label htmlFor="email_addr" className={classes['sign-up-form__label']}>
        <span className={classes['sign-up-form__label-text']}>Email address</span>
        <input
          type="email"
          autoComplete="on"
          placeholder="Email address"
          id="email_addr"
          className={classes['sign-up-form__input']}
        />
      </label>

      <label htmlFor="passw" className={classes['sign-up-form__label']}>
        <span className={classes['sign-up-form__label-text']}>Password</span>
        <input
          type="password"
          autoComplete="off"
          placeholder="Password"
          id="passw"
          className={classes['sign-up-form__input']}
        />
      </label>

      <label htmlFor="passwRep" className={classes['sign-up-form__label']}>
        <span className={classes['sign-up-form__label-text']}>Repeat Password</span>
        <input
          type="password"
          autoComplete="off"
          placeholder="Password"
          id="passwRep"
          className={classes['sign-up-form__input']}
        />
      </label>

      <label htmlFor="checkBox" className={classes['sign-up-form__label']}>
        <input type="checkbox" id="checkBox" className={classes['sign-up-form__checkbox']} />
        <span className={classes['sign-up-form__checkbox-text']}>
          I agree to the processing of my personal information
        </span>
      </label>

      <Button classMod="button--full-width">Create</Button>

      <span className={classes['sign-up-form__text-sign-in']}>
        Already have an account?{' '}
        <Link to="../sign-in" className={classes['sign-up-form__link-sign-in']}>
          Sign In
        </Link>
        .
      </span>
    </form>

    //   <Checkbox name="checkbox" className="sign-up-form__checkbox">
    //     I agree to the processing of my personal information
    //   </Checkbox>
  );
}

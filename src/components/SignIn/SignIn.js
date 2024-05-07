import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { confirmLoginStatus } from '../../store/userData.slice';
import loginUser from '../../middlewares/loginUser';
import Button from '../Button/Button';
import classes from './sign-in.module.scss';

export default function SignIn() {
  const [inputValues, setInputValues] = useState({
    emailInput: '',
    passwInput: '',
  });

  const handleInputChange = (e) => {
    setInputValues((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    const { emailInput, passwInput } = inputValues;

    dispatch(
      loginUser({
        user: {
          email: emailInput,
          password: passwInput,
        },
      }),
    );

    setInputValues({ emailInput: '', passwInput: '' });
  };

  const { loginStatus } = useSelector((state) => state.userData);
  const navigate = useNavigate();
  useEffect(() => {
    if (loginStatus === 'resolved') {
      navigate('..');
      dispatch(confirmLoginStatus());
    }
  }, [loginStatus]);

  return (
    <form name="sign-in" className={classes['sign-in-form']} noValidate onSubmit={onSubmit}>
      <h2 className={classes['sign-in-form__header']}>Sign In</h2>

      <label htmlFor="email_addr" className={classes['sign-in-form__label']}>
        <span className={classes['sign-in-form__label-text']}>Email address</span>
        <input
          type="email"
          autoComplete="on"
          placeholder="Email address"
          id="email_addr"
          className={classes['sign-in-form__input']}
          name="emailInput"
          value={inputValues.emailInput}
          onChange={handleInputChange}
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
          name="passwInput"
          value={inputValues.passwInput}
          onChange={handleInputChange}
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

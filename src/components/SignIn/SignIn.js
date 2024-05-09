import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNamesBind from 'classnames/bind';
import { confirmLoggedIn } from '../../store/userData.slice';
import mwLoginUser from '../../middlewares/mwLoginUser';
import Button from '../Button/Button';
import classes from './sign-in.module.scss';

const cnb = classNamesBind.bind(classes);

const schema = yup
  .object({
    emailInput: yup
      .string()
      .email('Enter a valid email address')
      .min(5, 'Enter a valid email address')
      .max(40, "Too much, isn't it? Maximum 40 characters")
      .required('It is a required field. Please fill'),
    passwInput: yup
      .string()
      .trim('No leading and trailing spaces')
      .strict()
      .min(6, 'Password needs to be at least 6 characters')
      .max(40, 'Password needs to be maximum 40 characters')
      .required('It is a required field. Please fill'),
  })
  .required();

export default function SignIn() {
  const { loginStatus } = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: 'onBlur' });

  const onSubmit = (data) => {
    dispatch(
      mwLoginUser({
        user: {
          email: data.emailInput,
          password: data.passwInput,
        },
      }),
    );
  };

  useEffect(() => {
    if (loginStatus === 'resolved') {
      navigate('..');
      dispatch(confirmLoggedIn());
    }
  }, [loginStatus]);

  return (
    <form
      name="sign-in"
      className={classes['sign-in-form']}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <h2 className={classes['sign-in-form__header']}>Sign In</h2>

      <label htmlFor="email_addr" className={classes['sign-in-form__label']}>
        <span className={classes['sign-in-form__label-text']}>Email address</span>
        <input
          type="email"
          placeholder="Email address"
          id="email_addr"
          autoComplete="on"
          className={cnb('sign-in-form__input', {
            'sign-in-form__input--validation-error': errors.emailInput,
          })}
          {...register('emailInput')}
        />
      </label>
      <p className={classes['sign-in-form__validation-error-text']}>{errors.emailInput?.message}</p>

      <label htmlFor="passw" className={classes['sign-in-form__label']}>
        <span className={classes['sign-in-form__label-text']}>Password</span>
        <input
          type="password"
          placeholder="Password"
          id="passw"
          autoComplete="off"
          className={cnb('sign-in-form__input', {
            'sign-in-form__input--validation-error': errors.passwInput,
          })}
          {...register('passwInput')}
        />
      </label>
      <p className={classes['sign-in-form__validation-error-text']}>{errors.passwInput?.message}</p>

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

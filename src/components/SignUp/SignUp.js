import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNamesBind from 'classnames/bind';
import { confirmCreating } from '../../store/userData.slice';
import mwCreateNewUser from '../../middlewares/mwCreateNewUser';
import Button from '../Button/Button';
import classes from './sign-up.module.scss';

const cnb = classNamesBind.bind(classes);

const schema = yup
  .object({
    userNameInput: yup
      .string()
      .trim('No leading and trailing spaces')
      .strict()
      .min(3, 'Username needs to be at least 3 characters')
      .max(20, 'Password needs to be maximum 20 characters')
      .required('It is a required field. Please fill'),
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
    repeatPasswInput: yup
      .string()
      .trim('No leading and trailing spaces')
      .strict()
      .min(6, 'Password needs to be at least 6 characters')
      .oneOf([yup.ref('passwInput'), null], "Passwords don't match")
      .required('It is a required field. Please fill'),
    checkBoxInput: yup
      .boolean()
      .oneOf([true], 'Please confirm the processing of your data')
      .required('Please confirm the processing of your data'),
  })
  .required();

export default function SignUp() {
  const { createStatus } = useSelector((state) => state.userData);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: 'onBlur' });

  const onSubmit = (data) => {
    dispatch(
      mwCreateNewUser({
        user: {
          username: data.userNameInput,
          email: data.emailInput,
          password: data.passwInput,
        },
      }),
    );
  };

  useEffect(() => {
    if (createStatus === 'resolved') {
      navigate('../success-create-user');
      dispatch(confirmCreating());
    }
  }, [createStatus]);

  return (
    <form
      name="sign-up"
      className={classes['sign-up-form']}
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className={classes['sign-up-form__header']}>Create new account</h2>

      <label htmlFor="userName" className={classes['sign-up-form__label']}>
        <span className={classes['sign-up-form__label-text']}>Username</span>
        <input
          type="text"
          autoComplete="on"
          placeholder="Username"
          id="userName"
          className={cnb('sign-up-form__input', {
            'sign-up-form__input--validation-error': errors.userNameInput,
          })}
          {...register('userNameInput')}
        />
      </label>
      <p className={classes['sign-up-form__validation-error-text']}>
        {errors.userNameInput?.message}
      </p>

      <label htmlFor="email_addr" className={classes['sign-up-form__label']}>
        <span className={classes['sign-up-form__label-text']}>Email address</span>
        <input
          type="email"
          autoComplete="on"
          placeholder="Email address"
          id="email_addr"
          className={cnb('sign-up-form__input', {
            'sign-up-form__input--validation-error': errors.emailInput,
          })}
          {...register('emailInput')}
        />
      </label>
      <p className={classes['sign-up-form__validation-error-text']}>{errors.emailInput?.message}</p>

      <label htmlFor="passw" className={classes['sign-up-form__label']}>
        <span className={classes['sign-up-form__label-text']}>Password</span>
        <input
          type="password"
          autoComplete="off"
          placeholder="Password"
          id="passw"
          className={cnb('sign-up-form__input', {
            'sign-up-form__input--validation-error': errors.passwInput,
          })}
          {...register('passwInput')}
        />
      </label>
      <p className={classes['sign-up-form__validation-error-text']}>{errors.passwInput?.message}</p>

      <label htmlFor="passwRep" className={classes['sign-up-form__label']}>
        <span className={classes['sign-up-form__label-text']}>Repeat Password</span>
        <input
          type="password"
          autoComplete="off"
          placeholder="Password"
          id="passwRep"
          className={cnb('sign-up-form__input', {
            'sign-up-form__input--validation-error': errors.repeatPasswInput,
          })}
          {...register('repeatPasswInput')}
        />
      </label>
      <p className={classes['sign-up-form__validation-error-text']}>
        {errors.repeatPasswInput?.message}
      </p>

      <label htmlFor="checkBox" className={classes['sign-up-form__label']}>
        <input
          type="checkbox"
          id="checkBox"
          className={classes['sign-up-form__checkbox']}
          {...register('checkBoxInput')}
        />
        <span
          className={cnb('sign-up-form__checkbox-text', {
            'sign-up-form__checkbox-text--validation-error': errors.checkBoxInput,
          })}
        >
          I agree to the processing of my personal information
        </span>
      </label>
      <p className={classes['sign-up-form__validation-error-text']}>
        {errors.checkBoxInput?.message}
      </p>

      <Button classMod="button--full-width">Create</Button>

      <span className={classes['sign-up-form__text-sign-in']}>
        Already have an account?{' '}
        <Link to="../sign-in" className={classes['sign-up-form__link-sign-in']}>
          Sign In
        </Link>
        .
      </span>
    </form>
  );
}

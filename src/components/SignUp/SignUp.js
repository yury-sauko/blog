import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { confirmCreating } from '../../store/userData.slice';
import mwCreateNewUser from '../../middlewares/mwCreateNewUser';
import Button from '../Button/Button';
import classes from './sign-up.module.scss';

export default function SignUp() {
  const [inputValues, setInputValues] = useState({
    userNameInput: '',
    emailInput: '',
    passwInput: '',
    repeatPasswInput: '',
  });
  const [checkBoxStatus, setCheckBoxStatus] = useState(false);
  const { createStatus } = useSelector((state) => state.userData);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInputValues((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { userNameInput, emailInput, passwInput } = inputValues;

    dispatch(
      mwCreateNewUser({
        user: {
          username: userNameInput,
          email: emailInput,
          password: passwInput,
        },
      }),
    );

    setInputValues({
      userNameInput: '',
      emailInput: '',
      passwInput: '',
      repeatPasswInput: '',
    });
    setCheckBoxStatus(false);
  };

  useEffect(() => {
    if (createStatus === 'resolved') {
      navigate('../success-create-user');
      dispatch(confirmCreating());
    }
  }, [createStatus]);

  return (
    <form name="sign-up" className={classes['sign-up-form']} noValidate onSubmit={onSubmit}>
      <h2 className={classes['sign-up-form__header']}>Create new account</h2>

      <label htmlFor="userName" className={classes['sign-up-form__label']}>
        <span className={classes['sign-up-form__label-text']}>Username</span>
        <input
          type="text"
          autoComplete="on"
          placeholder="Username"
          id="userName"
          className={classes['sign-up-form__input']}
          name="userNameInput"
          value={inputValues.userNameInput}
          onChange={handleInputChange}
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
          name="emailInput"
          value={inputValues.emailInput}
          onChange={handleInputChange}
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
          name="passwInput"
          value={inputValues.passwInput}
          onChange={handleInputChange}
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
          name="repeatPasswInput"
          value={inputValues.repeatPasswInput}
          onChange={handleInputChange}
        />
      </label>

      <label htmlFor="checkBox" className={classes['sign-up-form__label']}>
        <input
          type="checkbox"
          id="checkBox"
          className={classes['sign-up-form__checkbox']}
          checked={checkBoxStatus}
          onChange={() => setCheckBoxStatus(!checkBoxStatus)}
        />
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
  );
}

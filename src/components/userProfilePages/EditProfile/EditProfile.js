import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classNamesBind from 'classnames/bind';
import { confirmEditing } from '../../../store/userData.slice';
import mwEditUserProfile from '../../../middlewares/mwEditUserProfile';
import Button from '../../_reusable/Button/Button';
import classes from './edit-profile.module.scss';

const cnb = classNamesBind.bind(classes);

const schema = yup
  .object({
    passwInput: yup
      .string()
      .trim('No leading and trailing spaces')
      .strict()
      .min(6, 'Password needs to be at least 6 characters')
      .max(40, 'Password needs to be maximum 40 characters')
      .required('It is a required field. Please fill'),
    avatarUrlInput: yup
      .string()
      .trim('No leading and trailing spaces')
      .strict()
      .url('Enter a valid image url')
      .required('It is a required field. Please fill'),
  })
  .required();

export default function EditProfile() {
  const { username, email, token } = useSelector((state) => state.userData.currUserData);
  const { editUserProfileStatus } = useSelector((state) => state.userData);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: 'onBlur' });

  const onSubmit = (data) => {
    const userInfo = {
      user: {
        username,
        email,
        password: data.passwInput,
        image: data.avatarUrlInput,
      },
    };

    dispatch(mwEditUserProfile({ userInfo, token }));
  };

  useEffect(() => {
    if (editUserProfileStatus === 'resolved') {
      navigate('../success-edit-user-profile');
      dispatch(confirmEditing());
    }
  }, [editUserProfileStatus]);

  return (
    <form
      name="edit-profile"
      className={classes['edit-profile-form']}
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className={classes['edit-profile-form__header']}>Edit Profile</h2>

      <label htmlFor="userName" className={classes['edit-profile-form__label']}>
        <span className={classes['edit-profile-form__label-text']}>Username</span>
        <input
          type="text"
          id="userName"
          name="userNameInput"
          autoComplete="off"
          className={classes['edit-profile-form__input']}
          value={username}
          disabled
        />
      </label>

      <label htmlFor="email_addr" className={classes['edit-profile-form__label']}>
        <span className={classes['edit-profile-form__label-text']}>Email address</span>
        <input
          type="email"
          id="email_addr"
          name="emailInput"
          autoComplete="off"
          className={classes['edit-profile-form__input']}
          value={email}
          disabled
        />
      </label>

      <label htmlFor="passw" className={classes['edit-profile-form__label']}>
        <span className={classes['edit-profile-form__label-text']}>New password</span>
        <input
          type="password"
          autoComplete="off"
          placeholder="New password"
          id="passw"
          className={cnb('edit-profile-form__input', {
            'edit-profile-form__input--validation-error': errors.passwInput,
          })}
          {...register('passwInput')}
        />
      </label>
      <p className={classes['edit-profile-form__validation-error-text']}>
        {errors.passwInput?.message}
      </p>

      <label htmlFor="avatarUrl" className={classes['edit-profile-form__label']}>
        <span className={classes['edit-profile-form__label-text']}>Avatar image (url)</span>
        <input
          type="url"
          autoComplete="on"
          placeholder="Avatar image"
          id="avatarUrl"
          className={cnb('edit-profile-form__input', {
            'edit-profile-form__input--validation-error': errors.avatarUrlInput,
          })}
          {...register('avatarUrlInput')}
        />
      </label>
      <p className={classes['edit-profile-form__validation-error-text']}>
        {errors.avatarUrlInput?.message}
      </p>

      <Button classMod="button--full-width">Save</Button>
    </form>
  );
}

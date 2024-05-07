import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { confirmEditing } from '../../store/userData.slice';
import mwEditUserProfile from '../../middlewares/mwEditUserProfile';
import Button from '../Button/Button';
import classes from './edit-profile.module.scss';

export default function EditProfile() {
  const [inputValues, setInputValues] = useState({
    passwInput: '',
    avatarUrlInput: '',
  });
  const { username, email, token } = useSelector((state) => state.userData.currUserData);
  const { editUserProfileStatus } = useSelector((state) => state.userData);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInputValues((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { passwInput, avatarUrlInput } = inputValues;

    const userInfo = {
      user: {
        username,
        email,
        password: passwInput,
        image: avatarUrlInput,
      },
    };

    dispatch(mwEditUserProfile({ userInfo, token }));

    setInputValues({
      passwInput: '',
      avatarUrlInput: '',
    });
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
      onSubmit={onSubmit}
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
          className={classes['edit-profile-form__input']}
          name="passwInput"
          value={inputValues.passwInput}
          onChange={handleInputChange}
        />
      </label>

      <label htmlFor="avatarUrl" className={classes['edit-profile-form__label']}>
        <span className={classes['edit-profile-form__label-text']}>Avatar image (url)</span>
        <input
          type="url"
          autoComplete="on"
          placeholder="Avatar image"
          id="avatarUrl"
          className={classes['edit-profile-form__input']}
          name="avatarUrlInput"
          value={inputValues.avatarUrlInput}
          onChange={handleInputChange}
        />
      </label>

      <Button classMod="button--full-width">Save</Button>
    </form>
  );
}

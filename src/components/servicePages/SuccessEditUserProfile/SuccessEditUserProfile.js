import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import classes from './success-edit-user-profile.module.scss';

export default function SuccessEditUserProfile() {
  const { username } = useSelector((state) => state.userData.currUserData);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate('../'), 3000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={classes['success-edit-user-profile']}>
      Профиль пользователя{' '}
      <span className={classes['success-edit-user-profile__username']}>{username}</span> успешно
      изменен. Сейчас вы будете перенаправлены на главную страницу
    </div>
  );
}

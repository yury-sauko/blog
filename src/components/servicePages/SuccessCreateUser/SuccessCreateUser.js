import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import classes from './success-create-user.module.scss';

export default function SuccessCreateUser() {
  const { lastCreatedUsername: username } = useSelector((state) => state.userData);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate('../sign-in'), 3000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={classes['success-create-user']}>
      Профиль пользователя{' '}
      <span className={classes['success-create-user__username']}>{username}</span> успешно создан.
      Сейчас вы будете перенаправлены на страницу входа
    </div>
  );
}

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './success-create-article.module.scss';

export default function SuccessCreateArticle() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate('../'), 3000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={classes['success-create-article']}>
      Статья успешно создана. Сейчас вы будете перенаправлены на ее страницу
    </div>
  );
}

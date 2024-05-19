import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import classes from './article-action-type.module.scss';

export default function ArticleActionType() {
  const { lastArticleActionType } = useSelector((state) => state.articleData);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate('../'), 3000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  let actionTypeString;
  switch (lastArticleActionType) {
    case 'create':
      actionTypeString = 'создана';
      break;
    case 'edit':
      actionTypeString = 'отредактирована';
      break;
    case 'delete':
      actionTypeString = 'удалена';
      break;
    default:
      actionTypeString = 'всёПропалоНичегоНеСделалось';
  }

  return (
    <div className={classes['article-action-type']}>
      Статья успешно {actionTypeString}. Сейчас вы будете перенаправлены на главную страницу
    </div>
  );
}

import { Link } from 'react-router-dom';
import classes from './page-not-found.module.scss';

export default function PageNotFound() {
  return (
    <div className={classes['page-not-found']}>
      Данная страница не найдена.{' '}
      <Link to="/" className={classes['page-not-found__link']}>
        Перейти на главную
      </Link>
    </div>
  );
}

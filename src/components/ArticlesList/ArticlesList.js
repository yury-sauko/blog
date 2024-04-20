import ArticleShort from '../ArticleShort/ArticleShort';
import classes from './articles-list.module.scss';

export default function ArticlesList() {
  return (
    <ul className={classes['articles-list']}>
      <ArticleShort />
      <ArticleShort />
      <ArticleShort />
      <ArticleShort />
      <ArticleShort />
    </ul>
  );
}

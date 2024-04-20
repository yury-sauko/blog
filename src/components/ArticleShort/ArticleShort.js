import ArticleHeader from '../ArticleHeader/ArticleHeader';
import ArticleShortText from '../ArticleShortText/ArticleShortText';
import classes from './article-short.module.scss';

export default function ArticleShort() {
  return (
    <li className={classes['article-short']}>
      <ArticleHeader />
      <ArticleShortText classMod="article-short-text--short-card" />
    </li>
  );
}

import PropTypes from 'prop-types';
import ArticleHeader from '../ArticleHeader/ArticleHeader';
import ArticleShortText from '../ArticleShortText/ArticleShortText';
import classes from './article-short.module.scss';

export default function ArticleShort({ slug }) {
  return (
    <li className={classes['article-short']}>
      <ArticleHeader slug={slug} />
      <ArticleShortText slug={slug} classMod="article-short-text--short-card" />
    </li>
  );
}

ArticleShort.propTypes = {
  slug: PropTypes.string.isRequired,
};

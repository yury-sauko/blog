import { useSelector } from 'react-redux';
import classNamesBind from 'classnames/bind';
import PropTypes from 'prop-types';
import classes from './article-short-text.module.scss';

const cnb = classNamesBind.bind(classes);

export default function ArticleShortText({ slug, classMod }) {
  const { articles } = useSelector((state) => state.startPage);
  const [thisArticle] = articles.filter((el) => el.slug === slug);

  const { description } = thisArticle;

  return <span className={cnb('article-short-text', classMod)}>{description}</span>;
}

ArticleShortText.propTypes = {
  slug: PropTypes.string.isRequired,
  classMod: PropTypes.string.isRequired,
};

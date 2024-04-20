import classNamesBind from 'classnames/bind';
import PropTypes from 'prop-types';
import classes from './article-short-text.module.scss';

const cnb = classNamesBind.bind(classes);

export default function ArticleShortText({ classMod }) {
  const articleShortText =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris  nisi ut aliquip ex ea commodo consequat.';

  return <span className={cnb('article-short-text', classMod)}>{articleShortText}</span>;
}

ArticleShortText.propTypes = {
  classMod: PropTypes.string.isRequired,
};

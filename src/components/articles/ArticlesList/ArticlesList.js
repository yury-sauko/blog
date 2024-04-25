import { Comment } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import classNamesBind from 'classnames/bind';
import ArticleShort from '../ArticleShort/ArticleShort';
import classes from './articles-list.module.scss';

const cnb = classNamesBind.bind(classes);

export default function ArticlesList() {
  const { statusArticlesReceipt, articles } = useSelector((state) => state.startPage);
  const mappedArticles = articles.map((el) => <ArticleShort key={el.slug} slug={el.slug} />);
  const spinner = (
    <Comment
      visible
      height="100"
      width="100"
      wrapperClass={classes['comment-loader-wrapper']}
      color="#fff"
      backgroundColor="#1890ff"
    />
  );
  const visibleContent = statusArticlesReceipt !== 'resolved' ? spinner : mappedArticles;

  return (
    <ul
      className={cnb('articles-list', {
        'articles-list--loading': statusArticlesReceipt !== 'resolved',
      })}
    >
      {visibleContent}
    </ul>
  );
}

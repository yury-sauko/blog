import ArticlesList from '../ArticlesList/ArticlesList';
import BlogPagination from '../BlogPagination/BlogPagination';
import classes from './app-main-content.module.scss';

export default function AppMainContent() {
  return (
    <main className={classes['app-main-content']}>
      <ArticlesList />
      <BlogPagination />
    </main>
  );
}

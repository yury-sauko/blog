import { useLoaderData, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Markdown from 'markdown-to-jsx';
import ArticleHeader from '../ArticleHeader/ArticleHeader';
import ArticleShortText from '../ArticleShortText/ArticleShortText';
import classes from './article-full.module.scss';

export default function ArticleFull() {
  const slug = useLoaderData();

  const { loginStatus } = useSelector((state) => state.userData);
  const { articles } = useSelector((state) => state.startPage);
  const [thisArticle] = articles.filter((el) => el.slug === slug);
  const { body } = thisArticle;

  const ifLoggedBtns = (
    <>
      <button type="button" className={classes['article-full__delete-btn']}>
        Delete
      </button>
      <Link to="edit" className={classes['article-full__edit-link']}>
        Edit
      </Link>
    </>
  );

  return (
    <article className={classes['article-full']}>
      <ArticleHeader slug={slug} />
      <div className={classes['article-full__btns-logged-wrapper']}>
        <ArticleShortText slug={slug} classMod="article-short-text--full-card" />
        {loginStatus === 'loggedIn' && ifLoggedBtns}
      </div>
      <br />
      <Markdown className={classes['article-full__md-body']}>{body}</Markdown>
    </article>
  );
}

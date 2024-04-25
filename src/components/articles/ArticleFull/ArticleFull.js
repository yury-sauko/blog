import { useLoaderData } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Markdown from 'markdown-to-jsx';
import ArticleHeader from '../ArticleHeader/ArticleHeader';
import ArticleShortText from '../ArticleShortText/ArticleShortText';
import classes from './article-full.module.scss';

export default function ArticleFull() {
  const slug = useLoaderData();

  const { articles } = useSelector((state) => state.startPage);
  const [thisArticle] = articles.filter((el) => el.slug === slug);
  const { body } = thisArticle;

  return (
    <article className={classes['article-full']}>
      <ArticleHeader slug={slug} />
      <ArticleShortText slug={slug} classMod="article-short-text--full-card" />
      <br />
      <Markdown className={classes['article-full__md-body']}>{body}</Markdown>
    </article>
  );
}

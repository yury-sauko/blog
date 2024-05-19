import { useLoaderData, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Popconfirm } from 'antd';
import Markdown from 'markdown-to-jsx';
import ArticleHeader from '../ArticleHeader/ArticleHeader';
import ArticleShortText from '../ArticleShortText/ArticleShortText';
import { confirmDeleting } from '../../../store/articleData.slice';
import mwFetchArticles from '../../../middlewares/mwFetchArticles';
import mwDeleteArticle from '../../../middlewares/mwDeleteArticle';
import classes from './article-full.module.scss';

export default function ArticleFull() {
  const slug = useLoaderData();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { deleteArticleStatus } = useSelector((state) => state.articleData);
  const { token } = useSelector((state) => state.userData.currUserData);
  const {
    currUserData: { username: currLoggedUserName },
  } = useSelector((state) => state.userData);
  const { offset, articles } = useSelector((state) => state.startPage);
  const [thisArticle] = articles.filter((el) => el.slug === slug);
  const {
    body,
    author: { username: articleAuthorUserName },
  } = thisArticle;

  const thisAuthorIsCurrUser = articleAuthorUserName === currLoggedUserName;

  const confirmDeleteArticle = () => {
    dispatch(mwDeleteArticle({ token, slug }));
  };

  useEffect(() => {
    if (deleteArticleStatus === 'resolved') {
      dispatch(mwFetchArticles({ token, offset }));
      navigate('../article-action-type');
      dispatch(confirmDeleting());
    }
  }, [deleteArticleStatus]);

  const ifLoggedBtns = (
    <>
      <Popconfirm
        description="Are you sure to delete this article?"
        onConfirm={confirmDeleteArticle}
        okText="Yes"
        cancelText="No"
        placement="rightTop"
        overlayInnerStyle={{ width: '246px' }}
      >
        <button type="button" className={classes['article-full__delete-btn']}>
          Delete
        </button>
      </Popconfirm>

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
        {thisAuthorIsCurrUser && ifLoggedBtns}
      </div>
      <br />
      <Markdown className={classes['article-full__md-body']}>{body}</Markdown>
    </article>
  );
}

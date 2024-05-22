import { useEffect } from 'react';
import { Link, useMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { Popover } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import mwFetchFavoriteArticle from '../../../middlewares/mwFetchFavoriteArticle';
import mwFetchArticles from '../../../middlewares/mwFetchArticles';
import defUserAvatar from '../../../assets/img/userAvatar.svg';
import classes from './article-header.module.scss';

export default function ArticleHeader({ slug }) {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.userData.currUserData);
  const { lastFavoriteArticleSlug, lastFavoriteArticleMethod } = useSelector(
    (state) => state.articleData,
  );
  const { articles, offset } = useSelector((state) => state.startPage);
  const [thisArticle] = articles.filter((el) => el.slug === slug);

  const {
    title,
    favorited,
    favoritesCount,
    tagList,
    author: { username, image },
    createdAt,
  } = thisArticle;

  const headerText = title.trim().length > 0 ? title : 'There should be a title here';
  const headerClampedText = headerText.length <= 55 ? headerText : `${headerText.slice(0, 53)}...`;
  const headerClass = classes['article-header__header'];

  const matchHeaderLink = useMatch(`articles/${slug}`);
  const spanHeader = <span className={headerClass}>{headerClampedText}</span>;
  const linkHeader = (
    <Link to={`articles/${slug}`} className={headerClass}>
      {headerClampedText}
    </Link>
  );
  const headerLinkOrSpan = !matchHeaderLink ? linkHeader : spanHeader;

  const userNameClamped = username.length <= 20 ? username : `${username.slice(0, 18)}...`;

  const fetchFavoriteArticle = (isFavorited) =>
    !isFavorited
      ? dispatch(mwFetchFavoriteArticle({ slug, token, method: 'POST' }))
      : dispatch(mwFetchFavoriteArticle({ slug, token, method: 'DELETE' }));

  const heartOutlinedWithCondition = token ? (
    <HeartOutlined
      onClick={() => fetchFavoriteArticle(favorited)}
      className={classes['article-header__like-icon-outlined']}
    />
  ) : (
    <Popover content="Please log in for favorite an article" trigger="click">
      <HeartOutlined
        onClick={() => fetchFavoriteArticle(favorited)}
        className={classes['article-header__like-icon-outlined']}
      />
    </Popover>
  );

  const favoriteArticleIcon = favorited ? (
    <HeartFilled
      onClick={() => fetchFavoriteArticle(favorited)}
      className={classes['article-header__like-icon-filled']}
    />
  ) : (
    heartOutlinedWithCondition
  );

  useEffect(() => {
    dispatch(mwFetchArticles({ token, offset }));
  }, [lastFavoriteArticleSlug, lastFavoriteArticleMethod]);

  return (
    <div className={classes['article-header']}>
      <div className={classes['article-header__left-col']}>
        <div className={classes['article-header__header-wrapper']}>
          {headerLinkOrSpan}
          <div className={classes['article-header__like-wrapper']}>
            {favoriteArticleIcon}
            <span className={classes['article-header__like-count']}>{favoritesCount}</span>
          </div>
        </div>
        <ul className={classes['article-header__tag-list']}>
          {tagList.map((el, idx) => {
            if (el === null) return null;

            const elKey = idx + 1;
            const res =
              el.trim().length > 0 ? (
                <li key={elKey} className={classes['article-header__tag']}>
                  {el}
                </li>
              ) : null;

            return res;
          })}
        </ul>
      </div>
      <div className={classes['article-header__right-col']}>
        <div className={classes['article-header__create-info']}>
          <span className={classes['article-header__user-name']}>{userNameClamped}</span>
          <span className={classes['article-header__create-date']}>{format(createdAt, 'PP')}</span>
        </div>
        <div className={classes['article-header__user-avatar']}>
          <img
            src={image}
            onError={(e) => {
              e.target.src = defUserAvatar;
            }}
            alt="User avatar"
            className={classes['article-header__user-avatar-img']}
          />
        </div>
      </div>
    </div>
  );
}

ArticleHeader.propTypes = {
  slug: PropTypes.string.isRequired,
};

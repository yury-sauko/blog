import { HeartOutlined } from '@ant-design/icons';
import userAvatar from '../../assets/img/userAvatar.svg';
import classes from './article-header.module.scss';

export default function ArticleHeader() {
  const header = 'Some article title';
  const likeCount = 7;
  const tagsTextArr = ['Tag1', 'SomeTag'];
  const userName = 'John Doe';
  const createDate = 'March 5, 2020';

  return (
    <div className={classes['article-header']}>
      <div className={classes['article-header__left-col']}>
        <div className={classes['article-header__header-wrapper']}>
          <span className={classes['article-header__header']}>{header}</span>
          <div className={classes['article-header__like-wrapper']}>
            <HeartOutlined className={classes['article-header__like-icon']} />
            <span className={classes['article-header__like-count']}>{likeCount}</span>
          </div>
        </div>
        <ul className={classes['article-header__tag-list']}>
          {tagsTextArr.map((el, idx) => {
            const elKey = idx + 1;
            return (
              <li key={elKey} className={classes['article-header__tag']}>
                {el}
              </li>
            );
          })}
        </ul>
      </div>
      <div className={classes['article-header__right-col']}>
        <div className={classes['article-header__create-info']}>
          <span className={classes['article-header__user-name']}>{userName}</span>
          <span className={classes['article-header__create-date']}>{createDate}</span>
        </div>
        <div className={classes['article-header__user-avatar']}>
          <img
            src={userAvatar}
            alt="User avatar"
            className={classes['article-header__user-avatar-img']}
          />
        </div>
      </div>
    </div>
  );
}

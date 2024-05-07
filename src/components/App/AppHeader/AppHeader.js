import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { confirmLoggedOut } from '../../../store/userData.slice';
import defUserAvatar from '../../../assets/img/userAvatar.svg';
import classes from './app-header.module.scss';

export default function AppHeader() {
  const { loginStatus } = useSelector((state) => state.userData);
  const { username, image } = useSelector((state) => state.userData.currUserData);

  const userAvatar = image || defUserAvatar;

  const dispatch = useDispatch();

  const onBtnClick = () => {
    dispatch(confirmLoggedOut());
  };

  const authorizedBlock = (
    <>
      <Link to="new-article" className={classes['app-header__link-new-article']}>
        Create article
      </Link>
      <Link to="profile" className={classes['app-header__link-profile']}>
        <span className={classes['app-header__username']}>{username}</span>
        <div className={classes['app-header__avatar-wrapper']}>
          <img src={userAvatar} alt="User avatar" className={classes['app-header__avatar-img']} />
        </div>
      </Link>
      <button type="button" className={classes['app-header__btn-log-out']} onClick={onBtnClick}>
        Log Out
      </button>
    </>
  );

  const nonAuthorizedBlock = (
    <>
      <Link to="sign-in" className={classes['app-header__link-sign-in']}>
        Sign In
      </Link>
      <Link to="sign-up" className={classes['app-header__link-sign-up']}>
        Sign Up
      </Link>
    </>
  );

  const rightBlock = loginStatus === 'loggedIn' ? authorizedBlock : nonAuthorizedBlock;

  return (
    <header className={classes['app-header']}>
      <Link to="/" className={classes['app-header__link-main']}>
        <h1 className={classes['app-header__h1']}>Realworld Blog</h1>
      </Link>

      {rightBlock}
    </header>
  );
}

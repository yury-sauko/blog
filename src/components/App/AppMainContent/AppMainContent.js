import PropTypes from 'prop-types';
import classes from './app-main-content.module.scss';

export default function AppMainContent({ children }) {
  return <main className={classes['app-main-content']}>{children}</main>;
}

AppMainContent.propTypes = {
  children: PropTypes.element.isRequired,
};

import classNamesBind from 'classnames/bind';
import PropTypes from 'prop-types';
import classes from './button.module.scss';

const cnb = classNamesBind.bind(classes);
export default function Button({ children, classMod }) {
  return (
    <button type="submit" className={cnb('button', classMod)}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  classMod: PropTypes.string.isRequired,
};

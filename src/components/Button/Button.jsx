import css from './button.module.scss';
import PropTypes from 'prop-types';

const Button = ({ onClick }) => {
  return (
    <button className={css.load_more_btn} type="button" onClick={onClick}>
      Load more
    </button>
  );
};

export default Button;

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

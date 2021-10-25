import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const Button = ({ children, className, onClick, type, send, sm }) => (
  <button
    type={type}
    onClick={onClick}
    className={cx(className, 'button', { send }, { sm })}
  >
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
  send: PropTypes.bool,
  sm: PropTypes.bool,
  className: PropTypes.string,
};

Button.defaultProps = {
  onClick: () => {},
  type: 'button',
  send: false,
  sm: false,
  className: '',
};

export default Button;

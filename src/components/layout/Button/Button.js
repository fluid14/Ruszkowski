import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const Button = ({ children, onClick, type, send }) => (
  <button type={type} onClick={onClick} className={cx('button', { send })}>
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
  send: PropTypes.bool,
};

Button.defaultProps = {
  onClick: () => {},
  type: 'button',
  send: false,
};

export default Button;

import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './Button.module.sass';

const Button = ({ children, onClick, type }) => (
  <button type={type} onClick={onClick} className={styles.button}>
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
};

Button.defaultProps = {
  onClick: () => {},
  type: 'button',
};

export default Button;

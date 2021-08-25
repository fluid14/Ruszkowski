import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import * as styles from './Header.module.sass';

const Header = ({ title, bgc }) => (
  <header className={styles.header} style={{ backgroundImage: `url(${bgc})` }}>
    <div className={cx(styles.headerWrap, 'wrap')}>
      <h1 className={styles.title}>{title}</h1>
    </div>
  </header>
);

export default Header;

Header.propTypes = {
  title: PropTypes.string.isRequired,
  bgc: PropTypes.string.isRequired,
};

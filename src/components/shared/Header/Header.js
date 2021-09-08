import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Img from 'gatsby-image';
import * as styles from './Header.module.sass';

const Header = ({ title, bgc, bgcAlt }) => (
  <header className={styles.header}>
    <div
      className={cx(styles.headerWrap, 'wrap')}
      dangerouslySetInnerHTML={{ __html: title }}
    />
    <Img fluid={bgc} alt={bgcAlt} className={styles.bgcImg} />
  </header>
);

export default Header;

Header.propTypes = {
  title: PropTypes.string.isRequired,
  bgc: PropTypes.any.isRequired,
  bgcAlt: PropTypes.string.isRequired,
};

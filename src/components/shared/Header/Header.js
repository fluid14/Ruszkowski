import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BackgroundImage from 'gatsby-background-image';
import * as styles from './Header.module.sass';

const Header = ({ title, bgc, bgcAlt }) => (
  <header className={styles.header}>
    <div
      className={cx(styles.headerWrap, 'wrap')}
      dangerouslySetInnerHTML={{ __html: title }}
    />
    <BackgroundImage
      Tag="section"
      className={styles.bgcImg}
      fluid={bgc}
      alt={bgcAlt}
    />
  </header>
);

export default Header;

Header.propTypes = {
  title: PropTypes.string.isRequired,
  bgc: PropTypes.any.isRequired,
  bgcAlt: PropTypes.string.isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BackgroundImage from 'gatsby-background-image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import * as styles from './Header.module.sass';

const Header = ({ className, title, bgc, bgcAlt }) => (
  <header className={cx(className, styles.header)}>
    <div className={styles.socials}>
      <a className={styles.socialIcon} href="instagram.com" target="_blank">
        <FontAwesomeIcon icon={faInstagram} />
      </a>
      <a className={styles.socialIcon} href="facebook.com" target="_blank">
        <FontAwesomeIcon icon={faFacebookF} />
      </a>
    </div>
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

Header.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  bgc: PropTypes.any.isRequired,
  bgcAlt: PropTypes.string.isRequired,
};

Header.defaultProps = {
  className: '',
};

export default Header;

import React from 'react';
import PropTypes from 'prop-types';
import GatsbyImage from 'gatsby-image';
import { Link } from 'gatsby';
import cx from 'classnames';
import * as styles from './Footer.module.sass';

const Footer = ({ logo: { alt, fluid }, links }) => (
  <footer className={cx(styles.footer, 'wrap')}>
    <Link to="/" className={styles.logoWrap}>
      <GatsbyImage fluid={fluid} alt={alt} />
    </Link>

    <div className={styles.linksWrap}>
      {links &&
        links.map(({ footer_link: { url }, footer_link_title: title }) => (
          <a
            className={styles.link}
            href={url}
            key={url}
            target="_blank"
            rel="noreferrer"
          >
            {title}
          </a>
        ))}
    </div>
  </footer>
);

Footer.propTypes = {
  logo: PropTypes.shape({
    alt: PropTypes.string.isRequired,
    fluid: PropTypes.shape.isRequired,
  }).isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      footer_link: PropTypes.shape({
        url: PropTypes.string,
      }).isRequired,
      footer_link_title: PropTypes.string.isRequired,
    })
  ),
};

Footer.defaultProps = {
  links: {
    footer_link: {
      url: '#',
    },
  },
};

export default Footer;

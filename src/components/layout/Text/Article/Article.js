import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import * as styles from './Article.module.sass';

const Article = ({ children, xl, l, className }) => (
  <article
    className={cx(...className, styles.article, {
      [styles.xl]: xl,
      [styles.l]: l,
    })}
    dangerouslySetInnerHTML={{ __html: children }}
  />
);

Article.propTypes = {
  children: PropTypes.string.isRequired,
  xl: PropTypes.bool,
  l: PropTypes.bool,
  className: PropTypes.string,
};

Article.defaultProps = {
  xl: false,
  l: false,
  className: '',
};

export default Article;

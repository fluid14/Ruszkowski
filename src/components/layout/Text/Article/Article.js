import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './Article.module.sass';

const Article = ({ children }) => (
  <article
    className={styles.article}
    dangerouslySetInnerHTML={{ __html: children }}
  />
);

Article.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Article;

import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './article.module.sass';

const Article = ({ context }) => {
  console.log(context);
  return <h1>artykul</h1>;
};

Article.propTypes = {
  context: PropTypes.shape.isRequired,
};

export default Article;

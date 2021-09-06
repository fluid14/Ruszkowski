import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './ArticleList.module.sass';
import ArticleTile from '../ArticleTile/ArticleTile';

const ArticleList = ({ children }) => (
  <>
    <ArticleTile />
  </>
);

ArticleList.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ArticleList;

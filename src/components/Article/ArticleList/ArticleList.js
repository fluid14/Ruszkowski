import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as styles from './ArticleList.module.sass';
import ArticleTile from '../ArticleTile/ArticleTile';
import Button from '../../layout/Button/Button';

const ArticleList = ({ articles, totalCount }) => {
  const [count, setCount] = useState(2);
  const addArticles = () => {
    setCount(count + 2);
  };

  return (
    <div className={styles.articleList}>
      {articles &&
        articles.map((article, i) => {
          if (i < count) {
            return (
              <ArticleTile
                key={article.id}
                className={styles.articleTile}
                article={article}
              />
            );
          }

          return false;
        })}
      {totalCount > count && (
        <div className={styles.buttonWrap}>
          <Button onClick={addArticles}>Więcej treści</Button>
        </div>
      )}
    </div>
  );
};

ArticleList.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      data: PropTypes.shape({
        article_title: PropTypes.shape({
          text: PropTypes.string.isRequired,
        }).isRequired,
        short_description: PropTypes.shape({
          html: PropTypes.string.isRequired,
        }).isRequired,
        article_miniature: PropTypes.shape.isRequired,
      }).isRequired,
      id: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ),
  totalCount: PropTypes.number.isRequired,
};

export default ArticleList;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as styles from './ArticleList.module.sass';
import ArticleTile from '../ArticleTile/ArticleTile';
import Button from '../../layout/Button/Button';

const ArticleList = ({ lang, articles, realizations, totalCount, titles }) => {
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
                lang={lang}
                className={styles.articleTile}
                article={article}
              />
            );
          }

          return false;
        })}

      {realizations &&
        realizations.map((realization, i) => {
          if (i < count) {
            return (
              <ArticleTile
                key={realization.id}
                lang={lang}
                className={styles.articleTile}
                article={realization}
                titles={titles}
                realization
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
  lang: PropTypes.string.isRequired,
  articles: PropTypes.arrayOf,
  realizations: PropTypes.arrayOf,
  totalCount: PropTypes.number.isRequired,
  titles: PropTypes.shape,
};

ArticleList.defaultProps = {
  articles: null,
  realizations: null,
  titles: null,
};

export default ArticleList;

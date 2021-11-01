import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';
import * as styles from './ArticleList.module.sass';
import ArticleTile from '../ArticleTile/ArticleTile';
import Button from '../../layout/Button/Button';
import { translate } from '../../../utils/translate';

const ArticleList = ({ lang, articles, realizations, totalCount }) => {
  const [count, setCount] = useState(2);
  const addArticles = () => {
    setCount(count + 2);
  };

  const settings = useStaticQuery(graphql`
    query ArticleListQuery {
      allPrismicSettings {
        nodes {
          lang
          data {
            translations_more_content {
              text
            }
            translation_more_realizations {
              text
            }
          }
        }
      }
    }
  `).allPrismicSettings.nodes;

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
                realization
              />
            );
          }
          return false;
        })}
      {totalCount > count && (
        <div className={styles.buttonWrap}>
          <Button onClick={addArticles}>
            {realizations
              ? translate(lang, settings).translation_more_realizations.text
              : translate(lang, settings).translations_more_content.text}
          </Button>
        </div>
      )}
    </div>
  );
};

ArticleList.propTypes = {
  lang: PropTypes.string.isRequired,
  articles: PropTypes.arrayOf(PropTypes.any),
  realizations: PropTypes.arrayOf(PropTypes.any),
  totalCount: PropTypes.number.isRequired,
};

ArticleList.defaultProps = {
  articles: null,
  realizations: null,
};

export default ArticleList;

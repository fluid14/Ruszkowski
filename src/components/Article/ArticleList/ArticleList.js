import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { graphql, StaticQuery } from 'gatsby';
import * as styles from './ArticleList.module.sass';
import ArticleTile from '../ArticleTile/ArticleTile';
import Button from '../../layout/Button/Button';

const ArticleListComponent = ({
  data: {
    allPrismicArticle: { nodes: articles, totalCount },
  },
}) => {
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
                data={article.data}
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

const ArticleList = (props) => (
  <StaticQuery
    query={graphql`
      query ArticleQuery {
        allPrismicArticle {
          nodes {
            data {
              tags {
                tag
              }
              short_description {
                html
              }
              article_miniature {
                fluid {
                  ...GatsbyImgixFluid
                }
              }
            }
            id
          }
          totalCount
        }
      }
    `}
    render={(data) => <ArticleListComponent data={data} {...props} />}
  />
);

ArticleListComponent.propTypes = {
  data: PropTypes.shape({
    allPrismicArticle: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          data: PropTypes.shape({
            tags: PropTypes.arrayOf(
              PropTypes.shape({
                tag: PropTypes.string.isRequired,
              })
            ).isRequired,
            short_description: PropTypes.shape({
              html: PropTypes.string.isRequired,
            }).isRequired,
            article_miniature: PropTypes.shape.isRequired,
          }).isRequired,
          id: PropTypes.string.isRequired,
        })
      ),
      totalCount: PropTypes.number.isRequired,
    }),
  }).isRequired,
};

export default ArticleList;

import React from 'react';
import PropTypes from 'prop-types';
import { graphql, StaticQuery } from 'gatsby';
import * as styles from './ArticleList.module.sass';
import ArticleTile from '../ArticleTile/ArticleTile';
import Button from '../../layout/Button/Button';

const ArticleListComponent = ({
  data: {
    allPrismicArticle: { nodes: articles },
  },
}) => (
  <div className={styles.articleList}>
    {articles &&
      articles.map((article) => (
        <ArticleTile
          key={article.id}
          className={styles.articleTile}
          data={article.data}
        />
      ))}
    <div className={styles.buttonWrap}>
      <Button>Więcej treści</Button>
    </div>
  </div>
);

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
    }),
  }).isRequired,
};

export default ArticleList;

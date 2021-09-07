import React from 'react';
import PropTypes from 'prop-types';
import { graphql, StaticQuery } from 'gatsby';
import * as styles from './ArticleList.module.sass';
import ArticleTile from '../ArticleTile/ArticleTile';

const ArticleListComponent = ({ data }) => {
  const { nodes: articles } = data.allPrismicArticle;
  return <>{articles && articles.map((data) => <ArticleTile data={data} />)}</>;
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
          }
        }
      }
    `}
    render={(data) => <ArticleListComponent data={data} {...props} />}
  />
);

ArticleList.propTypes = {
  data: PropTypes.shape({
    allPrismicArticle: PropTypes.shape({
      nodes: PropTypes.shape({
        data: PropTypes.shape({
          tags: PropTypes.arrayOf({
            tag: PropTypes.string.isRequired,
          }).isRequired,
          short_description: PropTypes.shape({
            html: PropTypes.string.isRequired,
          }).isRequired,
          article_miniature: PropTypes.string.isRequired,
        }).isRequired,
      }),
    }),
  }).isRequired,
};

export default ArticleList;

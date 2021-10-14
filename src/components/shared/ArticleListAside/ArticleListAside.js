import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import slugify from 'slugify';
import cx from 'classnames';
import * as styles from './ArticleListAside.module.sass';

const ArticleListAside = ({ className, articles }) => (
  <ul className={cx(className, styles.articleListWrap)}>
    {articles.map((item) => {
      const {
        node: {
          id,
          data: {
            article_miniature: { fluid: miniature, alt },
            article_title: { text: title },
          },
          first_publication_date: date,
          url,
        },
      } = item;

      return (
        <li className={styles.listItem} key={id}>
          <Link
            to={`${url}/${slugify(title, {
              lower: true,
            })}`}
            className={styles.listLink}
          >
            <div className={styles.itemImg}>
              <BackgroundImage
                Tag="section"
                className={styles.bgcImg}
                fluid={miniature}
                alt={alt}
              />
            </div>
            <div className={styles.itemDescription}>
              <p className={styles.title}>
                {title.charAt(0).toUpperCase() + title.slice(1).toLowerCase()}
              </p>
              <p className={styles.itemDate}>
                {new Date(date).toLocaleDateString()}
              </p>
            </div>
          </Link>
        </li>
      );
    })}
  </ul>
);

ArticleListAside.propTypes = {
  className: PropTypes.string,
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        node: PropTypes.shape({
          id: PropTypes.string.isRequired,
          data: PropTypes.shape({
            article_title: PropTypes.shape({
              text: PropTypes.string.isRequired,
            }).isRequired,
            article_miniature: PropTypes.shape({
              alt: PropTypes.string.isRequired,
              fluid: PropTypes.shape.isRequired,
            }).isRequired,
          }).isRequired,
          first_publication_date: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired,
        }),
      }),
    })
  ).isRequired,
};

ArticleListAside.defaultProps = {
  className: '',
};

export default ArticleListAside;

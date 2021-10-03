import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import cx from 'classnames';
import BackgroundImage from 'gatsby-background-image';
import slugify from 'slugify';
import * as styles from './ArticleTile.module.sass';
import Tags from '../../shared/Tags/Tags';
import Article from '../../layout/Text/Article/Article';

const ArticleTile = ({ article, className }) => {
  const {
    data: {
      article_title: { text: title },
      short_description: { html: description },
      article_miniature: miniature,
    },
    tags,
    url,
  } = article;

  return (
    <>
      <div className={cx(className, styles.articleTileWrap)}>
        <div className={styles.imgWrap}>
          <BackgroundImage
            Tag="section"
            className={styles.img}
            fluid={miniature.fluid}
          />
        </div>
        <div className={styles.descriptionWrap}>
          <Tags tags={tags} className={styles.tags} />
          <Article className={styles.text} l>
            {description}
          </Article>
          <div className={styles.tileFooter}>
            <Link
              to={`${url}/${slugify(title, {
                lower: true,
              })}`}
              className="link uppercase more"
            >
              Czytaj więcej
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

ArticleTile.propTypes = {
  article: PropTypes.shape({
    data: PropTypes.shape({
      article_title: PropTypes.shape({ text: PropTypes.string.isRequired })
        .isRequired,
      short_description: PropTypes.shape({
        html: PropTypes.string.isRequired,
      }).isRequired,
      article_miniature: PropTypes.shape.isRequired,
    }).isRequired,
  }).isRequired,
  className: PropTypes.string,
};

ArticleTile.defaultProps = {
  className: '',
};

export default ArticleTile;

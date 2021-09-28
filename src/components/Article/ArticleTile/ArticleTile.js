import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import cx from 'classnames';
import BackgroundImage from 'gatsby-background-image';
import slugify from 'slugify';
import * as styles from './ArticleTile.module.sass';
import Tags from '../../shared/Tags/Tags';
import Article from '../../layout/Text/Article/Article';

const ArticleTile = ({ data, className }) => {
  const {
    article_title: { text: title },
    short_description: { html: description },
    tags,
    article_miniature: miniature,
  } = data;

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
              to={`/artykul/${slugify(title, {
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
  data: PropTypes.shape({
    article_title: PropTypes.shape({ text: PropTypes.string.isRequired })
      .isRequired,
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
  className: PropTypes.string,
};

ArticleTile.defaultProps = {
  className: '',
};

export default ArticleTile;

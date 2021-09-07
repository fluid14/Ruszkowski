import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import * as styles from './ArticleTile.module.sass';
import Tags from '../../shared/Tags/Tags';
import img from '../../../../static/images/blog/blogMiniature.png';
import Article from '../../layout/Text/Article/Article';

const ArticleTile = ({ data: { data } }) => {
  const {
    short_description: { html: description },
    tags,
    miniature,
  } = data;
  console.log(description);

  return (
    <>
      <div className={styles.articleTileWrap}>
        <div className={styles.imgWrap}>
          <img className={styles.img} src={img} alt="Artykuł miniaturka" />
        </div>
        <div className={styles.descriptionWrap}>
          <Tags tags={tags} className={styles.tags} />
          <Article l>{description}</Article>
          <div className={styles.tileFooter}>
            <Link to="#" className="link more">
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
    tags: PropTypes.arrayOf({
      tag: PropTypes.string.isRequired,
    }).isRequired,
    short_description: PropTypes.shape({
      html: PropTypes.string.isRequired,
    }).isRequired,
    article_miniature: PropTypes.string.isRequired,
  }).isRequired,
};

export default ArticleTile;

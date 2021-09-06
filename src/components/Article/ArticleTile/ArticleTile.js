import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import * as styles from './ArticleTile.module.sass';
import Tags from '../../shared/Tags/Tags';
import img from '../../../../static/images/blog/blogMiniature.png';
import Article from '../../layout/Text/Article/Article';

const ArticleTile = () => (
  <>
    <div className={styles.articleTileWrap}>
      <div className={styles.imgWrap}>
        <img className={styles.img} src={img} alt="Artykuł miniaturka" />
      </div>
      <div className={styles.descriptionWrap}>
        <Tags className={styles.tags} />
        <Article l>
          Jak stworzyć przyjazne miejsce, w którym chce się spędzać czas? Czy
          drewno jest w stanie ocieplić przestrzeń i nadać jej charakteru?
        </Article>
        <div className={styles.tileFooter}>
          <Link to="#" className="link more">
            Czytaj więcej
          </Link>
        </div>
      </div>
    </div>
  </>
);

export default ArticleTile;

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import cx from 'classnames';
import BackgroundImage from 'gatsby-background-image';
import slugify from 'slugify';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import * as styles from './ArticleTile.module.sass';
import Tags from '../../shared/Tags/Tags';
import Article from '../../layout/Text/Article/Article';
import 'swiper/css/bundle';

const ArticleTile = ({ article, realization, className, titles }) => {
  console.log(article);

  return (
    (!realization && (
      <>
        <div className={cx(className, styles.articleTileWrap)}>
          <div className={styles.imgWrap}>
            <BackgroundImage
              Tag="section"
              className={styles.img}
              fluid={article.data.article_miniature.fluid}
            />
          </div>
          <div className={styles.descriptionWrap}>
            <Tags tags={article.tags} className={styles.tags} />
            <Article className={styles.text} l>
              {article.data.short_description.html}
            </Article>
            <div className={styles.tileFooter}>
              <Link
                to={`${article.url}/${slugify(article.data.article_title.text, {
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
    )) ||
    (realization && (
      <>
        <div
          className={cx(
            className,
            styles.articleTileWrap,
            styles.realizationWrap
          )}
        >
          <div className={cx(styles.imgWrap, 'swiperNav')}>
            <Swiper
              direction="horizontal"
              slidesPerView="auto"
              modules={[Navigation]}
              navigation
              loop
            >
              {article.data.gallery.map(({ photo: { alt, fluid } }) => (
                <SwiperSlide>
                  <BackgroundImage
                    Tag="section"
                    className={styles.img}
                    fluid={fluid}
                    alt={alt}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className={styles.descriptionWrap}>
            <div className={styles.realizationInfoWrap}>
              <p className={styles.title}>{titles.investor}</p>
              <p className={styles.value}>{article.data.investor.text}</p>
            </div>
            <div className={styles.realizationInfoWrap}>
              <p className={styles.title}>{titles.place}</p>
              <p className={styles.value}>{article.data.place.text}</p>
            </div>
            <div className={styles.descriptionInfoWrap}>
              <p className={styles.descriptionTitle}>{titles.scope}</p>
              <Article className={styles.text} l>
                {article.data.description.html}
              </Article>
            </div>
            <div className={styles.tileFooter} />
          </div>
        </div>
      </>
    ))
  );
};

ArticleTile.propTypes = {
  realization: PropTypes.bool,
  article: PropTypes.shape({
    data: PropTypes.shape({
      id: PropTypes.string.isRequired,
      article_title: PropTypes.shape({ text: PropTypes.string.isRequired })
        .isRequired,
      short_description: PropTypes.shape({
        html: PropTypes.string.isRequired,
      }).isRequired,
      article_miniature: PropTypes.shape.isRequired,
      description: PropTypes.shape({ html: PropTypes.string.isRequired }),
      gallery: PropTypes.arrayOf(
        PropTypes.shape({
          photo: PropTypes.shape({
            alt: PropTypes.string.isRequired,
            fluid: PropTypes.shape.isRequired,
          }),
        })
      ),
      investor: PropTypes.shape({
        text: PropTypes.string.isRequired,
      }).isRequired,
      place: PropTypes.shape({
        text: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    tags: PropTypes.array.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  className: PropTypes.string,
  titles: PropTypes.shape({
    investor: PropTypes.string,
    place: PropTypes.string,
    scope: PropTypes.string,
  }),
};

ArticleTile.defaultProps = {
  className: '',
  realization: false,
  titles: null,
};

export default ArticleTile;

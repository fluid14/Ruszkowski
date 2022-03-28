import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link, useStaticQuery } from 'gatsby';
import cx from 'classnames';
import BackgroundImage from 'gatsby-background-image';
import slugify from 'slugify';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import * as styles from './ArticleTile.module.sass';
import Tags from '../../shared/Tags/Tags';
import Article from '../../layout/Text/Article/Article';
import 'swiper/css/bundle';
import { translate } from '../../../utils/translate';

const ArticleTile = ({ lang, article, realization, className }) => {
  console.log(article);
  const settings = useStaticQuery(graphql`
    query ArticleTitleQuery {
      allPrismicSettings {
        nodes {
          lang
          data {
            translation_read_more {
              text
            }
            translation_investor {
              text
            }
            translation_place {
              text
            }
            translations_zakres {
              text
            }
          }
        }
      }
    }
  `).allPrismicSettings.nodes;

  return (
    (!realization && (
      <>
        <div
          className={cx(className, styles.articleTileWrap)}
          data-aos="fade-up"
        >
          <div className={styles.imgWrap}>
            <BackgroundImage
              Tag="section"
              className={styles.img}
              fluid={article.data.article_miniature.fluid}
            />
          </div>
          <div className={styles.descriptionWrap}>
            <Tags tags={article.tags} className={styles.tags} />
            <Article className={styles.text} l animate={false}>
              {article.data.short_description.html}
            </Article>
            <div className={styles.tileFooter}>
              <Link
                to={`${article.url}/${slugify(article.data.article_title.text, {
                  lower: true,
                })}`}
                className="link uppercase more"
              >
                {translate(lang, settings).translation_read_more.text}
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
          data-aos="fade-up"
        >
          <div className={cx(styles.imgWrap, 'swiperNav')}>
            <Swiper
              direction="horizontal"
              slidesPerView="auto"
              modules={[Navigation]}
              navigation
              loop
            >
              {article.data.gallery.map(({ photo: { alt, fluid } }, i) => (
                <SwiperSlide key={i}>
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
              <p className={styles.title}>
                {translate(lang, settings).translation_investor.text}
              </p>
              <p className={styles.value}>{article.data.investor.text}</p>
            </div>
            <div className={styles.realizationInfoWrap}>
              <p className={styles.title}>
                {translate(lang, settings).translation_place.text}
              </p>
              <p className={styles.value}>{article.data.place.text}</p>
            </div>
            <div className={styles.descriptionInfoWrap}>
              <p className={styles.descriptionTitle}>
                {translate(lang, settings).translations_zakres.text}
              </p>
              <Article className={styles.text} l animate={false}>
                {article.data.description.html}
              </Article>
            </div>
            <div className={styles.tileFooter}>
              {article.data.linked_article?.url &&
                article.data.linked_article.document.data.article_title && (
                  <Link
                    to={`${article.data.linked_article.url}/${slugify(
                      article.data.linked_article.document.data.article_title
                        .text,
                      {
                        lower: true,
                      }
                    )}`}
                    className="link uppercase more"
                  >
                    {translate(lang, settings).translation_read_more.text}
                  </Link>
                )}
            </div>
          </div>
        </div>
      </>
    ))
  );
};

ArticleTile.propTypes = {
  lang: PropTypes.string.isRequired,
  realization: PropTypes.bool,
  article: PropTypes.shape({
    data: PropTypes.shape({
      linked_article: PropTypes.shape({
        slug: PropTypes.string,
        url: PropTypes.string,
        document: PropTypes.shape({
          data: PropTypes.shape({
            article_title: PropTypes.shape({ text: PropTypes.string }),
          }),
        }),
      }),
      article_title: PropTypes.shape({ text: PropTypes.string.isRequired }),
      short_description: PropTypes.shape({
        html: PropTypes.string.isRequired,
      }),
      article_miniature: PropTypes.shape.isRequired,
      description: PropTypes.shape({ html: PropTypes.string.isRequired }),
      gallery: PropTypes.arrayOf(
        PropTypes.shape({
          photo: PropTypes.shape({
            alt: PropTypes.string,
            fluid: PropTypes.shape.isRequired,
          }),
        })
      ),
    }).isRequired,
    tags: PropTypes.array,
    url: PropTypes.string,
  }).isRequired,
  className: PropTypes.string,
};

ArticleTile.defaultProps = {
  className: '',
  realization: false,
  article: { data: { linked_article: { slug: '', url: '' } } },
};

export default ArticleTile;

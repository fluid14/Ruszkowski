import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import slugify from 'slugify';
import BackgroundImage from 'gatsby-background-image';
import { graphql, Link, useStaticQuery } from 'gatsby';
import Section from '../../shared/Section/Section';
import * as styles from './ProductsSlider.module.sass';
import SectionTitle from '../../layout/Text/SectionTitle/SectionTitle';
import 'swiper/css/bundle';
import { translate } from '../../../utils/translate';

const ProductsSlider = ({ lang, data, items }) => {
  const {
    title: { html: title },
  } = data;

  console.log(items);

  const settings = useStaticQuery(graphql`
    query ProductsSliderQuery {
      allPrismicSettings {
        nodes {
          lang
          data {
            prev {
              text
            }
            next {
              text
            }
          }
        }
      }
    }
  `).allPrismicSettings.nodes;

  return (
    <Section className={styles.productsSliderWrap}>
      <SectionTitle className={styles.sectionTitle} center>
        {title}
      </SectionTitle>
      <div className={cx(styles.sliderWrap, 'swiperNav', 'productsSwiper')}>
        <div className={styles.swiperNavigation}>
          <button type="button" className={cx(styles.prev, 'prev')}>
            {translate(lang, settings).prev.text}
          </button>
          <button type="button" className={cx(styles.next, 'next')}>
            {translate(lang, settings).next.text}
          </button>
        </div>
        <Swiper
          direction="horizontal"
          slidesPerView="auto"
          modules={[Navigation]}
          navigation={{
            prevEl: '.prev',
            nextEl: '.next',
          }}
          loop
        >
          {items.map(
            (
              {
                produkt: {
                  document: {
                    data: {
                      miniature: { fluid, alt },
                      miniature_title: { text: productTitle },
                      miniature_description: { text: description },
                      product_title: { text: productSlug },
                    },
                    url,
                  },
                },
              },
              i
            ) => (
              <SwiperSlide key={i}>
                <Link
                  to={`${url}/${slugify(productSlug, {
                    lower: true,
                  })}`}
                  key={i}
                  className={cx(styles.productTile, 'productTile')}
                >
                  <p className="productTitle">{productTitle}</p>
                  <p className="productDescription">{description}</p>
                  <BackgroundImage
                    Tag="div"
                    className="productMiniature"
                    fluid={fluid}
                    alt={alt}
                  />
                </Link>
              </SwiperSlide>
            )
          )}
        </Swiper>
      </div>
    </Section>
  );
};

ProductsSlider.propTypes = {
  lang: PropTypes.string.isRequired,
  data: PropTypes.shape({
    title: PropTypes.shape({
      html: PropTypes.string,
    }),
  }).isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      produkt: PropTypes.shape({
        document: PropTypes.shape({
          data: PropTypes.shape({
            miniature: PropTypes.shape({
              fluid: PropTypes.shape,
              alt: PropTypes.string,
            }),
            miniature_description: PropTypes.shape({
              text: PropTypes.string,
            }),
            miniature_title: PropTypes.shape({
              text: PropTypes.string,
            }),
            product_title: PropTypes.shape({
              text: PropTypes.string,
            }),
          }),
        }),
      }),
    })
  ).isRequired,
};

export default ProductsSlider;

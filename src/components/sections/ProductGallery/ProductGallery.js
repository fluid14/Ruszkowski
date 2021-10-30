import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BackgroundImage from 'gatsby-background-image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import * as styles from './ProductGallery.module.sass';
import 'swiper/css/bundle';

const ProductGallery = ({ items, className }) => {
  const [galleryImg, setGalleryImg] = useState(items[0].image);
  return (
    <div className={cx(className, styles.galleryWrap)}>
      <BackgroundImage
        Tag="div"
        className={styles.galleryImg}
        fluid={galleryImg.fluid}
        alt={galleryImg.alt}
      />
      <div className={cx(styles.sliderWrap, 'swiperNav', 'gallerySwiper')}>
        <div className={styles.sliderDesktop}>
          <Swiper
            direction="vertical"
            slidesPerView="auto"
            modules={[Navigation]}
            navigation
            loop
          >
            {items.map(({ image: { alt, fluid }, image }, i) => (
              <SwiperSlide key={i}>
                <BackgroundImage
                  Tag="div"
                  className={styles.sliderImg}
                  fluid={fluid}
                  alt={alt}
                  onClick={() => setGalleryImg(image)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className={styles.sliderMobile}>
          <Swiper
            direction="horizontal"
            slidesPerView="auto"
            modules={[Navigation]}
            navigation
            loop
          >
            {items.map(({ image: { alt, fluid }, image }, i) => (
              <SwiperSlide key={i}>
                <BackgroundImage
                  Tag="div"
                  className={styles.sliderImg}
                  fluid={fluid}
                  alt={alt}
                  onClick={() => setGalleryImg(image)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

ProductGallery.propTypes = {
  className: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.shape({
        alt: PropTypes.string,
        fluid: PropTypes.shape,
      }),
    })
  ).isRequired,
};

ProductGallery.defaultProps = {
  className: '',
};
export default ProductGallery;

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BackgroundImage from 'gatsby-background-image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import * as styles from './ProductGallery.module.sass';
import 'swiper/css/bundle';

const ProductGallery = ({ items, className }) => {
  console.log(items);
  return (
    <div className={cx(className, styles.galleryWrap)}>
      <div className={cx(styles.imgWrap, 'swiperNav', 'gallerySwiper')}>
        <Swiper
          direction="vertical"
          slidesPerView="auto"
          modules={[Navigation]}
          navigation
          loop
        >
          {items.map(({ image: { alt, fluid } }, i) => (
            <SwiperSlide key={i}>
              <BackgroundImage
                Tag="div"
                className={styles.img}
                fluid={fluid}
                alt={alt}
              />
            </SwiperSlide>
          ))}
        </Swiper>
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

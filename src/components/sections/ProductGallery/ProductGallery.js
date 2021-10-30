import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import * as styles from './ProductGallery.module.sass';

const ProductGallery = ({ className, items }) => {
  console.log(items);
  return (
    <div className={cx(className, styles.galleryWrap)}>
      <h1>gallery</h1>
    </div>
  );
};

ProductGallery.propTypes = {
  className: PropTypes.string,
  items: PropTypes.shape().isRequired,
};

ProductGallery.defaultProps = {
  className: '',
};
export default ProductGallery();

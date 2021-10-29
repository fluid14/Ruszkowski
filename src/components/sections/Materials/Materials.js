import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BackgroundImage from 'gatsby-background-image';
import cx from 'classnames';
import * as styles from './Materials.module.sass';
import Article from '../../layout/Text/Article/Article';

const Materials = ({ className, primary, items }) => {
  const [activeSample, setSample] = useState(0);
  const [sampleImg, setSampleImg] = useState(items[0].material_image);

  const {
    title: { html: title },
  } = primary;

  const changeSample = (i, img) => {
    setSample(i);
    setSampleImg(img);
  };

  return (
    <div className={cx(className, styles.materialsWrap)}>
      <Article className={styles.title}>{title}</Article>
      <div className={styles.materials}>
        <ul className={styles.materialList}>
          {/* eslint-disable-next-line camelcase */}
          {items.map(({ materia__name: material, material_image }, i) => (
            <li key={i} className={styles.listItem}>
              <button
                type="button"
                className={cx(styles.materialButton, {
                  [styles.active]: i === activeSample,
                })}
                onClick={() => changeSample(i, material_image)}
              >
                {material}
                <BackgroundImage
                  Tag="span"
                  className={styles.bgc}
                  alt={material_image.alt}
                  fluid={material_image.fluid}
                />
              </button>
            </li>
          ))}
        </ul>
        <BackgroundImage
          Tag="div"
          className={styles.materialSample}
          alt={sampleImg.alt}
          fluid={sampleImg.fluid}
        />
      </div>
    </div>
  );
};

Materials.propTypes = {
  className: PropTypes.string,
  primary: PropTypes.shape({
    title: PropTypes.shape({
      html: PropTypes.string,
    }),
  }).isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      materia__name: PropTypes.string,
      material_image: PropTypes.shape({
        alt: PropTypes.string,
        fluid: PropTypes.shape,
      }),
    })
  ).isRequired,
};

Materials.defaultProps = {
  className: '',
};

export default Materials;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BackgroundImage from 'gatsby-background-image';
import cx from 'classnames';
import * as styles from './Materials.module.sass';
import Article from '../../layout/Text/Article/Article';

const Materials = ({ className, primary, items }) => {
  console.log(items);
  const woods = items.filter((item) => item.material_type === 'drewno');
  const metals = items.filter((item) => item.material_type === 'metal');

  const [activeSampleWood, setSampleWood] = useState(0);
  const [activeSampleMetal, setSampleMetal] = useState(0);
  const [sampleImgWood, setSampleImgWood] = useState(
    woods.length > 0 ? woods[0].material_image : null
  );
  const [sampleImgMetal, setSampleImgMetal] = useState(
    metals.length > 0 ? metals[0].material_image : null
  );

  const {
    title: { html: title },
  } = primary;

  const changeSampleWood = (i, img) => {
    setSampleWood(i);
    setSampleImgWood(img);
  };

  const changeSampleMetal = (i, img) => {
    setSampleMetal(i);
    setSampleImgMetal(img);
  };

  return (
    <div className={cx(className, styles.materialsWrap)}>
      <Article className={styles.title}>{title}</Article>
      <div className={styles.materialsBoth}>
        {woods.length > 0 && (
          <div className={styles.materials}>
            <ul className={styles.materialList}>
              {/* eslint-disable-next-line camelcase */}
              {woods.map(({ material_name: material, material_image }, i) => (
                <li key={i} className={styles.listItem} data-aos="fade-in">
                  <button
                    type="button"
                    className={cx(styles.materialButton, {
                      [styles.active]: i === activeSampleWood,
                    })}
                    onClick={() => changeSampleWood(i, material_image)}
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
              alt={sampleImgWood?.alt}
              fluid={sampleImgWood?.fluid}
            />
          </div>
        )}
        {metals.length > 0 && (
          <div className={styles.materials}>
            <ul className={styles.materialList}>
              {/* eslint-disable-next-line camelcase */}
              {metals.map(({ material_name: material, material_image }, i) => (
                <li key={i} className={styles.listItem} data-aos="fade-in">
                  <button
                    type="button"
                    className={cx(styles.materialButton, {
                      [styles.active]: i === activeSampleMetal,
                    })}
                    onClick={() => changeSampleMetal(i, material_image)}
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
              alt={sampleImgMetal?.alt}
              fluid={sampleImgMetal?.fluid}
            />
          </div>
        )}
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

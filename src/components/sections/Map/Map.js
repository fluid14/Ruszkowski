import React from 'react';
import PropTypes from 'prop-types';
import GatsbyImage from 'gatsby-image';
import cx from 'classnames';
import * as styles from './Map.module.sass';
import Section from '../../shared/Section/Section';
import { translate } from '../../../utils/translate';

const Map = ({ className, data: { primary, items }, lang }) => (
  <Section className={cx(className, styles.mapWrap)} data-aos="fade-up">
    <div className={styles.map}>
      <GatsbyImage alt={primary.image.alt} fluid={primary.image.fluid} />
    </div>
    <div className={styles.infosWrap}>
      {items.map(
        (
          {
            info: { html: infoText },
            info_title: infoTitle,
            icon: { fluid, alt },
            type,
          },
          i
        ) => (
          <div key={i} className={styles.infoWrap}>
            <div className={styles.titleWrap}>
              <GatsbyImage className={styles.icon} fluid={fluid} alt={alt} />
              <p className={styles.infoTitle}>{infoTitle}</p>
            </div>
            {(() => {
              switch (type) {
                case 'Telefon':
                  return (
                    <a className={styles.info} href={`tel: ${infoText}`}>
                      <span dangerouslySetInnerHTML={{ __html: infoText }} />
                    </a>
                  );

                case 'Email':
                  return (
                    <a className={styles.info} href={`mailto: ${infoText}`}>
                      <span dangerouslySetInnerHTML={{ __html: infoText }} />
                    </a>
                  );

                default:
                  return (
                    <div
                      className={styles.info}
                      dangerouslySetInnerHTML={{ __html: infoText }}
                    />
                  );
              }
            })()}
          </div>
        )
      )}
      <h3 className={styles.sectionTitle}>{primary.title.text}</h3>
    </div>
  </Section>
);

Map.propTypes = {
  className: PropTypes.string,
  data: PropTypes.shape({
    primary: PropTypes.shape({
      lat: PropTypes.string,
      lng: PropTypes.string,
      title: PropTypes.shape({ text: PropTypes.string }),
    }).isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.shape({
          alt: PropTypes.string,
          fluid: PropTypes.shape,
        }),
        info: PropTypes.shape({
          html: PropTypes.string,
        }),
        info_title: PropTypes.string,
        type: PropTypes.string,
      })
    ).isRequired,
  }).isRequired,
};

Map.defaultProps = {
  className: '',
};
export default Map;

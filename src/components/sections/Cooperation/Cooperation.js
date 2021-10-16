import React from 'react';
import PropTypes from 'prop-types';
import GatsbyImage from 'gatsby-image';
import cx from 'classnames';
import Section from '../../shared/Section/Section';
import * as styles from './Cooperation.module.sass';
import Article from '../../layout/Text/Article/Article';

const Cooperation = ({ className, data: { primary, items } }) => {
  const {
    cooperation_title: { html: cooperationTitle },
    cooperation_description: { html: description },
    cooperation_photo: { fluid: photo, alt },
    our_speciality: { html: specialityTitle },
  } = primary;

  return (
    <Section className={cx(className, styles.cooperationWrap)}>
      <div className={styles.descriptionWrap}>
        <div
          className={styles.title}
          dangerouslySetInnerHTML={{ __html: cooperationTitle }}
        />
        <Article className={styles.description}>{description}</Article>
      </div>
      <div className={styles.specialityWrap}>
        <div
          className={styles.title}
          dangerouslySetInnerHTML={{ __html: specialityTitle }}
        />
        {items.length > 0 && (
          <ul className={styles.list}>
            {items.map(
              ({
                our_speciality_icon: { fluid, alt: itemAlt },
                out_speciality_description: { text },
                id,
              }) => (
                <li key={id} className={styles.listItem}>
                  <GatsbyImage
                    className={styles.icon}
                    fluid={fluid}
                    alt={itemAlt}
                  />
                  <p className={styles.itemTitle}>{text}</p>
                </li>
              )
            )}
          </ul>
        )}
      </div>
      <div className={styles.photoWrap}>
        <GatsbyImage className={styles.photo} fluid={photo} alt={alt} />
      </div>
    </Section>
  );
};

Cooperation.propTypes = {
  className: PropTypes.string,
  data: PropTypes.shape({
    slice_type: PropTypes.string.isRequired,
    primary: PropTypes.shape({
      cooperation_description: PropTypes.shape({
        html: PropTypes.string.isRequired,
      }).isRequired,
      cooperation_photo: PropTypes.shape({
        alt: PropTypes.string.isRequired,
        fluid: PropTypes.shape.isRequired,
      }).isRequired,
      cooperation_title: PropTypes.shape({
        html: PropTypes.string.isRequired,
      }).isRequired,
      our_speciality: PropTypes.shape({
        html: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        our_speciality_icon: PropTypes.shape({
          alt: PropTypes.string.isRequired,
          fluid: PropTypes.shape.isRequired,
        }).isRequired,
        out_speciality_description: PropTypes.shape({
          text: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired
    ),
  }).isRequired,
};

Cooperation.defaultProps = {
  className: '',
};

export default Cooperation;

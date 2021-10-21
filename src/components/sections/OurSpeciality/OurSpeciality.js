import React from 'react';
import PropTypes from 'prop-types';
import GatsbyImage from 'gatsby-image';
import * as styles from './OurSpeciality.module.sass';
import SectionTitle from '../../layout/Text/SectionTitle/SectionTitle';
import Section from '../../shared/Section/Section';
import Article from '../../layout/Text/Article/Article';

const OurSpeciality = ({ className, data: { primary, items } }) => {
  const {
    title: { html: title },
  } = primary;

  return (
    <Section className={className}>
      <SectionTitle className={styles.sectionTitle} center>
        {title}
      </SectionTitle>
      <div className={styles.specialityWrap}>
        {items.map(
          (
            {
              title: { text: itemTitle },
              description: { html: description },
              icon: { fluid, alt },
            },
            i
          ) => (
            <div key={i} className={styles.specialityItem}>
              <GatsbyImage className={styles.icon} fluid={fluid} alt={alt} />
              <h2 className={styles.title}>{itemTitle}</h2>
              <Article className={styles.article}>{description}</Article>
            </div>
          )
        )}
      </div>
    </Section>
  );
};

OurSpeciality.propTypes = {
  className: PropTypes.string,
  data: PropTypes.shape({
    primary: PropTypes.shape({
      title: PropTypes.shape({ text: PropTypes.string }),
    }),
    items: PropTypes.shape,
  }).isRequired,
};

OurSpeciality.defaultProps = {
  className: '',
};

export default OurSpeciality;

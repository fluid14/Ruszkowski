import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import GatsbyImage from 'gatsby-image';
import * as styles from './DesignWithUs.module.sass';
import Section from '../../shared/Section/Section';
import SectionTitle from '../../layout/Text/SectionTitle/SectionTitle';
import Article from '../../layout/Text/Article/Article';
import Button from '../../layout/Button/Button';

const DesignWithUs = ({ className, data }) => {
  const {
    section_title: { html: sectionTitle },
    image: { fluid, alt },
    descripion_title: { html: descriptionTitle },
    description: { html: description },
    link: { url: link },
    link_title: linkTitle,
    shadow_title: { text: shadowTitle },
  } = data;
  return (
    <Section className={cx(className, styles.designWithUsWrap)}>
      <SectionTitle
        className={styles.sectionTitle}
        shadowTextClass={styles.sectionShadowTitle}
        shadowText={shadowTitle}
        center
      >
        {sectionTitle}
      </SectionTitle>
      <div className={styles.contentWrap}>
        <GatsbyImage className={styles.img} fluid={fluid} alt={alt} />
        <div className={styles.descriptionWrap}>
          <Article className={styles.descriptionTitle}>
            {descriptionTitle}
          </Article>
          <Article className={styles.description}>{description}</Article>
          <Link to={link}>
            <Button onClick={() => {}} send>
              {linkTitle}
            </Button>
          </Link>
        </div>
      </div>
    </Section>
  );
};

DesignWithUs.propTypes = {
  className: PropTypes.string,
  data: PropTypes.shape({
    shadow_title: PropTypes.shape({
      text: PropTypes.string,
    }),
    link_title: PropTypes.string,
    descripion_title: PropTypes.shape({
      html: PropTypes.string,
    }),
    description: PropTypes.shape({
      html: PropTypes.string,
    }),
    section_title: PropTypes.shape({
      html: PropTypes.string,
    }),
    image: PropTypes.shape({
      alt: PropTypes.string,
      fluid: PropTypes.shape,
    }),
    link: PropTypes.shape({
      url: PropTypes.string,
    }),
  }).isRequired,
};

DesignWithUs.defaultProps = {
  className: '',
};

export default DesignWithUs;

import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './SectionTitle.module.sass';

const SectionTitle = ({ children }) => (
  <div
    className={styles.sectionTitle}
    dangerouslySetInnerHTML={{ __html: children }}
  />
);

SectionTitle.propTypes = {
  children: PropTypes.string.isRequired,
};

export default SectionTitle;

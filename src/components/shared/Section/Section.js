import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import * as styles from './Section.module.sass';

const Section = ({ children, className }) => (
  <section className={cx(className, styles.section)}>{children}</section>
);

Section.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Section.defaultProps = {
  className: '',
};

export default Section;

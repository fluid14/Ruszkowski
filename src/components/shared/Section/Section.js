import React from 'react';
import PropTypes from 'prop-types';

const Section = ({ children, className }) => (
  <section className={className}>{children}</section>
);

Section.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Section.defaultProps = {
  className: '',
};

export default Section;

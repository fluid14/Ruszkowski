import React from 'react';
import PropTypes from 'prop-types';
import Navbar from '../components/layout/Navbar/Navbar';

const Theme = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

Theme.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Theme;

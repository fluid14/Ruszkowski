import React from 'react';
import PropTypes from 'prop-types';
import Navbar from '../components/layout/Navbar/Navbar';
import PageOrnament from '../components/layout/PageOrnament/PageOrnament';

const Theme = ({ children }) => (
  <>
    <Navbar />
    <PageOrnament />
    <main>{children}</main>
  </>
);

Theme.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Theme;

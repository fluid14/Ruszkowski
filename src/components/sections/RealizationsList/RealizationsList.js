import React from 'react';
import PropTypes from 'prop-types';

const RealizationsList = ({ data }) => {
  console.log(data);
  return <h1>Realizations list</h1>;
};

RealizationsList.propTypes = {
  data: PropTypes.arrayOf({
    realizations_list_title: PropTypes.shape({
      html: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default RealizationsList;

import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Theme from '../../theme/Theme';

const Index = ({ data }) => {
  const {
    lang,
    data: {
      text: { text },
    },
  } = data.prismicMainPage;
  return (
    <Theme lang={lang}>
      <h1>{text}</h1>);
    </Theme>
  );
};

export const query = graphql`
  query MainPageQuery($id: String, $lang: String) {
    prismicMainPage(id: { eq: $id }, lang: { eq: $lang }) {
      lang
      data {
        text {
          text
        }
      }
    }
  }
`;

Index.propTypes = {
  data: PropTypes.shape({
    prismicMainPage: PropTypes.shape({
      lang: PropTypes.string.isRequired,
      data: PropTypes.shape({
        text: PropTypes.shape({
          text: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default Index;

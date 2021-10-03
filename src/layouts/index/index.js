import React from 'react';
import { graphql } from 'gatsby';
import Theme from '../../theme/Theme';

const Index = ({ data }) => {
  const { text } = data.prismicMainPage.data.text;
  return (
    <Theme>
      <h1>{text}</h1>);
    </Theme>
  );
};

export const query = graphql`
  query MainPageQuery($id: String, $lang: String) {
    prismicMainPage(id: { eq: $id }, lang: { eq: $lang }) {
      data {
        text {
          text
        }
      }
    }
  }
`;

export default Index;

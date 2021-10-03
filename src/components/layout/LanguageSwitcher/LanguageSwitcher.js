import * as React from 'react';
import { graphql, navigate, StaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import { linkResolver } from '../../../utils/linkResolver';

const LanguageSwitcherComponent = ({
  data: {
    allPrismicPage: { nodes },
    prismicPage: { lang },
  },
}) => {
  const handleLangChange = (event) => {
    console.log(event);
    navigate(event.target.value);
  };

  return (
    <select value={lang} onChange={handleLangChange}>
      <option value={lang}>{lang.slice(0, 2).toUpperCase()}</option>
      {nodes.map((altLang, index) => (
        <option value={altLang.url} key={`alt-lang-${index}`}>
          {altLang.lang}
        </option>
      ))}
    </select>
  );
};

const LanguageSwitcher = () => (
  <StaticQuery
    query={graphql`
      query LanguageSwitcherQuery {
        allPrismicPage {
          nodes {
            lang
            url
          }
        }
        prismicPage {
          lang
        }
      }
    `}
    render={(data) => <LanguageSwitcherComponent data={data} />}
  />
);

LanguageSwitcherComponent.propTypes = {
  data: PropTypes.shape({
    prismicPage: PropTypes.shape({ lang: PropTypes.string.isRequired })
      .isRequired,
    allPrismicPage: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          lang: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired,
        }).isRequired
      ).isRequired,
    }).isRequired,
  }).isRequired,
};

export default LanguageSwitcher;

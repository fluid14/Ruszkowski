import * as React from 'react';
import { graphql, navigate, StaticQuery } from 'gatsby';
import PropTypes from 'prop-types';

const LanguageSwitcherComponent = ({
  lang,
  data: {
    allPrismicPage: { nodes },
  },
}) => {
  const handleLangChange = (event) => {
    navigate(event.target.value);
  };

  const mapLang = (language) =>
    language.length > 2
      ? language.slice(0, -3).toUpperCase()
      : language.toUpperCase();

  return (
    <select value={lang} onChange={handleLangChange}>
      <option value={lang}>{mapLang(lang)}</option>
      {nodes.map(
        (altLang, index) =>
          altLang.lang !== lang && (
            <option value={altLang.url} key={`alt-lang-${index}`}>
              {mapLang(altLang.lang)}
            </option>
          )
      )}
    </select>
  );
};

const LanguageSwitcher = (props) => (
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
    render={(data) => <LanguageSwitcherComponent data={data} {...props} />}
  />
);

LanguageSwitcherComponent.propTypes = {
  lang: PropTypes.string.isRequired,
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

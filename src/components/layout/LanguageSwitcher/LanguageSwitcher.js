import * as React from 'react';
import { graphql, navigate, StaticQuery } from 'gatsby';
import { linkResolver } from '../../../utils/linkResolver';

const LanguageSwitcherComponent = ({ data }) => {
  const { lang, alternate_languages: altLang } = data.prismicPage;
  const currentLangOption = (
    <option value={lang}>{lang.slice(0, 2).toUpperCase()}</option>
  );

  const alternateLangOptions = altLang.map((altLang, index) => (
    <option value={linkResolver(altLang)} key={`alt-lang-${index}`}>
      {altLang.lang.slice(0, 2).toUpperCase()}
    </option>
  ));

  const handleLangChange = (event) => {
    navigate(event.target.value);
  };

  return (
    <li className="language-switcher">
      <select value={lang} onChange={handleLangChange}>
        {currentLangOption}
        {alternateLangOptions}
      </select>
    </li>
  );
};

const LanguageSwitcher = (props) => (
  <StaticQuery
    query={graphql`
      query pageQuery($id: String, $lang: String) {
        prismicPage(id: { eq: $id }, lang: { eq: $lang }) {
          lang
          alternate_languages {
            id
            type
            lang
            uid
          }
        }
      }
    `}
    render={(data) => <LanguageSwitcherComponent data={data} {...props} />}
  />
);

export default LanguageSwitcher;

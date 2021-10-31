import * as React from 'react';
import { graphql, Link, StaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import cx from 'classnames';
import * as styles from './LanguageSwitcher.module.sass';

const LanguageSwitcherComponent = ({
  className,
  lang,
  data: {
    allPrismicSettings: { nodes },
  },
}) => {
  const mapLang = (language) =>
    language.length > 2
      ? language.slice(0, -3).toUpperCase()
      : language.toUpperCase();

  const formatLang = (language) =>
    mapLang(language) === 'PL' ? '/' : `/${mapLang(language).toLowerCase()}`;

  return (
    <ul className={cx(className, styles.languageSwitcherWrap)}>
      <li className={cx(styles.item, styles.active)}>
        <Link to={formatLang(lang)}>{mapLang(lang)}</Link>
      </li>
      {nodes.map(
        (altLang, index) =>
          altLang.lang !== lang && (
            <li key={`alt-lang-${index}`} className={styles.item}>
              <Link to={formatLang(altLang.lang)}>{mapLang(altLang.lang)}</Link>
            </li>
          )
      )}
    </ul>
  );
};

const LanguageSwitcher = (props) => (
  <StaticQuery
    query={graphql`
      query LanguageSwitcherQuery {
        allPrismicSettings {
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
  className: PropTypes.string,
  lang: PropTypes.string.isRequired,
  data: PropTypes.shape({
    prismicPage: PropTypes.shape({ lang: PropTypes.string.isRequired }),
    allPrismicSettings: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          lang: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired,
        }).isRequired
      ).isRequired,
    }).isRequired,
  }).isRequired,
};

LanguageSwitcherComponent.defaultProps = {
  className: '',
};

export default LanguageSwitcher;

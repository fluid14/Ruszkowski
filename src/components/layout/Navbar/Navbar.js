import React, { useEffect, useRef, useState } from 'react';
import { graphql, Link, StaticQuery } from 'gatsby';
import cx from 'classnames';
import PropTypes from 'prop-types';
import GatsbyImage from 'gatsby-image';
import * as styles from './Navbar.module.sass';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import { translate } from '../../../utils/translate';

const NavbarComponent = ({
  lang,
  data: {
    allPrismicSettings: { nodes: settings },
    allPrismicNavigation: { nodes },
  },
}) => {
  const navigation = nodes.filter((node) => node.lang === lang)[0]?.data
    ?.navigation_link;

  const [isMenuActive, changeMenuState] = useState(false);
  const prevScrollY = useRef(0);
  const [goingUp, setGoingUp] = useState(true);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (
        prevScrollY.current < currentScrollY &&
        currentScrollY > 150 &&
        goingUp
      ) {
        setGoingUp(false);
      } else if (prevScrollY.current > currentScrollY && !goingUp) {
        setGoingUp(true);
      }

      if (currentScrollY > 170) {
        setActive(true);
      } else if (currentScrollY < 170) {
        setActive(false);
      }

      prevScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [goingUp]);

  const handleBurgerClick = () => {
    changeMenuState(!isMenuActive);
  };

  return (
    <nav
      className={cx(styles.navbar, {
        [styles.hide]: !goingUp,
        [styles.active]: active,
      })}
    >
      <div className={styles.logoWrap}>
        <Link to="/" title="Strona główna">
          <GatsbyImage
            className={styles.logo}
            alt={translate(lang, settings).logo.alt}
            fluid={translate(lang, settings).logo.fluid}
          />
        </Link>
      </div>
      <div className={styles.main}>
        <a
          className={styles.phone}
          href={`tel: ${translate(lang, settings).phone_number}`}
        >
          {translate(lang, settings).phone_number}
        </a>

        <button
          type="button"
          className={cx(styles.burger, { [styles.active]: isMenuActive })}
          onClick={(e) => handleBurgerClick(e)}
        >
          <span className={styles.burgerBar} />
          <span className={styles.burgerBar} />
          <span className={styles.burgerBar} />
        </button>
        <ul className={cx(styles.mainMenu, { [styles.active]: isMenuActive })}>
          {navigation &&
            navigation.map((nav, i) => (
              <li className={styles.menuItem} key={i}>
                <Link to={nav.link.url} activeClassName="active">
                  {nav.link_title.text}
                </Link>
              </li>
            ))}
          <li className={cx(styles.menuItem, styles.menuPhone)}>
            <a className={styles.phone} href="tel: +48 692 615 555">
              translate
            </a>
          </li>
          <li className={cx(styles.menuItem)}>
            <LanguageSwitcher lang={lang} />
          </li>
        </ul>
      </div>
    </nav>
  );
};

const Navbar = (props) => (
  <StaticQuery
    query={graphql`
      query NavigationQuery {
        allPrismicSettings {
          nodes {
            lang
            data {
              phone_number
              logo {
                alt
                fluid {
                  ...GatsbyImgixFluid
                }
              }
            }
          }
        }
        allPrismicNavigation {
          nodes {
            lang
            data {
              navigation_link {
                link {
                  url
                  lang
                }
                link_title {
                  text
                }
              }
            }
          }
        }
      }
    `}
    render={(data) => <NavbarComponent data={data} {...props} />}
  />
);

NavbarComponent.propTypes = {
  lang: PropTypes.string.isRequired,
  data: PropTypes.shape({
    allPrismicSettings: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          lang: PropTypes.string,
          data: PropTypes.shape({
            logo: PropTypes.shape,
            alt: PropTypes.string,
            phone_number: PropTypes.string,
          }),
        })
      ),
    }),
    allPrismicNavigation: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          data: PropTypes.shape({
            navigation_link: PropTypes.arrayOf(
              PropTypes.shape({
                link: PropTypes.shape({
                  url: PropTypes.string.isRequired,
                }).isRequired,
                link_title: PropTypes.shape({
                  text: PropTypes.string.isRequired,
                }).isRequired,
              }).isRequired
            ).isRequired,
          }).isRequired,
        })
      ).isRequired,
    }).isRequired,
  }).isRequired,
};

export default Navbar;

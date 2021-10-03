import React, { useEffect, useRef, useState } from 'react';
import { graphql, Link, StaticQuery } from 'gatsby';
import cx from 'classnames';
import PropTypes from 'prop-types';
import * as styles from './Navbar.module.sass';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';

const NavbarComponent = ({
  data: {
    prismicNavigation: {
      data: { navigation_link: navigation },
    },
  },
}) => {
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
          <img
            className={styles.logo}
            src="./images/logo_ruszkowski.png"
            alt="Ruszkowski.biz"
          />
        </Link>
      </div>
      <div className={styles.main}>
        <a className={styles.phone} href="tel: +48 692 615 555">
          +48 692 615 555
        </a>
        <LanguageSwitcher />

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
            navigation.map((nav) => (
              <li className={styles.menuItem} key={nav.link.slug}>
                <Link to={nav.link.url}>{nav.link_title.text}</Link>
              </li>
            ))}
          <li className={cx(styles.menuItem, styles.menuPhone)}>
            <a className={styles.phone} href="tel: +48 692 615 555">
              +48 692 615 555
            </a>
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
        prismicNavigation {
          data {
            navigation_link {
              link {
                url
                slug
                type
              }
              link_title {
                text
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
  data: PropTypes.shape({
    prismicNavigation: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          navigation_link: PropTypes.shape({
            link: PropTypes.shape({
              url: PropTypes.string.isRequired,
              slug: PropTypes.string.isRequired,
              type: PropTypes.string.isRequired,
            }).isRequired,
            link_title: PropTypes.shape({
              text: PropTypes.string.isRequired,
            }).isRequired,
          }).isRequired,
        })
      ).isRequired,
    }).isRequired,
  }).isRequired,
};

export default Navbar;

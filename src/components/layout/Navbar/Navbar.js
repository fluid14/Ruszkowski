import React, { useState } from 'react';
import { Link } from 'gatsby';
import cx from 'classnames';
import * as styles from './Navbar.module.sass';

const Navbar = () => {
  const [isMenuActive, changeMenuState] = useState(false);

  const handleBurgerClick = () => {
    changeMenuState(!isMenuActive);
  };

  return (
    <nav className={styles.navbar}>
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
          <li className={styles.menuItem}>
            <Link to="/blog">Home</Link>
          </li>
          <li className={styles.menuItem}>
            <Link to="/blog">O nas</Link>
          </li>
          <li className={styles.menuItem}>
            <Link to="/blog">Produkty</Link>
          </li>
          <li className={styles.menuItem}>
            <Link to="/blog">Współpraca</Link>
          </li>
          <li className={styles.menuItem}>
            <Link to="/blog">Blog</Link>
          </li>
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

export default Navbar;

import React, { useState } from 'react';
import { Link } from 'gatsby';
import cx from 'classnames';
import * as styles from './Navbar.module.sass';

const Navbar = () => {
  const [isBurgerActive, changeBurgerState] = useState(false);

  const handleBurgerClick = (e) => {
    e.preventDefault;
    changeBurgerState(!isBurgerActive);
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
        <a
          href="#"
          className={cx(styles.burger, { styles.active: isBurgerActive })}
          onClick={(e) => handleBurgerClick(e)}
        >
          <span className={styles.burgerBar} />
          <span className={styles.burgerBar} />
          <span className={styles.burgerBar} />
        </a>
        <ul className={styles.mainMenu}>
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
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

import React from 'react';
import * as styles from './Navbar.module.sass';

const Navbar = () => (
  <nav className={styles.navbar}>
    <img
      className={styles.logo}
      src="./images/logo_ruszkowski.png"
      alt="Ruszkowski.biz"
    />
    <main className={styles.main}>
      <a className={styles.phone} href="tel: +48 692 615 555">
        +48 692 615 555
      </a>
      <ul className={styles.mainMenu}>
        <li>Home</li>
        <li>O nas</li>
        <li>Produkty</li>
        <li>Współpraca</li>
        <li>Blog</li>
      </ul>
    </main>
  </nav>
);

export default Navbar;

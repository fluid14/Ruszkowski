import React from 'react';
import cx from 'classnames';
import * as styles from './PageOrnament.module.sass';

const PageOrnament = () => (
  <div className={cx(styles.pageOrnament, 'wrap')}>
    <span />
    <span />
    <span />
    <span />
  </div>
);

export default PageOrnament;

import React from 'react';
import cx from 'classnames';
import * as styles from './PageOrnament.module.sass';

const PageOrnament = ({ zindex }) => (
  <div className={cx(styles.pageOrnament, 'wrap')} style={{ zIndex: zindex }}>
    <span />
    <span />
    <span />
    <span />
  </div>
);

export default PageOrnament;

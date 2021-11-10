import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import * as styles from './PageOrnament.module.sass';

const PageOrnament = ({ zindex }) => (
  <div className={cx(styles.pageOrnament, 'wrap')} style={{ zIndex: zindex }}>
    <span />
    <span />
    <span />
    <span />
  </div>
);

PageOrnament.propTypes = {
  zindex: PropTypes.number,
};

PageOrnament.defaultProps = {
  zindex: -1,
};

export default PageOrnament;

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import cx from 'classnames';
import * as styles from './Tags.module.sass';

const Tags = ({ tags, className }) => (
  <>
    <ul className={cx(className, styles.tagList)}>
      <li className={styles.tagItem}>
        <Link to="#" className={styles.tag}>
          Marketing
        </Link>
      </li>
      <li className={styles.tagItem}>
        <Link to="#" className={styles.tag}>
          technology
        </Link>
      </li>
      <li className={styles.tagItem}>
        <Link to="#" className={styles.tag}>
          design
        </Link>
      </li>
      <li className={styles.tagItem}>
        <Link to="#" className={styles.tag}>
          technology
        </Link>
      </li>
      <li className={styles.tagItem}>
        <Link to="#" className={styles.tag}>
          design
        </Link>
      </li>
    </ul>
  </>
);

Tags.propTypes = {
  tags: PropTypes.node,
  className: PropTypes.string,
};

Tags.defaultProps = {
  tags: {},
  className: '',
};

export default Tags;

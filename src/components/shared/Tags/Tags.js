import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import cx from 'classnames';
import * as styles from './Tags.module.sass';

const Tags = ({ tags, className }) => (
  <>
    <ul className={cx(className, styles.tagList)}>
      {tags.map(({ tag }) => (
        <li className={styles.tagItem}>
          <Link to="#" className={styles.tag}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  </>
);

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.shape({ tag: PropTypes.string.isRequired }))
    .isRequired,
  className: PropTypes.string,
};

Tags.defaultProps = {
  tags: {},
  className: '',
};

export default Tags;

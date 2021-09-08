import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import * as styles from './Tags.module.sass';

const Tags = ({ tags, className }) => (
  <>
    <ul className={cx(className, styles.tagList)}>
      {tags.map(({ tag }, i) => (
        <li key={i} className={styles.tagItem}>
          <div className={styles.tag}>{tag}</div>
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
  className: '',
};

export default Tags;

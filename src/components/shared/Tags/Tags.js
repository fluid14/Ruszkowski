import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import * as styles from './Tags.module.sass';

const Tags = ({ tags, className, dark }) => (
  <>
    <ul className={cx(className, styles.tagList)}>
      {tags &&
        tags.map((tag, i) => (
          <li key={i} className={cx(styles.tagItem, { [styles.dark]: dark })}>
            <div className={styles.tag}>{tag}</div>
          </li>
        ))}
    </ul>
  </>
);

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  className: PropTypes.string,
  dark: PropTypes.bool,
};

Tags.defaultProps = {
  className: '',
  dark: false,
};

export default Tags;

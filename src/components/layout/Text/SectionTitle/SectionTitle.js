import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import * as styles from './SectionTitle.module.sass';

const SectionTitle = ({ children, shadowText, center, left, right }) => (
  <div className={styles.sectionTitleWrap}>
    <div
      className={cx(
        styles.sectionTitle,
        { [styles.center]: center },
        { [styles.left]: left },
        { [styles.right]: right }
      )}
      dangerouslySetInnerHTML={{ __html: children }}
    />
    {shadowText && <p className={styles.shadowText}>{shadowText}</p>}
  </div>
);

SectionTitle.propTypes = {
  children: PropTypes.string.isRequired,
  shadowText: PropTypes.string,
  center: PropTypes.bool,
  left: PropTypes.bool,
  right: PropTypes.bool,
};

SectionTitle.defaultProps = {
  shadowText: '',
  center: false,
  left: false,
  right: false,
};

export default SectionTitle;

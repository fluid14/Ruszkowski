import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import * as styles from './SectionTitle.module.sass';

const SectionTitle = ({
  children,
  shadowText,
  center,
  left,
  right,
  transformNone,
  className,
  shadowTextClass,
}) => (
  <div className={cx(className, styles.sectionTitleWrap)}>
    <div
      className={cx(
        styles.sectionTitle,
        { [styles.center]: center },
        { [styles.left]: left },
        { [styles.right]: right },
        { [styles.transformNone]: transformNone }
      )}
      dangerouslySetInnerHTML={{ __html: children }}
    />
    {shadowText && (
      <p className={cx(shadowTextClass, styles.shadowText)}>{shadowText}</p>
    )}
  </div>
);

SectionTitle.propTypes = {
  className: PropTypes.string,
  shadowTextClass: PropTypes.string,
  children: PropTypes.string.isRequired,
  shadowText: PropTypes.string,
  center: PropTypes.bool,
  left: PropTypes.bool,
  right: PropTypes.bool,
  transformNone: PropTypes.bool,
};

SectionTitle.defaultProps = {
  className: '',
  shadowTextClass: '',
  shadowText: '',
  center: false,
  left: false,
  right: false,
  transformNone: false,
};

export default SectionTitle;

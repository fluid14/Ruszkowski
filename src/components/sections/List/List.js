import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Section from '../../shared/Section/Section';
import * as styles from './List.module.sass';
import Article from '../../layout/Text/Article/Article';

const List = ({ className, title: { html: title }, items }) => (
  <Section className={cx(className, styles.listWrap)}>
    <div
      className={styles.listTitle}
      dangerouslySetInnerHTML={{ __html: title }}
    />
    <ul>
      {items.map(({ item }, i) => (
        <li key={i} className={styles.listItem}>
          <Article className={styles.itemText}>{item}</Article>
        </li>
      ))}
    </ul>
  </Section>
);

List.propTypes = {
  className: PropTypes.string,
  title: PropTypes.shape({ html: PropTypes.string }).isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({ item: PropTypes.string }))
    .isRequired,
};

List.defaultProps = {
  className: '',
};
export default List;

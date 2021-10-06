import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import * as styles from './Article.module.sass';

const Article = ({ children, xl, l, className, object }) => (
  <>
    {!object && (
      <article
        className={cx(className, styles.article, {
          [styles.xl]: xl,
          [styles.l]: l,
        })}
        dangerouslySetInnerHTML={{ __html: children }}
      />
    )}
    {object && (
      <article
        className={cx(className, styles.article, {
          [styles.xl]: xl,
          [styles.l]: l,
        })}
      >
        {children.map(({ slice_type: type, items }) => {
          console.log(items);
          return <p>{items}</p>;
        })}
      </article>
    )}
  </>
);

Article.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(
      PropTypes.shape({
        slice_type: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(
          PropTypes.shape({
            photo: PropTypes.shape({
              alt: PropTypes.string.isRequired,
              fluid: PropTypes.shape.isRequired,
            }).isRequired,
            paragraph: PropTypes.shape({
              html: PropTypes.string.isRequired,
            }).isRequired,
          }).isRequired
        ).isRequired,
      }).isRequired
    ),
  ]).isRequired,
  xl: PropTypes.bool,
  l: PropTypes.bool,
  className: PropTypes.string,
  object: PropTypes.bool,
};

Article.defaultProps = {
  xl: false,
  l: false,
  className: '',
  object: false,
};

export default Article;

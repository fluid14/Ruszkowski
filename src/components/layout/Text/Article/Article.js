import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import GatsbyImage from 'gatsby-image';
import * as styles from './Article.module.sass';

const Article = ({ children, xl, l, className, object, animate }) => (
  <>
    {!object && (
      <article
        className={cx(className, styles.article, {
          [styles.xl]: xl,
          [styles.l]: l,
        })}
        dangerouslySetInnerHTML={{ __html: children }}
        data-aos={animate === true ? 'fade-in' : null}
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
          if (type === 'paragraf') {
            return items.map((item, i) => (
              <div
                key={i}
                dangerouslySetInnerHTML={{ __html: item.paragraph.html }}
                data-aos={animate === true ? 'fade-in' : null}
              />
            ));
          }
          if (type === 'zdjecie') {
            return items.map((item, i) => (
              <div
                key={i}
                className={styles.imgWrap}
                data-aos={animate === true ? 'fade-in' : null}
              >
                <GatsbyImage fluid={item.photo.fluid} alt={item.photo.alt} />
              </div>
            ));
          }

          return null;
        })}
      </article>
    )}
  </>
);

Article.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.any,
    PropTypes.string,
    PropTypes.node,
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
  animate: PropTypes.bool,
};

Article.defaultProps = {
  xl: false,
  l: false,
  className: '',
  object: false,
  animate: true,
};

export default Article;

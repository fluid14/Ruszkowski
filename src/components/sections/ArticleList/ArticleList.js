import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { graphql, Link, useStaticQuery } from 'gatsby';
import slugify from 'slugify';
import BackgroundImage from 'gatsby-background-image';
import * as styles from './ArticleList.module.sass';
import SectionTitle from '../../layout/Text/SectionTitle/SectionTitle';
import Section from '../../shared/Section/Section';
import Button from '../../layout/Button/Button';
import { translate } from '../../../utils/translate';

const ArticleList = ({ className, lang, data, items }) => {
  let countInitialState = 3;
  const [count, setCount] = useState(countInitialState);

  useEffect(() => {
    if (window.screen.availWidth <= 992) {
      countInitialState = 2;
    }

    setCount(countInitialState);
  });

  const addArticles = () => {
    setCount(count + countInitialState);
  };

  const {
    title: { html: title },
    shadow_title: { text: shadowTitle },
  } = data;

  const settings = useStaticQuery(graphql`
    query ArticleListSectionQuery {
      allPrismicSettings {
        nodes {
          lang
          data {
            translation_read_more {
              text
            }
          }
        }
      }
    }
  `).allPrismicSettings.nodes;

  return (
    <Section className={cx(className, styles.articleList, 'wrap')}>
      <SectionTitle
        shadowText={shadowTitle}
        shadowTextClass={styles.sectionShadowTitle}
        center
      >
        {title}
      </SectionTitle>
      <div className={styles.articleListWrap}>
        {items.map(
          (
            {
              article: {
                document: {
                  url,
                  data: {
                    article_title: { text: articleTitle },
                    article_miniature: { alt, fluid },
                    short_description: { text: shortDescription },
                  },
                  tags,
                },
              },
            },
            i
          ) => {
            if (i < count) {
              return (
                <Link
                  to={`${url}/${slugify(articleTitle, {
                    lower: true,
                  })}`}
                  key={i}
                  className={styles.article}
                >
                  <div className={styles.description}>
                    <p className={styles.text}>{shortDescription}</p>
                  </div>
                  <p className={styles.ghostText}>{tags[0]}</p>
                  <BackgroundImage
                    Tag="div"
                    className={styles.miniature}
                    fluid={fluid}
                    alt={alt}
                  />
                </Link>
              );
            }

            return null;
          }
        )}
      </div>
      {count < items.length && (
        <Button className={styles.button} onClick={addArticles} send>
          {translate(lang, settings).translation_read_more.text}
        </Button>
      )}
    </Section>
  );
};

ArticleList.propTypes = {
  className: PropTypes.string,
  lang: PropTypes.string.isRequired,
  data: PropTypes.shape({
    title: PropTypes.shape({ html: PropTypes.string }),
    shadow_title: PropTypes.shape({
      text: PropTypes.string,
    }),
  }).isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      article: PropTypes.shape({
        document: PropTypes.shape({
          url: PropTypes.string,
          data: PropTypes.shape({
            article_title: PropTypes.shape({
              text: PropTypes.string,
            }),
            short_description: PropTypes.shape({
              text: PropTypes.string,
            }),
            article_miniature: PropTypes.shape({
              alt: PropTypes.string,
              fluid: PropTypes.shape,
            }),
            tag: PropTypes.arrayOf(PropTypes.string),
          }),
        }),
      }),
    })
  ).isRequired,
};

ArticleList.defaultProps = {
  className: '',
};

export default ArticleList;

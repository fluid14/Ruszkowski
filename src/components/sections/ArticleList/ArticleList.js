import React, { useState } from 'react';
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

const ArticleList = ({ lang, data, items }) => {
  const [count, setCount] = useState(3);
  const addArticles = () => {
    setCount(count + 3);
  };

  const {
    title: { html: title },
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

  console.log(settings);

  return (
    <Section className={cx(styles.articleList, 'wrap')}>
      <SectionTitle center>{title}</SectionTitle>
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
            console.log(i, count);
            if (i < count) {
              return (
                <Link
                  to={`${url}/${slugify(articleTitle, {
                    lower: true,
                  })}`}
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
  lang: PropTypes.string.isRequired,
  data: PropTypes.shape({
    title: PropTypes.shape({ html: PropTypes.string }),
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

export default ArticleList;

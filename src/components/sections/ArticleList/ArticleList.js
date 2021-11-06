import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link } from 'gatsby';
import slugify from 'slugify';
import BackgroundImage from 'gatsby-background-image';
import * as styles from './ArticleList.module.sass';
import SectionTitle from '../../layout/Text/SectionTitle/SectionTitle';
import Section from '../../shared/Section/Section';

const ArticleList = ({ lang, data, items }) => {
  console.log(data);
  console.log(items);

  const {
    title: { html: title },
  } = data;

  return (
    <Section className={cx(styles.articleList, 'wrap')}>
      <SectionTitle center>{title}</SectionTitle>
      <div className={styles.articleListWrap}>
        {items.map(
          ({
            article: {
              document: {
                url,
                data: {
                  article_title: { text: articleTitle },
                  article_miniature: { alt, fluid },
                  short_description: { text: shortDescription },
                },
              },
            },
          }) => (
            <Link
              to={`${url}/${slugify(articleTitle, {
                lower: true,
              })}`}
              className={styles.article}
            >
              <div className={styles.description}>
                <p className={styles.text}>{shortDescription}</p>
              </div>
              <BackgroundImage
                Tag="div"
                className={styles.miniature}
                fluid={fluid}
                alt={alt}
              />
            </Link>
          )
        )}
      </div>
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
          }),
        }),
      }),
    })
  ).isRequired,
};

export default ArticleList;

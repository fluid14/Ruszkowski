import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Section from '../../components/shared/Section/Section';
import SectionTitle from '../../components/layout/Text/SectionTitle/SectionTitle';
import Theme from '../../theme/Theme';
import Header from '../../components/shared/Header/Header';
import * as styles from './article.module.sass';
import Article from '../../components/layout/Text/Article/Article';
import Contact from '../../components/shared/Contact/Contact';
import Tags from '../../components/shared/Tags/Tags';

const ArticlePage = ({ pageContext: { lang }, data: { prismicArticle } }) => {
  const {
    tags,
    first_publication_date: firstPublicationDate,
    data: {
      article_title: { html: title },
      article_miniature: { alt: bannerAlt, fluid: bannerImg },
      body: article,
    },
  } = prismicArticle;

  return (
    <>
      <Theme lang={lang}>
        <Header title="<h1>Blog</h1>" bgc={bannerImg} bgcAlt={bannerAlt} />
        <main className={cx('wrap', styles.main)}>
          <div className={styles.content}>
            <Section className={styles.article}>
              <SectionTitle transformNone className={styles.title}>
                {title}
              </SectionTitle>
              <div className={styles.metaArticle}>
                <p className={styles.data}>
                  {new Date(firstPublicationDate).toLocaleDateString()}
                </p>
              </div>
              <Article object>{article}</Article>
            </Section>
            <section className={styles.tags}>
              <Tags tags={tags} dark />
            </section>
          </div>
          <aside className={styles.aside} />
        </main>
        <Contact className="wrap" />
      </Theme>
    </>
  );
};

export const query = graphql`
  query ArticleQuery($id: String, $lang: String) {
    prismicArticle(id: { eq: $id }, lang: { eq: $lang }) {
      data {
        article_title {
          html
        }
        article_miniature {
          alt
          fluid {
            ...GatsbyImgixFluid
          }
        }
        body {
          ... on PrismicArticleDataBodyParagraf {
            items {
              paragraph {
                html
              }
            }
            slice_type
          }
          ... on PrismicArticleDataBodyZdjecie {
            items {
              photo {
                alt
                fluid {
                  ...GatsbyImgixFluid
                }
              }
            }
            slice_type
          }
        }
      }
      tags
      first_publication_date
    }
  }
`;

ArticlePage.propTypes = {
  pageContext: PropTypes.shape({
    lang: PropTypes.string.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    prismicArticle: PropTypes.shape({
      data: PropTypes.shape({
        article_title: PropTypes.shape({ html: PropTypes.string.isRequired })
          .isRequired,
        article_miniature: PropTypes.shape({
          fluid: PropTypes.shape.isRequired,
          alt: PropTypes.string.isRequired,
        }).isRequired,
        body: PropTypes.shape.isRequired,
      }).isRequired,
      first_publication_date: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    }).isRequired,
  }).isRequired,
};

export default ArticlePage;

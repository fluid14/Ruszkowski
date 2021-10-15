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
import ArticleListAside from '../../components/shared/ArticleListAside/ArticleListAside';

const ArticlePage = ({
  pageContext: { lang },
  data: { prismicArticle, allPrismicArticle, prismicBlogPage },
}) => {
  const {
    tags,
    first_publication_date: firstPublicationDate,
    data: {
      article_title: { html: title },
      article_miniature: { alt: bannerAlt, fluid: bannerImg },
      body: article,
    },
  } = prismicArticle;

  const { edges: articles } = allPrismicArticle;

  const {
    data: {
      article_list_aside: { html: articleListAsideTitle },
    },
  } = prismicBlogPage;

  return (
    <>
      <Theme lang={lang}>
        <Header
          title="<h1>Realizations</h1>"
          bgc={bannerImg}
          bgcAlt={bannerAlt}
        />
        <main className={cx('wrap', styles.main)}>
          <div className={styles.headers}>
            <div className={styles.articleTitleWrap}>
              <SectionTitle transformNone className={styles.title}>
                {title}
              </SectionTitle>
              <div className={styles.metaArticle}>
                <p className={styles.data}>
                  {new Date(firstPublicationDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div
              className={styles.asideTitle}
              dangerouslySetInnerHTML={{ __html: articleListAsideTitle }}
            />
          </div>

          <div className={styles.body}>
            <div className={styles.content}>
              <Article object>{article}</Article>
              <section className={styles.tags}>
                <Tags tags={tags} dark />
              </section>
            </div>

            <aside className={styles.aside}>
              <div
                className={styles.asideTitle}
                dangerouslySetInnerHTML={{ __html: articleListAsideTitle }}
              />
              <ArticleListAside
                className={styles.articleListAside}
                articles={articles}
              />
              <Tags tags={tags} dark />
            </aside>
          </div>
        </main>
        <Contact className="wrap" />
      </Theme>
    </>
  );
};

export const query = graphql`
  query ArticleQuery($id: String, $lang: String) {
    prismicBlogPage(lang: { eq: $lang }) {
      data {
        article_list_aside {
          html
        }
      }
    }
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
    allPrismicArticle(filter: { lang: { eq: $lang } }, limit: 3) {
      edges {
        node {
          id
          data {
            article_title {
              text
            }
            article_miniature {
              fluid {
                ...GatsbyImgixFluid
              }
              alt
            }
          }
          first_publication_date
          url
        }
      }
    }
  }
`;

ArticlePage.propTypes = {
  pageContext: PropTypes.shape({
    lang: PropTypes.string.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    prismicBlogPage: PropTypes.shape({
      data: PropTypes.shape({
        article_list_aside: PropTypes.shape({
          html: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
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
    allPrismicArticle: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          nodes: PropTypes.shape.isRequired,
        }).isRequired
      ).isRequired,
    }).isRequired,
  }).isRequired,
};

export default ArticlePage;

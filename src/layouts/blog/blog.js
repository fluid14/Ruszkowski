import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Theme from '../../theme/Theme';
import Header from '../../components/shared/Header/Header';
import * as styles from './Blog.module.sass';
import SectionTitle from '../../components/layout/Text/SectionTitle/SectionTitle';
import Article from '../../components/layout/Text/Article/Article';
import Section from '../../components/shared/Section/Section';
import ArticleList from '../../components/Article/ArticleList/ArticleList';
import Contact from '../../components/shared/Contact/Contact';

const Blog = ({ data }) => {
  const {
    body,
    banner: { alt: bannerAlt, fluid: bannerImg },
    banner_title: { html: bannerTitle },
    description_title: { html: blogDescriptionTitle },
    description: { html: blogDescription },
    last_article_title: { html: lastArticleTitle },
  } = data.prismicBlogPage.data;

  const { lang } = data.prismicBlogPage;

  const { nodes: articles, totalCount } = data.allPrismicArticle;
  return (
    <>
      <Theme lang={lang}>
        <Header title={bannerTitle} bgc={bannerImg} bgcAlt={bannerAlt} />
        <main className="wrap">
          <Section className={styles.description}>
            <SectionTitle>{blogDescriptionTitle}</SectionTitle>
            <Article xl>{blogDescription}</Article>
          </Section>

          <Section>
            <SectionTitle center shadowText="Wpisy z bloga">
              {lastArticleTitle}
            </SectionTitle>
            <ArticleList
              lang={lang}
              articles={articles}
              totalCount={totalCount}
            />
          </Section>
          {body.map(({ slice_type: sliceType, primary }, i) => {
            switch (sliceType) {
              case 'formularz_kontaktowy':
                return <Contact key={i} slice={primary} />;

              default:
                return null;
            }
          })}
        </main>
      </Theme>
    </>
  );
};

export const query = graphql`
  query BlogQuery($id: String, $lang: String) {
    prismicBlogPage(id: { eq: $id }, lang: { eq: $lang }) {
      type
      lang
      data {
        body {
          ... on PrismicBlogPageDataBodyFormularzKontaktowy {
            slice_type
            primary {
              form_type
              form_title {
                html
              }
              message_placeholder {
                text
              }
            }
          }
        }
        banner {
          alt
          fluid {
            ...GatsbyImgixFluid
          }
        }
        description_title {
          html
        }
        description {
          html
        }
        banner_title {
          html
        }
        last_article_title {
          html
        }
      }
    }
    allPrismicArticle(filter: { lang: { eq: $lang } }) {
      nodes {
        data {
          article_title {
            text
          }
          short_description {
            html
          }
          article_miniature {
            fluid {
              ...GatsbyImgixFluid
            }
          }
        }
        tags
        id
        url
      }
      totalCount
    }
  }
`;

Blog.propTypes = {
  data: PropTypes.shape({
    prismicBlogPage: PropTypes.shape({
      lang: PropTypes.string.isRequired,
      data: PropTypes.shape({
        body: PropTypes.arrayOf(
          PropTypes.shape({
            slice_type: PropTypes.string.isRequired,
            primary: PropTypes.shape().isRequired,
          }).isRequired
        ).isRequired,
        banner: PropTypes.shape({
          alt: PropTypes.string.isRequired,
          fluid: PropTypes.oneOfType([
            PropTypes.shape({}),
            PropTypes.arrayOf(PropTypes.shape({})),
          ]),
        }).isRequired,
        description_title: PropTypes.shape({
          html: PropTypes.string.isRequired,
        }).isRequired,
        description: PropTypes.shape({
          html: PropTypes.string.isRequired,
        }).isRequired,
        banner_title: PropTypes.shape({
          html: PropTypes.string.isRequired,
        }).isRequired,
        last_article_title: PropTypes.shape({
          html: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }),
    allPrismicArticle: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          data: PropTypes.shape({
            article_title: PropTypes.shape({
              text: PropTypes.string.isRequired,
            }).isRequired,
            short_description: PropTypes.shape({
              html: PropTypes.string.isRequired,
            }).isRequired,
            article_miniature: PropTypes.shape.isRequired,
          }).isRequired,
          id: PropTypes.string.isRequired,
          tags: PropTypes.arrayOf(PropTypes.string).isRequired,
        })
      ),
      totalCount: PropTypes.number.isRequired,
    }),
  }).isRequired,
};

export default Blog;

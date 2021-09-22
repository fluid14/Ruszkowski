import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import Theme from '../theme/Theme';
import Header from '../components/shared/Header/Header';
import * as styles from './Blog.module.sass';
import SectionTitle from '../components/layout/Text/SectionTitle/SectionTitle';
import Article from '../components/layout/Text/Article/Article';
import Section from '../components/shared/Section/Section';
import ArticleList from '../components/Article/ArticleList/ArticleList';
import Contact from '../components/shared/Contact/Contact';

const BlogComponent = ({ data }) => {
  const {
    banner: { alt: bannerAlt, fluid: bannerImg },
    banner_title: { html: bannerTitle },
    description_title: { html: blogDescriptionTitle },
    description: { html: blogDescription },
    last_article_title: { html: lastArticleTitle },
  } = data.prismicBlogPage.data;

  return (
    <>
      <Theme>
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
            <ArticleList />
          </Section>
          <Contact />
        </main>
      </Theme>
    </>
  );
};

const Blog = (props) => (
  <StaticQuery
    query={graphql`
      query HeaderQuery($lang: String) {
        prismicBlogPage(lang: { eq: $lang }) {
          data {
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
      }
    `}
    render={(data) => <BlogComponent data={data} {...props} />}
  />
);

BlogComponent.propTypes = {
  data: PropTypes.shape({
    prismicBlogPage: PropTypes.shape({
      data: PropTypes.shape({
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
  }).isRequired,
};

export default Blog;

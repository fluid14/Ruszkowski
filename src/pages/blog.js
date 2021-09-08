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

const BlogComponent = ({ data }) => {
  const {
    blog_banner: { alt: bannerAlt, fluid: bannerImg },
    blog_banner_title: { html: bannerTitle },
    blog_description_title: { html: blogDescriptionTitle },
    blog_description: { html: blogDescription },
    last_article_title: { html: lastArticleTitle },
  } = data.prismicPage.data;

  return (
    <>
      <Theme>
        <Header title={bannerTitle} bgc={bannerImg} bgcAlt={bannerAlt} />
        <main className="wrap">
          <Section className={styles.description}>
            <SectionTitle>{blogDescriptionTitle}</SectionTitle>
            <Article xl>{blogDescription}</Article>
          </Section>

          <Section className={styles.lastArticles}>
            <SectionTitle center shadowText="Wpisy z bloga">
              {lastArticleTitle}
            </SectionTitle>
            <ArticleList />
          </Section>
        </main>
      </Theme>
    </>
  );
};

const Blog = (props) => (
  <StaticQuery
    query={graphql`
      query HeaderQuery {
        prismicPage {
          data {
            blog_banner {
              alt
              fluid {
                ...GatsbyImgixFluid
              }
            }
            blog_description_title {
              html
            }
            blog_description {
              html
            }
            blog_banner_title {
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
    prismicPage: PropTypes.shape({
      data: PropTypes.shape({
        blog_banner: PropTypes.shape({
          alt: PropTypes.string.isRequired,
          fluid: PropTypes.oneOfType([
            PropTypes.shape({}),
            PropTypes.arrayOf(PropTypes.shape({})),
          ]),
        }).isRequired,
        blog_description_title: PropTypes.shape({
          html: PropTypes.string.isRequired,
        }).isRequired,
        blog_description: PropTypes.shape({
          html: PropTypes.string.isRequired,
        }).isRequired,
        blog_banner_title: PropTypes.shape({
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

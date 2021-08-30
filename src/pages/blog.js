import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import Theme from '../theme/Theme';
import Header from '../components/shared/Header/Header';
import headerImg from '../../static/images/blog/header.png';
import * as styles from './Blog.module.sass';
import SectionTitle from '../components/layout/Text/SectionTitle/SectionTitle';
import Article from '../components/layout/Text/Article/Article';

const BlogComponent = ({ data }) => {
  const {
    blog_banner_title: { html: bannerTitle },
    blog_description_title: { html: blogDescriptionTitle },
    blog_description: { html: blogDescription },
  } = data.prismicPage.data;

  return (
    <>
      <Theme>
        {/* <Header */}
        {/*  title={['Realizacje', <br />, <span>Indywidualne</span>]} */}
        {/*  bgc={headerImg} */}
        {/* /> */}
        <Header title="Blog" bgc={headerImg} />
        <main className={(styles.blogWrap, 'wrap')}>
          <SectionTitle>{blogDescriptionTitle}</SectionTitle>
          <Article>{blogDescription}</Article>
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
            blog_description_title {
              html
            }
            blog_description {
              html
            }
            blog_banner_title {
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
        blog_description_title: PropTypes.shape({
          html: PropTypes.string.isRequired,
        }).isRequired,
        blog_description: PropTypes.shape({
          html: PropTypes.string.isRequired,
        }).isRequired,
        blog_banner_title: PropTypes.shape({
          html: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }),
  }).isRequired,
};

export default Blog;

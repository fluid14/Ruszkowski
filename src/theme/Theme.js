import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import Navbar from '../components/layout/Navbar/Navbar';
import PageOrnament from '../components/layout/PageOrnament/PageOrnament';
import 'normalize.css';
import Footer from '../components/layout/Footer/Footer';

const ThemeComponent = ({
  children,
  data: {
    prismicPage: {
      data: { logo, footer_links: footerLinks },
    },
  },
}) => (
  <>
    <Navbar />
    <PageOrnament />
    <main>{children}</main>
    <Footer logo={logo} links={footerLinks} />
  </>
);

const Theme = (props) => (
  <StaticQuery
    query={graphql`
      query FooterQuery {
        prismicPage {
          data {
            logo {
              alt
              fluid {
                ...GatsbyImgixFluid_noBase64
              }
            }
            footer_links {
              footer_link {
                url
              }
              footer_link_title
            }
          }
        }
      }
    `}
    render={(data) => <ThemeComponent data={data} {...props} />}
  />
);

ThemeComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  data: PropTypes.shape({
    prismicPage: PropTypes.shape({
      data: PropTypes.shape({
        logo: PropTypes.shape.isRequired,
        footer_links: PropTypes.arrayOf.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default Theme;

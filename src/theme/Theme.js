import React, { useEffect } from 'react';
import { graphql, StaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import Navbar from '../components/layout/Navbar/Navbar';
import PageOrnament from '../components/layout/PageOrnament/PageOrnament';
import 'normalize.css';
import Footer from '../components/layout/Footer/Footer';
import AOS from 'aos/dist/aos';
import 'aos/dist/aos.css';

const ThemeComponent = ({
  children,
  lang,
  data: {
    prismicSettings: {
      data: { logo, footer_links: footerLinks },
    },
  },
}) => {
  useEffect(() => {
    AOS.init();
  });
  return (
    <>
      <main className="pageWrap">
        <Navbar lang={lang} />
        <PageOrnament />
        <main>{children}</main>
        <Footer lang={lang} logo={logo} links={footerLinks} />
      </main>
    </>
  );
};

const Theme = (props) => (
  <StaticQuery
    query={graphql`
      query FooterQuery {
        prismicSettings {
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
  lang: PropTypes.string.isRequired,
  data: PropTypes.shape({
    prismicSettings: PropTypes.shape({
      data: PropTypes.shape({
        logo: PropTypes.shape.isRequired,
        footer_links: PropTypes.arrayOf.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default Theme;

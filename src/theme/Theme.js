import React, { useEffect } from 'react';
import { graphql, StaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import GatsbyImage from 'gatsby-image';
import Navbar from '../components/layout/Navbar/Navbar';
import PageOrnament from '../components/layout/PageOrnament/PageOrnament';
import 'normalize.css';
import Footer from '../components/layout/Footer/Footer';
import { motion } from 'framer-motion';
import { translate } from '../utils/translate';
import SEO from '../components/shared/SEO/SEO';
import 'aos/dist/aos.css';

const blackBox = {
  initial: {
    bottom: 0,
    height: '100vh',
    width: '100vw',
    transform: 'translateX(0)',
  },
  animate: {
    height: '100vh',
    width: 0,
    transform: 'translateX(-100vw)',
  },
  exit: {
    bottom: 0,
    height: '100vh',
    width: '100vw',
    transform: 'translateX(0)',
  },
};

const logoVar = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: 0,
  },
  exit: {
    opacity: 1,
  },
};

const ThemeComponent = ({
  children,
  lang,
  data: {
    allPrismicSettings: { nodes: settings },
    prismicSettings: {
      data: { logo, footer_links: footerLinks },
    },
  },
  title,
  description,
  keywords,
}) => {
  let AOS;
  useEffect(() => {
    AOS = require('aos');
    AOS.init({
      once: true,
      offset: 200,
      duration: 1000,
      anchorPlacement: 'center-bottom',
    });
  }, []);

  useEffect(() => {
    if (AOS) {
      AOS.refresh();
    }
  });

  return (
    <>
      <SEO
        lang={lang}
        title={title}
        keywords={keywords}
        description={description}
      />
      <motion.div
        className="preload"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={blackBox}
        transition={{
          duration: 1.5,
          ease: [0.87, 0, 0.13, 1],
        }}
      >
        <motion.div
          className="preloadLogoWrap"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={logoVar}
          transition={{
            duration: 0.2,
            delay: 0.5,
            ease: 'easeInOut',
          }}
        >
          <GatsbyImage
            className="preloadLogo"
            alt={translate(lang, settings).logo.alt}
            fluid={translate(lang, settings).logo.fluid}
          />
        </motion.div>
      </motion.div>
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
        allPrismicSettings {
          nodes {
            lang
            data {
              logo {
                alt
                fluid {
                  ...GatsbyImgixFluid
                }
              }
            }
          }
        }
        prismicSettings {
          data {
            logo {
              alt
              fluid {
                ...GatsbyImgixFluid
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
  description: PropTypes.string,
  keywords: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  lang: PropTypes.string.isRequired,
  data: PropTypes.shape({
    allPrismicSettings: PropTypes.shape({ nodes: PropTypes.shape() }),
    prismicSettings: PropTypes.shape({
      data: PropTypes.shape({
        logo: PropTypes.shape.isRequired,
        footer_links: PropTypes.arrayOf.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

ThemeComponent.defaultProps = {
  title: 'Ruszkowski',
  description: '',
  keywords: '',
};

export default Theme;

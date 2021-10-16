import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Theme from '../../theme/Theme';
import Header from '../../components/shared/Header/Header';
import * as styles from './realizations.module.sass';
import SectionTitle from '../../components/layout/Text/SectionTitle/SectionTitle';
import Article from '../../components/layout/Text/Article/Article';
import Section from '../../components/shared/Section/Section';
import ArticleList from '../../components/Article/ArticleList/ArticleList';
import Contact from '../../components/shared/Contact/Contact';

const Realizations = ({ data }) => {
  const {
    banner: { alt: bannerAlt, fluid: bannerImg },
    banner_title: { html: bannerTitle },
  } = data.prismicRealizationsPage.data;

  const { lang } = data.prismicRealizationsPage;

  return (
    <>
      <Theme lang={lang}>
        <Header title={bannerTitle} bgc={bannerImg} bgcAlt={bannerAlt} />
        <main className="wrap">
          {/* <Section className={styles.description}> */}
          {/*  <SectionTitle>{blogDescriptionTitle}</SectionTitle> */}
          {/*  <Article xl>{blogDescription}</Article> */}
          {/* </Section> */}

          {/* <Section> */}
          {/*  <SectionTitle center shadowText="Wpisy z bloga"> */}
          {/*    {lastArticleTitle} */}
          {/*  </SectionTitle> */}
          {/*  <ArticleList articles={articles} totalCount={totalCount} /> */}
          {/* </Section> */}
          <Contact />
        </main>
      </Theme>
    </>
  );
};

export const query = graphql`
  query RealizationsQuery($id: String, $lang: String) {
    prismicRealizationsPage(id: { eq: $id }, lang: { eq: $lang }) {
      type
      lang
      data {
        banner {
          alt
          fluid {
            ...GatsbyImgixFluid
          }
        }
        banner_title {
          html
        }
      }
    }
  }
`;

Realizations.propTypes = {
  data: PropTypes.shape({
    prismicRealizationsPage: PropTypes.shape({
      lang: PropTypes.string.isRequired,
      data: PropTypes.shape({
        banner: PropTypes.shape({
          alt: PropTypes.string.isRequired,
          fluid: PropTypes.oneOfType([
            PropTypes.shape({}),
            PropTypes.arrayOf(PropTypes.shape({})),
          ]),
        }).isRequired,
        banner_title: PropTypes.shape({
          html: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }),
  }).isRequired,
};

export default Realizations;

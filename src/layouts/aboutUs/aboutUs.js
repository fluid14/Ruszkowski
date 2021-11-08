import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Theme from '../../theme/Theme';
import Header from '../../components/shared/Header/Header';
import * as styles from './aboutUs.module.sass';
import Contact from '../../components/shared/Contact/Contact';
import Section from '../../components/shared/Section/Section';
import SectionTitle from '../../components/layout/Text/SectionTitle/SectionTitle';
import Article from '../../components/layout/Text/Article/Article';
import OurSpeciality from '../../components/sections/OurSpeciality/OurSpeciality';
import Map from '../../components/sections/Map/Map';

const AboutUs = ({ data }) => {
  const {
    banner: { alt: bannerAlt, fluid: bannerImg },
    banner_title: { html: bannerTitle },
    body,
  } = data.prismicAboutUsPage.data;

  const { lang } = data.prismicAboutUsPage;

  return (
    <>
      <Theme lang={lang}>
        <Header
          title={bannerTitle}
          lang={lang}
          bgc={bannerImg}
          bgcAlt={bannerAlt}
        />
        <main className={cx(styles.aboutUsPage)}>
          {body.map(({ slice_type: sliceType, primary, items }, i) => {
            switch (sliceType) {
              case 'opis_z_tytu_em':
                return (
                  <Section
                    key={i}
                    className={cx(styles.descriptionWrap, 'wrap')}
                  >
                    <SectionTitle
                      right
                      transformNone
                      className={styles.descriptionTitle}
                    >
                      {primary.description_title.html}
                    </SectionTitle>
                    <Article className={styles.description} xl>
                      {primary.description.html}
                    </Article>
                  </Section>
                );

              case 'nasza_specjalnosc':
                return (
                  <OurSpeciality
                    className={cx(styles.ourSpeciality, 'wrap')}
                    key={i}
                    data={{ primary, items }}
                  />
                );

              case 'mapa':
                return (
                  <Map
                    className={styles.map}
                    key={i}
                    data={{ primary, items }}
                  />
                );

              case 'formularz_kontaktowy':
                return (
                  <Contact
                    key={i}
                    className="wrap"
                    slice={primary}
                    lang={lang}
                  />
                );

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
  query AboutUsQuery($id: String, $lang: String) {
    prismicAboutUsPage(id: { eq: $id }, lang: { eq: $lang }) {
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
        body {
          ... on PrismicAboutUsPageDataBodyMapa {
            id
            items {
              type
              info_title
              info {
                html
              }
              icon {
                alt
                fluid {
                  ...GatsbyImgixFluid
                }
              }
            }
            slice_type
            primary {
              lat
              lng
              title {
                text
              }
            }
          }
          ... on PrismicAboutUsPageDataBodyNaszaSpecjalnosc {
            slice_type
            primary {
              title {
                html
              }
            }
            items {
              description {
                html
              }
              icon {
                fluid {
                  ...GatsbyImgixFluid
                }
                alt
              }
              title {
                text
              }
            }
          }
          ... on PrismicAboutUsPageDataBodyFormularzKontaktowy {
            slice_type
            primary {
              shadow_title {
                text
              }
              form_title {
                html
              }
              form_type
              message_placeholder {
                text
              }
            }
          }
          ... on PrismicAboutUsPageDataBodyOpisZTytuEm {
            slice_type
            primary {
              description_title {
                html
              }
              description {
                html
              }
            }
          }
        }
      }
    }
  }
`;

AboutUs.propTypes = {
  data: PropTypes.shape({
    prismicAboutUsPage: PropTypes.shape({
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
        body: PropTypes.arrayOf(
          PropTypes.shape({
            primary: PropTypes.shape({
              description_title: PropTypes.shape({ html: PropTypes.string }),
              shadow_title: PropTypes.shape({ text: PropTypes.string }),
              description: PropTypes.shape({ html: PropTypes.string }),
              slice_type: PropTypes.string,
            }).isRequired,
            slice_type: PropTypes.string.isRequired,
          }).isRequired
        ),
      }).isRequired,
    }),
  }).isRequired,
};

export default AboutUs;

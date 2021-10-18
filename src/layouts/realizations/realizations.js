import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Theme from '../../theme/Theme';
import Header from '../../components/shared/Header/Header';
import * as styles from './realizations.module.sass';
import Contact from '../../components/shared/Contact/Contact';
import Cooperation from '../../components/sections/Cooperation/Cooperation';
import RealizationsList from '../../components/sections/RealizationsList/RealizationsList';

const Realizations = ({ data }) => {
  const {
    banner: { alt: bannerAlt, fluid: bannerImg },
    banner_title: { html: bannerTitle },
    body,
  } = data.prismicRealizationsPage.data;

  const { lang } = data.prismicRealizationsPage;

  return (
    <>
      <Theme lang={lang}>
        <Header
          className={styles.header}
          title={bannerTitle}
          bgc={bannerImg}
          bgcAlt={bannerAlt}
        />
        <main className={cx(styles.realizationsPage, 'wrap')}>
          {body.map((slice, i) => {
            switch (slice.slice_type) {
              case 'wspo_praca':
                return (
                  <Cooperation
                    key={i}
                    className={styles.cooperation}
                    data={slice}
                  />
                );

              case 'realizacje':
                return (
                  <RealizationsList
                    key={i}
                    className={styles.realizationsList}
                    data={slice}
                    lang={lang}
                    realizations={data.allPrismicRelization}
                  />
                );

              case 'formularz_kontaktowy':
                return <Contact key={i} slice={slice.primary} />;

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
        body {
          ... on PrismicRealizationsPageDataBodyFormularzKontaktowy {
            primary {
              form_title {
                html
              }
              form_type
              message_placeholder {
                text
              }
            }
            slice_type
          }
          ... on PrismicRealizationsPageDataBodyWspoPraca {
            slice_type
            primary {
              cooperation_description {
                html
              }
              cooperation_photo {
                fluid {
                  ...GatsbyImgixFluid
                }
                alt
              }
              cooperation_title {
                html
              }
              our_speciality {
                html
              }
            }
            items {
              our_speciality_icon {
                alt
                fluid {
                  ...GatsbyImgixFluid
                }
              }
              out_speciality_description {
                text
              }
            }
          }
          ... on PrismicRealizationsPageDataBodyRealizacje {
            slice_type
            primary {
              realizations_list_title {
                html
              }
              investor_title {
                text
              }
              place_title {
                text
              }
              scope_title {
                text
              }
            }
          }
        }
      }
    }
    allPrismicRelization(filter: { lang: { eq: $lang } }) {
      totalCount
      nodes {
        id
        data {
          description {
            html
          }
          gallery {
            photo {
              fluid {
                src
              }
              alt
            }
          }
          investor {
            text
          }
          place {
            text
          }
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
        body: PropTypes.arrayOf(
          PropTypes.shape({
            primary: PropTypes.shape({
              slice_type: PropTypes.string,
            }).isRequired,
            slice_type: PropTypes.string.isRequired,
          }).isRequired
        ),
      }).isRequired,
    }),
    allPrismicRelization: PropTypes.shape({
      nodes: PropTypes.shape.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Realizations;

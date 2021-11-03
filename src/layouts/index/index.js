import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Theme from '../../theme/Theme';
import * as styles from './index.module.sass';
import Contact from '../../components/shared/Contact/Contact';
import Header from '../../components/shared/Header/Header';

const Index = ({ data }) => {
  const {
    lang,
    data: { header_slider: headerSlider, body },
  } = data.prismicMainPage;

  return (
    <Theme lang={lang}>
      <Header slides={headerSlider} slider />
      <main className={cx(styles.mainPage)} id="mainPage">
        {body.map(({ slice_type: sliceType, primary }, i) => {
          switch (sliceType) {
            case 'formularz_kontaktowy':
              return (
                <Contact
                  key={i}
                  className={cx(styles.contact, 'wrap')}
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
  );
};

export const query = graphql`
  query MainPageQuery($lang: String) {
    prismicMainPage(lang: { eq: $lang }) {
      lang
      data {
        body {
          ... on PrismicMainPageDataBodyFormularzKontaktowy {
            id
            slice_type
            primary {
              form_title {
                html
              }
              form_type
              message_placeholder {
                text
              }
            }
          }
        }
        header_slider {
          description {
            html
          }
          image {
            alt
            fluid {
              ...GatsbyImgixFluid
            }
          }
          link {
            url
          }
          title {
            html
          }
        }
      }
    }
  }
`;

Index.propTypes = {
  data: PropTypes.shape({
    prismicMainPage: PropTypes.shape({
      lang: PropTypes.string.isRequired,
      data: PropTypes.shape({
        header_slider: PropTypes.arrayOf(
          PropTypes.shape({
            description: PropTypes.shape({
              html: PropTypes.string,
            }),
            image: PropTypes.shape({
              alt: PropTypes.string,
              fluid: PropTypes.shape,
            }),
            link: PropTypes.shape({ url: PropTypes.string }),
            title: PropTypes.shape({ html: PropTypes.string }),
          })
        ),
        body: PropTypes.arrayOf(
          PropTypes.shape({
            slice_type: PropTypes.string,
            primary: PropTypes.shape({
              form_title: PropTypes.shape({
                html: PropTypes.string,
              }),
              message_placeholder: PropTypes.shape({
                text: PropTypes.string,
              }),
              form_type: PropTypes.string,
            }),
          })
        ),
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default Index;

import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Breadcrumb } from 'gatsby-plugin-breadcrumb';
import Theme from '../../theme/Theme';
import * as styles from './index.module.sass';
import Contact from '../../components/shared/Contact/Contact';
import Header from '../../components/shared/Header/Header';
import Cooperation from '../../components/sections/Cooperation/Cooperation';
import DesignWithUs from '../../components/sections/DesignWithUs/DesignWithUs';
import ProductsSlider from '../../components/sections/ProductsSlider/ProductsSlider';
import ArticleList from '../../components/sections/ArticleList/ArticleList';

const Index = ({ location, data }) => {
  const {
    lang,
    data: { header_slider: headerSlider, body, keywords, description },
  } = data.prismicMainPage;

  console.log(location);

  return (
    <Theme lang={lang}>
      <Header
        slides={headerSlider}
        lang={lang}
        slider
        description={description}
        keywords={keywords}
      />
      <main className={cx(styles.mainPage)} id="mainPage">
        {body.map((slice, i) => {
          const { slice_type: sliceType, primary, items } = slice;
          switch (sliceType) {
            case 'opis_ze_zdjeciem_i_linkiem':
              return (
                <DesignWithUs
                  key={i}
                  className={cx(styles.designWithUs, 'wrap')}
                  data={primary}
                />
              );
            case 'wspo_praca':
              return (
                <Cooperation
                  key={i}
                  className={cx(styles.cooperation, 'wrap')}
                  data={slice}
                  title={primary.section_title.html}
                />
              );

            case 'slider_produktow':
              return (
                <ProductsSlider
                  key={i}
                  lang={lang}
                  className={styles.productsSlider}
                  data={primary}
                  items={items}
                />
              );

            case 'o_tym_piszemy':
              return (
                <ArticleList
                  key={i}
                  lang={lang}
                  className={styles.articleSlider}
                  data={primary}
                  items={items}
                />
              );

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
        description
        keywords
        body {
          ... on PrismicMainPageDataBodyOTymPiszemy {
            id
            slice_type
            primary {
              title {
                html
              }
              shadow_title {
                text
              }
            }
            items {
              article {
                document {
                  ... on PrismicArticle {
                    id
                    url
                    data {
                      article_miniature {
                        fluid {
                          ...GatsbyImgixFluid
                        }
                      }
                      short_description {
                        text
                      }
                      article_title {
                        text
                      }
                    }
                    tags
                  }
                }
              }
            }
          }
          ... on PrismicMainPageDataBodySliderProduktow {
            id
            slice_type
            primary {
              title {
                html
              }
              shadow_title {
                text
              }
            }
            items {
              produkt {
                document {
                  ... on PrismicProduct {
                    id
                    url
                    data {
                      miniature {
                        alt
                        fluid {
                          ...GatsbyImgixFluid
                        }
                      }
                      product_title {
                        text
                      }
                      miniature_title {
                        text
                      }
                      miniature_description {
                        text
                      }
                    }
                  }
                }
              }
            }
          }
          ... on PrismicMainPageDataBodyOpisZeZdjeciemILinkiem {
            id
            slice_type
            primary {
              link_title
              shadow_title {
                text
              }
              descripion_title {
                html
              }
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
              section_title {
                html
              }
            }
          }
          ... on PrismicMainPageDataBodyWspoPraca {
            id
            items {
              our_speciality_icon {
                fluid {
                  ...GatsbyImgixFluid
                }
                alt
              }
              out_speciality_description {
                text
              }
            }
            primary {
              shadow_title {
                text
              }
              section_title {
                html
              }
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
            slice_type
          }
          ... on PrismicMainPageDataBodyFormularzKontaktowy {
            id
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
  location: PropTypes.shape().isRequired,
  data: PropTypes.shape({
    prismicMainPage: PropTypes.shape({
      lang: PropTypes.string.isRequired,
      data: PropTypes.shape({
        description: PropTypes.string,
        keywords: PropTypes.string,
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
              section_title: PropTypes.shape({ html: PropTypes.string }),
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

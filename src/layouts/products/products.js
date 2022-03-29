import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Theme from '../../theme/Theme';
import Header from '../../components/shared/Header/Header';
import * as styles from './products.module.sass';
import Contact from '../../components/shared/Contact/Contact';
import Products from '../../components/sections/Products/Products';

const ProductsPage = ({ data, location }) => {
  const urlSearchParams = new URLSearchParams(location.search);
  const { type } = Object.fromEntries(urlSearchParams.entries());

  const {
    banner: { alt: bannerAlt, fluid: bannerImg },
    banner_title: { html: bannerTitle, text: textTitle },
    body,
    keywords,
    description,
  } = data.prismicProducts.data;
  const { nodes: products } = data.allPrismicProduct;

  const { lang, url } = data.prismicProducts;

  return (
    <>
      <Theme
        lang={lang}
        title={textTitle}
        description={description}
        keywords={keywords}
      >
        <Header
          title={bannerTitle}
          lang={lang}
          bgc={bannerImg}
          bgcAlt={bannerAlt}
          breadcrumbLocation={{ location, url }}
        />
        <main className={cx(styles.productsPage)} id="products">
          {body.map(({ slice_type: sliceType, primary }, i) => {
            switch (sliceType) {
              case 'produkty':
                return (
                  <Products
                    key={i}
                    products={products}
                    defaultType={type}
                    lang={lang}
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
    </>
  );
};

export const query = graphql`
  query ProductsQuery($lang: String) {
    prismicProducts(lang: { eq: $lang }) {
      lang
      url
      data {
        description
        keywords
        body {
          ... on PrismicProductsDataBodyProdukty {
            slice_type
          }
          ... on PrismicProductsDataBodyFormularzKontaktowy {
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
        banner_title {
          html
          text
        }
        banner {
          alt
          fluid {
            ...GatsbyImgixFluid
          }
        }
      }
    }
    allPrismicProduct(filter: { lang: { eq: $lang } }) {
      nodes {
        tags
        url
        data {
          miniature {
            fluid {
              ...GatsbyImgixFluid
            }
          }
          miniature_description {
            text
          }
          miniature_title {
            text
          }
          product_title {
            text
          }
        }
      }
    }
  }
`;

ProductsPage.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
  data: PropTypes.shape({
    prismicProducts: PropTypes.shape({
      lang: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      data: PropTypes.shape({
        description: PropTypes.string,
        keywords: PropTypes.string,
        banner: PropTypes.shape({
          alt: PropTypes.string.isRequired,
          fluid: PropTypes.oneOfType([
            PropTypes.shape({}),
            PropTypes.arrayOf(PropTypes.shape({})),
          ]),
        }).isRequired,
        banner_title: PropTypes.shape({
          html: PropTypes.string.isRequired,
          text: PropTypes.string.isRequired,
        }).isRequired,
        body: PropTypes.arrayOf(
          PropTypes.shape({
            primary: PropTypes.shape({
              description_title: PropTypes.shape({ html: PropTypes.string }),
              description: PropTypes.shape({ html: PropTypes.string }),
              slice_type: PropTypes.string,
            }),
            slice_type: PropTypes.string,
          })
        ),
      }),
    }),
    allPrismicProduct: PropTypes.shape({ nodes: PropTypes.array }),
  }).isRequired,
};

ProductsPage.defaultProps = {
  location: null,
};

export default ProductsPage;

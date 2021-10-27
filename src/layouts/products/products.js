import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Theme from '../../theme/Theme';
import Header from '../../components/shared/Header/Header';
import * as styles from './products.module.sass';
import Contact from '../../components/shared/Contact/Contact';
import Products from '../../components/sections/Products/Products';

const ProductsPage = ({ data }) => {
  const {
    banner: { alt: bannerAlt, fluid: bannerImg },
    banner_title: { html: bannerTitle },
    body,
  } = data.prismicProducts.data;
  const { nodes: products, totalCount } = data.allPrismicProduct;

  const { lang } = data.prismicProducts;

  return (
    <>
      <Theme lang={lang}>
        <Header title={bannerTitle} bgc={bannerImg} bgcAlt={bannerAlt} />
        <main className={cx(styles.productsPage)}>
          {body.map(({ slice_type: sliceType, primary }, i) => {
            switch (sliceType) {
              case 'produkty':
                return <Products key={i} products={products} />;

              case 'formularz_kontaktowy':
                return (
                  <Contact
                    key={i}
                    className={cx(styles.contact, 'wrap')}
                    slice={primary}
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
      data {
        body {
          ... on PrismicProductsDataBodyProdukty {
            slice_type
          }
          ... on PrismicProductsDataBodyFormularzKontaktowy {
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
        banner_title {
          html
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
          description {
            html
          }
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
  data: PropTypes.shape({
    prismicProducts: PropTypes.shape({
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
              description: PropTypes.shape({ html: PropTypes.string }),
              slice_type: PropTypes.string,
            }).isRequired,
            slice_type: PropTypes.string.isRequired,
          }).isRequired
        ),
      }).isRequired,
    }),
    allPrismicProduct: PropTypes.shape({ nodes: PropTypes.shape({}) }),
  }).isRequired,
};

export default ProductsPage;

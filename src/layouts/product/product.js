import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Theme from '../../theme/Theme';
import Header from '../../components/shared/Header/Header';
import * as styles from './product.module.sass';
import SectionTitle from '../../components/layout/Text/SectionTitle/SectionTitle';
import Article from '../../components/layout/Text/Article/Article';
import Section from '../../components/shared/Section/Section';

const ProductPage = ({ data }) => {
  console.log(data);
  const {
    banner: { alt: bannerAlt, fluid: bannerImg },
    miniature_title: { html: bannerTitle },
    product_title: { html: title },
    description: { html: description },
  } = data.prismicProduct.data;

  const { lang } = data.prismicProduct;

  return (
    <>
      <Theme lang={lang}>
        <Header title={bannerTitle} bgc={bannerImg} bgcAlt={bannerAlt} />
        <main className={cx(styles.productPage, 'wrap')}>
          <SectionTitle className={styles.productTitle} transformNone>
            {title}
          </SectionTitle>
          <Section className={styles.descriptionWrap}>
            <Article>{description}</Article>
          </Section>
          {/* {body.map(({ slice_type: sliceType, primary }, i) => { */}
          {/* switch (sliceType) { */}
          {/*   case 'produkty': */}
          {/*     return <Products key={i} products={products} />; */}

          {/*   case 'formularz_kontaktowy': */}
          {/*     return ( */}
          {/*       <Contact */}
          {/*         key={i} */}
          {/*         className={cx(styles.contact, 'wrap')} */}
          {/*         slice={primary} */}
          {/*       /> */}
          {/*     ); */}

          {/*   default: */}
          {/*     return null; */}
          {/* } */}
          {/* })} */}
        </main>
      </Theme>
    </>
  );
};

export const query = graphql`
  query ProductQuery($id: String, $lang: String) {
    prismicProduct(id: { eq: $id }, lang: { eq: $lang }) {
      lang
      data {
        product_title {
          html
        }
        miniature_title {
          html
        }
        banner {
          fluid {
            ...GatsbyImgixFluid
          }
          alt
        }
        description {
          html
        }
        body {
          ... on PrismicProductDataBodyDostepneMateriaY {
            id
            slice_type
            primary {
              title {
                html
              }
            }
            items {
              materia__name
              material_image {
                alt
                fluid {
                  src
                }
              }
            }
          }
          ... on PrismicProductDataBodyLista {
            id
            slice_type
            primary {
              title {
                html
              }
            }
            items {
              item
            }
          }
          ... on PrismicProductDataBodyOpisZTytuEm {
            id
            slice_type
            primary {
              description {
                html
              }
              description_title {
                html
              }
            }
          }
        }
      }
    }
  }
`;

ProductPage.propTypes = {
  data: PropTypes.shape({
    prismicProduct: PropTypes.shape({
      lang: PropTypes.string.isRequired,
      data: PropTypes.shape({
        banner: PropTypes.shape({
          alt: PropTypes.string.isRequired,
          fluid: PropTypes.oneOfType([
            PropTypes.shape({}),
            PropTypes.arrayOf(PropTypes.shape({})),
          ]),
        }).isRequired,
        miniature_title: PropTypes.shape({
          html: PropTypes.string.isRequired,
        }).isRequired,
        product_title: PropTypes.shape({
          html: PropTypes.string.isRequired,
        }).isRequired,
        description: PropTypes.shape({
          html: PropTypes.string.isRequired,
        }).isRequired,
        body: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string,
            slice_type: PropTypes.string,
            items: PropTypes.arrayOf({
              item: PropTypes.string,
              materia_name: PropTypes.string,
              material_image: PropTypes.shape({
                alt: PropTypes.string,
                fluid: PropTypes.shape,
              }),
            }),
            primary: PropTypes.shape({
              title: PropTypes.shape({
                html: PropTypes.string,
              }),
              description: PropTypes.shape({
                html: PropTypes.string,
              }),
              description_title: PropTypes.shape({
                html: PropTypes.string,
              }),
            }),
          })
        ),
      }).isRequired,
    }),
  }).isRequired,
};

export default ProductPage;

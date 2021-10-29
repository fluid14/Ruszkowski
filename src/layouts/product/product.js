import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Theme from '../../theme/Theme';
import Header from '../../components/shared/Header/Header';
import * as styles from './product.module.sass';
import SectionTitle from '../../components/layout/Text/SectionTitle/SectionTitle';
import Article from '../../components/layout/Text/Article/Article';
import List from '../../components/sections/List/List';
import Section from '../../components/shared/Section/Section';
import Materials from '../../components/sections/Materials/Materials';

const ProductPage = ({ data }) => {
  console.log(data);
  const {
    banner: { alt: bannerAlt, fluid: bannerImg },
    miniature_title: { html: bannerTitle },
    product_title: { html: title },
    release_date: releaseDate,
    body,
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
          <Section className={styles.main}>
            {body.map(({ slice_type: sliceType, primary, items }, i) => {
              switch (sliceType) {
                case 'opis':
                  return (
                    <Article key={i} className={styles.descriptionWrap}>
                      {primary.description.html}
                    </Article>
                  );

                case 'lista':
                  return (
                    <List
                      key={i}
                      className={styles.list}
                      title={primary.title}
                      items={items}
                    />
                  );

                case 'opis_z_tytu_em':
                  return (
                    <div key={i} className={styles.descriptionWithTitle}>
                      <Article>{primary.description_title.html}</Article>
                      <Article>{primary.description.html}</Article>
                    </div>
                  );

                case 'dostepne_materia_y':
                  return (
                    <Materials
                      key={i}
                      className={styles.materials}
                      primary={primary}
                      items={items}
                    />
                  );

                default:
                  return null;
              }
            })}

            <p className={styles.releaseDate}>
              Termin realizacji: {releaseDate}
            </p>
          </Section>
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
        release_date
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
        body {
          ... on PrismicProductDataBodyOpis {
            id
            slice_type
            primary {
              description {
                html
              }
            }
          }
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
        release_date: PropTypes.string.isRequired,
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
        body: PropTypes.arrayOf(
          PropTypes.shape({
            description: PropTypes.shape({
              html: PropTypes.string,
            }),
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

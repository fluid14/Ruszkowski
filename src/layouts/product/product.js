import React, { useContext, useState } from 'react';
import { graphql, Link } from 'gatsby';
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
import Contact from '../../components/shared/Contact/Contact';
import ProductGallery from '../../components/sections/ProductGallery/ProductGallery';
import Button from '../../components/layout/Button/Button';
import { translate } from '../../utils/translate';

const ProductPage = ({ data }) => {
  const {
    banner: { alt: bannerAlt, fluid: bannerImg },
    miniature_title: { html: bannerTitle, text: productTitle },
    product_title: { html: title, text: textTitle },
    release_date: releaseDate,
    body,
  } = data.prismicProduct.data;

  const settings = data.allPrismicSettings.nodes;

  const {
    contac_form_placeholder: contactPlaceholder,
    contact_form_title: contactTitle,
  } = data.prismicProducts.data;

  const { url } = data.prismicProducts;

  const { lang } = data.prismicProduct;

  const { nodes: allTags } = data.allPrismicProduct;

  let woodsType = null;

  const filters = [];
  allTags.forEach(({ tags }) => filters.push(...tags));

  return (
    <>
      <Theme lang={lang} title={textTitle}>
        <Header
          title={bannerTitle}
          lang={lang}
          bgc={bannerImg}
          bgcAlt={bannerAlt || ''}
        />
        <main className={cx(styles.productPage, 'wrap')}>
          <SectionTitle className={styles.productTitle} transformNone>
            {title}
          </SectionTitle>
          <Section className={styles.main}>
            {body.map(({ slice_type: sliceType, primary, items }, i) => {
              if (sliceType === 'dostepne_materia_y') {
                woodsType = items;
              }
              switch (sliceType) {
                case 'opis':
                  return (
                    <Article
                      key={i}
                      className={cx(styles.descriptionWrap, styles.productWrap)}
                    >
                      {primary.description.html}
                    </Article>
                  );

                case 'galeria':
                  return (
                    <ProductGallery
                      key={i}
                      className={styles.productGalleryWrap}
                      items={items}
                    />
                  );

                case 'lista':
                  return (
                    <List
                      key={i}
                      className={cx(styles.list, styles.productWrap)}
                      title={primary.title}
                      items={items}
                    />
                  );

                case 'opis_z_tytu_em':
                  return (
                    <div
                      key={i}
                      className={cx(
                        styles.descriptionWithTitle,
                        styles.productWrap
                      )}
                    >
                      <Article>{primary.description_title.html}</Article>
                      <Article>{primary.description.html}</Article>
                    </div>
                  );

                case 'dostepne_materia_y':
                  return (
                    <Materials
                      key={i}
                      className={cx(styles.materials, styles.productWrap)}
                      primary={primary}
                      items={items}
                    />
                  );

                default:
                  return null;
              }
            })}

            <p className={styles.releaseDate} data-aos="fade-in">
              Termin realizacji: {releaseDate}
            </p>
          </Section>
          <Section className={styles.asideTypes}>
            {[...new Set(filters)].map((filter, i) => (
              <Link key={i} to={`${url}?type=${filter}#products`}>
                <Button type="button" className={styles.button} sm>
                  {filter}
                </Button>
              </Link>
            ))}
          </Section>
          <Contact
            lang={lang}
            shadowText={translate(lang, settings).translation_orders.text}
            slice={{
              form_type: 'product',
              form_title: contactTitle,
              message_placeholder: contactPlaceholder,
              product: productTitle,
              woodsType,
            }}
          />
        </main>
      </Theme>
    </>
  );
};

export const query = graphql`
  query ProductQuery($id: String, $lang: String) {
    allPrismicSettings {
      nodes {
        lang
        data {
          translation_orders {
            text
          }
        }
      }
    }
    allPrismicProduct(filter: { lang: { eq: $lang } }) {
      nodes {
        tags
      }
    }
    prismicProduct(id: { eq: $id }, lang: { eq: $lang }) {
      lang
      data {
        release_date
        product_title {
          html
          text
        }
        miniature_title {
          html
          text
        }
        banner {
          fluid {
            ...GatsbyImgixFluid
          }
          alt
        }
        body {
          ... on PrismicProductDataBodyGaleria {
            id
            slice_type
            items {
              image {
                alt
                fluid {
                  ...GatsbyImgixFluid
                }
              }
            }
          }
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
            items {
              material_image {
                fluid {
                  ...GatsbyImgixFluid
                }
                alt
              }
              material_name
            }
            primary {
              title {
                html
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
    prismicProducts {
      url
      data {
        contac_form_placeholder {
          text
        }
        contact_form_title {
          html
        }
      }
    }
  }
`;

ProductPage.propTypes = {
  data: PropTypes.shape({
    allPrismicSettings: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          translation_orders: PropTypes.string,
        })
      ),
    }),
    allPrismicProduct: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          tags: PropTypes.arrayOf(PropTypes.string),
        })
      ),
    }),
    prismicProducts: PropTypes.shape({
      url: PropTypes.string,
      data: PropTypes.shape({
        contac_form_placeholder: PropTypes.shape,
        contact_form_title: PropTypes.shape,
      }),
    }),
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
          text: PropTypes.string.isRequired,
        }).isRequired,
        product_title: PropTypes.shape({
          html: PropTypes.string.isRequired,
          text: PropTypes.string.isRequired,
        }).isRequired,
        woods_type: PropTypes.arrayOf(
          PropTypes.shape({
            material_name: PropTypes.string,
            material_image: PropTypes.shape({
              alt: PropTypes.string,
              fluid: PropTypes.shape,
            }),
          })
        ).isRequired,
        body: PropTypes.arrayOf(
          PropTypes.shape({
            description: PropTypes.shape({
              html: PropTypes.string,
            }),
            id: PropTypes.string,
            slice_type: PropTypes.string,
            items: PropTypes.arrayOf({
              item: PropTypes.string,
              image: PropTypes.shape({
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

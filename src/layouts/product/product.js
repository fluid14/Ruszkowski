import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Theme from '../../theme/Theme';
import Header from '../../components/shared/Header/Header';
import * as styles from './product.sass';

const ProductPage = ({ data }) => {
  const {
    banner: { alt: bannerAlt, fluid: bannerImg },
    miniature_title: { html: bannerTitle },
  } = data.prismicProduct.data;

  const { lang } = data.prismicProduct;

  return (
    <>
      <Theme lang={lang}>
        <Header title={bannerTitle} bgc={bannerImg} bgcAlt={bannerAlt} />
        <main className={cx(styles.productPage)}>
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
      }).isRequired,
    }),
  }).isRequired,
};

export default ProductPage;

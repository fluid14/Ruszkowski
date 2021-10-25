import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import BackgroundImage from 'gatsby-background-image';
import { Link } from 'gatsby';
import cx from 'classnames';
import * as styles from './Products.module.sass';
import Button from '../../layout/Button/Button';

const Products = ({ products }) => {
  const [allProducts, setProducts] = useState(products);

  console.log('All products: ', allProducts);

  const filters = [];
  const prepareFilters = () => {
    const temp = [...products.map((product) => product.data)];
    setProducts(temp);
    products.forEach(({ tags }) => filters.push(...tags));
    console.log(allProducts);
  };

  prepareFilters();

  // const filterPipe = (key) => {
  //   console.log(key);
  //   setFilters([]);
  //   key === 'all'
  //     ? prepareFilters()
  //     : setFilters([...products.filter((item) => item.tags.includes(key))]);
  //   // console.log(filters);
  // };

  return (
    <div className={styles.productsComponentWrap}>
      <div className={cx(styles.filterWrap)}>
        <div className={cx(styles.wrap, 'wrap')}>
          <Button
            className={styles.button}
            sm
            // onClick={() => filterPipe('all')}
          >
            Wszystko
          </Button>
          {[...new Set(filters)].map((filter, i) => (
            <Button
              key={i}
              type="button"
              className={styles.button}
              sm
              // onClick={() => filterPipe(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>
      </div>
      <div className={styles.productsWrap}>
        {allProducts.map(
          ({
            miniature_title: { text: title },
            miniature_description: { text: description },
            miniature: { fluid: miniature },
          }) => (
            <Link to="/" className={styles.product}>
              <p className={styles.title}>{title}</p>
              <p className={styles.description}>{description}</p>
              <BackgroundImage
                Tag="div"
                className={styles.miniature}
                fluid={miniature}
              />
            </Link>
          )
        )}
      </div>
    </div>
  );
};

Products.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      tags: PropTypes.arrayOf(PropTypes.string),
      data: PropTypes.shape({
        miniature_title: PropTypes.shape({
          text: PropTypes.string,
        }),
        miniature_description: PropTypes.shape({
          text: PropTypes.string,
        }),
      }),
    })
  ).isRequired,
};

export default Products;

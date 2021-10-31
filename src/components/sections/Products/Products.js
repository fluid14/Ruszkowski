import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import BackgroundImage from 'gatsby-background-image';
import { Link } from 'gatsby';
import cx from 'classnames';
import slugify from 'slugify';
import * as styles from './Products.module.sass';
import Button from '../../layout/Button/Button';

const Products = ({ products, defaultType }) => {
  const [allProducts, setProducts] = useState(products);
  const [count, setCount] = useState(8);

  useEffect(() => {
    if (defaultType) {
      setProducts([
        ...products.filter((item) =>
          item.tags
            .map((tag) => tag.toUpperCase())
            .includes(defaultType.toUpperCase())
        ),
      ]);
    }
  }, []);

  const addProducts = () => {
    setCount(count + 4);
  };

  const filters = [];
  products.forEach(({ tags }) => filters.push(...tags));

  const filterPipe = (key) => {
    key !== 'all'
      ? setProducts([
          ...products.filter((item) =>
            item.tags
              .map((tag) => tag.toUpperCase())
              .includes(key.toUpperCase())
          ),
        ])
      : setProducts(products);

    setCount(8);
  };

  return (
    <div className={styles.productsComponentWrap}>
      <div className={cx(styles.filterWrap)}>
        <div className={cx(styles.wrap, 'wrap')}>
          <Button
            className={styles.button}
            sm
            onClick={() => filterPipe('all')}
          >
            Wszystko
          </Button>
          {[...new Set(filters)].map((filter, i) => (
            <Button
              key={i}
              type="button"
              className={styles.button}
              sm
              onClick={() => filterPipe(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>
      </div>
      <div className={styles.productsWrap}>
        {allProducts.map(
          (
            {
              url,
              data: {
                miniature_title: { text: title },
                miniature_description: { text: description },
                miniature: { fluid: miniature },
                product_title: { text: productTitle },
              },
            },
            i
          ) => {
            if (i < count) {
              return (
                <Link
                  to={`${url}/${slugify(productTitle, {
                    lower: true,
                  })}`}
                  key={i}
                  className={styles.product}
                >
                  <p className={styles.title}>{title}</p>
                  <p className={styles.description}>{description}</p>
                  <BackgroundImage
                    Tag="div"
                    className={styles.miniature}
                    fluid={miniature}
                  />
                </Link>
              );
            }
          }
        )}
      </div>
      {allProducts.length > count && (
        <div className={styles.buttonWrap}>
          <Button onClick={addProducts}>Więcej produktów</Button>
        </div>
      )}
    </div>
  );
};

Products.propTypes = {
  defaultType: PropTypes.string,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      tags: PropTypes.arrayOf(PropTypes.string),
      url: PropTypes.string,
      data: PropTypes.shape({
        miniature_title: PropTypes.shape({
          text: PropTypes.string,
        }),
        miniature_description: PropTypes.shape({
          text: PropTypes.string,
        }),
        product_title: PropTypes.shape({
          text: PropTypes.string,
        }),
      }),
    })
  ).isRequired,
};

Products.defaultProps = {
  defaultType: null,
};

export default Products;

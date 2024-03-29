const path = require(`path`);
const slugify = require(`slugify`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  // Articles blog
  const query = await graphql(`
    query MyQuery {
      allPrismicMainPage {
        nodes {
          url
          type
          lang
          id
        }
      }
      allPrismicArticle {
        nodes {
          url
          lang
          id
          data {
            article_title {
              text
            }
          }
        }
      }
      allPrismicBlogPage {
        nodes {
          url
          lang
          id
        }
      }
      allPrismicRealizationsPage {
        nodes {
          url
          lang
          id
        }
      }
      allPrismicAboutUsPage {
        nodes {
          id
          url
          lang
        }
      }
      allPrismicProducts {
        nodes {
          url
          lang
          id
        }
      }
      allPrismicProduct {
        nodes {
          url
          lang
          id
          data {
            product_title {
              text
            }
          }
        }
      }
    }
  `);

  query.data.allPrismicMainPage.nodes.forEach((mainPage) => {
    createPage({
      path: mainPage.url,
      component: path.resolve(`./src/layouts/index/index.js`),
      context: {
        id: mainPage.id,
        lang: mainPage.lang,
      },
    });
  });

  query.data.allPrismicBlogPage.nodes.forEach((blog) => {
    createPage({
      path: blog.url,
      component: path.resolve(`./src/layouts/blog/blog.js`),
      context: {
        id: blog.id,
        lang: blog.lang,
      },
    });
  });

  query.data.allPrismicArticle.nodes.forEach((article) => {
    const title = slugify(article.data.article_title.text, {
      lower: true,
    });

    createPage({
      path: `${article.url}/${title}`,
      component: path.resolve(`./src/layouts/article/article.js`),
      context: {
        id: article.id,
        lang: article.lang,
      },
    });
  });

  query.data.allPrismicRealizationsPage.nodes.forEach((realizations) => {
    createPage({
      path: realizations.url,
      component: path.resolve(`./src/layouts/realizations/realizations.js`),
      context: {
        id: realizations.id,
        lang: realizations.lang,
      },
    });
  });

  query.data.allPrismicAboutUsPage.nodes.forEach((about) => {
    createPage({
      path: about.url,
      component: path.resolve(`./src/layouts/aboutUs/aboutUs.js`),
      context: {
        id: about.id,
        lang: about.lang,
      },
    });
  });

  query.data.allPrismicProducts.nodes.forEach((products) => {
    createPage({
      path: products.url,
      component: path.resolve(`./src/layouts/products/products.js`),
      context: {
        id: products.id,
        lang: products.lang,
      },
    });
  });

  query.data.allPrismicProduct.nodes.forEach((product) => {
    const title = slugify(product.data.product_title.text, {
      lower: true,
    });

    createPage({
      path: `${product.url}/${title}`,
      component: path.resolve(`./src/layouts/product/product.js`),
      context: {
        id: product.id,
        lang: product.lang,
      },
    });
  });
};

const path = require(`path`);
const slugify = require(`slugify`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  // Articles blog
  const articles = await graphql(`
    query MyQuery {
      allPrismicArticle {
        edges {
          node {
            id
            data {
              article_title {
                text
              }
              body {
                ... on PrismicArticleDataBodyParagraf {
                  id
                  items {
                    paragraph {
                      html
                    }
                  }
                }
                ... on PrismicArticleDataBodyZdjecie {
                  id
                  items {
                    photo {
                      alt
                      fluid {
                        srcSet
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `);

  articles.data.allPrismicArticle.edges.forEach((article) => {
    const title = slugify(article.node.data.article_title.text, {
      lower: true,
    });
    createPage({
      path: `/artykul/${title}`,
      component: path.resolve(`./src/layouts/article.js`),
      context: {
        id: article.id,
      },
    });
  });
};

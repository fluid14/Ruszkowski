const path = require(`path`);
const slugify = require(`slugify`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  // Articles blog
  const blogArticleTemplate = path.resolve(`src/layouts/article.js`);
  const articles = await graphql(`
    query MyQuery {
      allPrismicArticle {
        nodes {
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
  `);

  articles.data.allPrismicArticle.nodes.forEach((article) => {
    console.log(article);
    const slugifiedTitle = slugify(article.title, {
      lower: true,
    });
    createPage({
      path: `artykul/${slugifiedTitle}`,
      component: blogArticleTemplate,
      context: {
        id: article.id,
      },
    });
  });
};

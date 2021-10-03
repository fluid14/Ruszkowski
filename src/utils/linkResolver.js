exports.linkResolver = (doc) => {
  switch (doc.type) {
    case 'blog_page': {
      return `/${doc.lang}/blog`;
    }
    case 'article': {
      return `/${doc.lang}/article`;
    }

    case 'main_page': {
      return `/${doc.lang}`;
    }

    default:
      return `/${doc.lang}`;
  }
};

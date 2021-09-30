exports.linkResolver = (doc) => {
  switch (doc.type) {
    case 'blog': {
      return `/${doc.lang}`;
    }
    case 'page': {
      return `/${doc.lang}`;
    }
    case 'artykul': {
      xw;
      return `/${doc.lang}/artykul/${doc.uid}`;
    }

    default:
      return `/${doc.lang}`;
  }
};

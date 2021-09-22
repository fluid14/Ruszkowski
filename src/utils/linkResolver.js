exports.linkResolver = (doc) => {
  switch (doc.type) {
    case 'blog': {
      return `/${doc.lang}`;
    }

    default:
      return '/';
  }
};

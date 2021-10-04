exports.linkResolver = (doc) => {
  const mapLang = (lang) => lang.slice(0, -3);
  switch (doc.type) {
    case 'blog_page': {
      return doc.lang === 'pl' ? '/blog' : `/${mapLang(doc.lang)}/blog`;
    }
    case 'article': {
      return doc.lang === 'pl' ? '/article' : `/${mapLang(doc.lang)}/article`;
    }

    case 'main_page': {
      return doc.lang === 'pl' ? '/' : `/${mapLang(doc.lang)}`;
    }

    default:
      return doc.lang === 'pl' ? '/' : `/${mapLang(doc.lang)}`;
  }
};

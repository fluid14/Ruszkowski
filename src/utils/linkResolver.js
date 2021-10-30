exports.linkResolver = (doc) => {
  const mapLang = (lang) => lang.slice(0, -3);
  switch (doc.type) {
    case 'blog_page': {
      return doc.lang === 'pl' ? '/blog' : `/${mapLang(doc.lang)}/blog`;
    }
    case 'article': {
      return doc.lang === 'pl' ? '/artykul' : `/${mapLang(doc.lang)}/article`;
    }

    case 'main_page': {
      return doc.lang === 'pl' ? '/' : `/${mapLang(doc.lang)}`;
    }

    case 'realizations_page': {
      return doc.lang === 'pl'
        ? '/wspolpraca'
        : `/${mapLang(doc.lang)}/realizations`;
    }

    case 'about_us_page': {
      return doc.lang === 'pl' ? '/o-nas' : `/${mapLang(doc.lang)}/about`;
    }

    case 'products': {
      return doc.lang === 'pl' ? '/produkty' : `/${mapLang(doc.lang)}/products`;
    }

    case 'product': {
      return doc.lang === 'pl' ? '/produkt' : `/${mapLang(doc.lang)}/product`;
    }

    default:
      return doc.lang === 'pl' ? '/' : `/${mapLang(doc.lang)}`;
  }
};

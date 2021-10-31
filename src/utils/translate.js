export const translate = (toLang, toTranslate) =>
  toTranslate.filter(({ lang }) => lang === toLang)[0].data;

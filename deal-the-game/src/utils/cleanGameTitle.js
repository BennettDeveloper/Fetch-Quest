export const cleanGameTitle = (title = '') => {
  return title
    .replace(/Deluxe Edition/gi, '')
    .replace(/Ultimate Edition/gi, '')
    .replace(/Complete Edition/gi, '')
    .replace(/Gold Edition/gi, '')
    .replace(/Definitive Edition/gi, '')
    .replace(/Game of the Year Edition/gi, '')
    .replace(/GOTY Edition/gi, '')
    .replace(/Bundle/gi, '')
    .replace(/Edition/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
};
export const setTitle = (title, useTemplate = true) => {
  const pageTitle = useTemplate ? `${title} | Zikra` : title;

  document.title = pageTitle;
};

export const createAdoptedStyleSheet = (styles) => {
  const styleSheet = new CSSStyleSheet();
  styleSheet.replaceSync(styles);

  return styleSheet;
};

export const adoptStyleSheet = (shadowRoot, styleSheet) => {
  shadowRoot.adoptedStyleSheets = [
    ...shadowRoot.adoptedStyleSheets,
    styleSheet,
  ];
};

/**
 *
 * @param {HTMLElement} element
 * @param {string} attributeName
 */
export const getIntAttribute = (element, attributeName) =>
  Number.parseInt(element.getAttribute(attributeName));

/**
 *
 * @param {HTMLElement} element
 * @param {string} attributeName
 */
export const getFloatAttribute = (element, attributeName) =>
  Number.parseFloat(element.getAttribute(attributeName));

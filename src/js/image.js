/**
 * @param {Image} image
 */
const getImageAspectRatio = (image) => {
  if (!image.height) {
    return 0;
  }
  return image.width / image.height;
};

/**
 *
 * @param {number} maxWidth
 * @param {number} maxHeight
 * @returns
 */
export const resizeImage =
  (maxWidth, maxHeight) =>
  /**
   *
   * @param {Image} image
   */
  (image) => {
    const aspectRatio = getImageAspectRatio(image);

    if (!aspectRatio) {
      return;
    }

    if (maxWidth < image.width) {
      image.width = maxWidth;
      image.height = image.width / aspectRatio;
    }

    if (maxHeight < image.height) {
      image.height = maxHeight;
      image.width = image.height * aspectRatio;
    }
  };

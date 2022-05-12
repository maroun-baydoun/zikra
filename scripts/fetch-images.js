import "dotenv/config";
import fs from "fs";
import path from "path";
import fetch from "node-fetch";

const { FLICKR_API_KEY } = process.env;

const FLICKR_API_ENDPOINT = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${FLICKR_API_KEY}&user_id=97286397%40N07&tags=memory&extras=url_l%2C+url_m%2C+path_alias&format=json&nojsoncallback=1`;

const makeApiRequest = async () => {
  return await fetch(FLICKR_API_ENDPOINT).then((response) => response.json());
};

const parseResponse = (response) => {
  const {
    photos: { page, pages, total, photo },
  } = response;

  return photo.map(({ id, title, url_l, url_m, pathalias }) => ({
    id,
    title,
    urlLarge: url_l,
    urlMedium: url_m,
    flickrUrl: `https://www.flickr.com/photos/${pathalias}/${id}`,
  }));
};

const downloadImages = (parsedResponse) => {
  const imagesDirectoryPath = path.resolve("src", "img");

  parsedResponse.forEach((photo) => {
    const imageDirectoryPath = path.join(imagesDirectoryPath, photo.id);

    fs.mkdir(imageDirectoryPath, { recursive: true }, (error) => {
      if (error) {
        throw error;
      }

      fetch(photo.urlLarge).then((response) => {
        const largeImageFilePath = path.join(imageDirectoryPath, "large.jpg");
        return writeResponseToFile(response, largeImageFilePath);
      });

      fetch(photo.urlMedium).then((response) => {
        const mediumImageFilePath = path.join(imageDirectoryPath, "medium.jpg");
        return writeResponseToFile(response, mediumImageFilePath);
      });
    });
  });
};

const writeResponseToFile = (response, filePath) => {
  return response.body.pipe(fs.createWriteStream(filePath));
};

try {
  const response = await makeApiRequest();

  const parsedResponse = parseResponse(response);

  downloadImages(parsedResponse);
} catch (exception) {
  console.error(exception);
}

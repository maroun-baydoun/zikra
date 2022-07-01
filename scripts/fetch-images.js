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

const done = (total) => {
  let accumulator = 0;
  return (callback) => () => {
    accumulator++;
    if (accumulator === total) {
      callback();
    }
  };
};

const downloadImages = (parsedResponse) => {
  const imagesDirectoryPath = path.resolve("src", "img");

  const onDone = done(parseResponse.length)(() =>
    fs.readdir(imagesDirectoryPath, (error, existingPhotoIds) => {
      if (error) {
        throw error;
      }

      const responsePhotoIds = parsedResponse.map((photo) => photo.id);

      const photoIdsToDelete = existingPhotoIds.filter(
        (id) => !responsePhotoIds.includes(id)
      );

      photoIdsToDelete.forEach((id) => {
        const directoryPathToDelete = path.join(imagesDirectoryPath, id);

        fs.rm(
          directoryPathToDelete,
          { recursive: true, force: true },
          (error) => {
            if (error) {
              throw error;
            }
          }
        );
      });
    })
  );

  parsedResponse.forEach((photo) => {
    const imageDirectoryPath = path.join(imagesDirectoryPath, photo.id);

    fs.mkdir(
      imageDirectoryPath,
      { recursive: true },
      (error, createdDirPath) => {
        if (error) {
          throw error;
        }

        if (!createdDirPath) {
          fs.readdir(imageDirectoryPath, (error, files) => {
            if (error) {
              throw error;
            }

            Promise.all([
              ...(!files.includes("large.jpg")
                ? [
                    fetchAndWriteFile(
                      photo.urlLarge,
                      imageDirectoryPath,
                      "large.jpg"
                    ),
                  ]
                : []),

              ...(!files.includes("medium.jpg")
                ? [
                    fetchAndWriteFile(
                      photo.urlMedium,
                      imageDirectoryPath,
                      "medium.jpg"
                    ),
                  ]
                : []),
            ]).then(onDone);
          });
        } else {
          Promise.all([
            fetchAndWriteFile(photo.urlLarge, imageDirectoryPath, "large.jpg"),
            fetchAndWriteFile(
              photo.urlMedium,
              imageDirectoryPath,
              "medium.jpg"
            ),
          ]).then(onDone);
        }
      }
    );
  });
};

const fetchAndWriteFile = (url, directory, fileName) => {
  return fetch(url).then((response) => {
    const imageFilePath = path.join(directory, fileName);
    return writeResponseToFile(response, imageFilePath);
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

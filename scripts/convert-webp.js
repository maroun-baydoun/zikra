import sharp from "sharp";
import fs from "fs";
import path from "path";

const convertToWebp = () => {
  const imagesDirectoryPath = path.resolve("src", "img");

  fs.readdir(imagesDirectoryPath, (error, directories) => {
    if (error) {
      throw error;
    }

    directories.forEach((directory) => {
      const imageDirectoryPath = path.join(imagesDirectoryPath, directory);

      fs.readdir(imageDirectoryPath, (error, imageFiles) => {
        if (error) {
          throw error;
        }

        imageFiles.forEach((imageFile) => {
          const [imageFileName, imageFileExtension] = imageFile.split(".");

          if (imageFileExtension === "webp") {
            return;
          }

          const imagePath = path.join(
            imagesDirectoryPath,
            directory,
            imageFile,
          );

          const webpFilePath = path.join(
            imagesDirectoryPath,
            directory,
            `${imageFileName}.webp`,
          );

          const sharpImage = sharp(imagePath);

          sharpImage.metadata().then(({ width, height }) => {
            sharpImage
              .resize(Math.min(width, 600), Math.min(height, 900))
              .toFile(webpFilePath, (error) => {
                if (error) {
                  throw error;
                }
              });
          });
        });
      });
    });
  });
};

convertToWebp();

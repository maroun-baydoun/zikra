import fs from "fs";
import path from "path";

const imagesDirectoryPath = path.resolve("src", "img");
const jsFilePath = path.resolve("src", "js", "image-ids.js");

fs.readdir(imagesDirectoryPath, (error, files) => {
  if (error) {
    throw error;
  }

  const jsTemplate = `
export const IMAGE_IDS = ${JSON.stringify(files)};`;

  fs.writeFile(jsFilePath, jsTemplate, "utf-8", (error) => {
    if (error) {
      throw error;
    }
  });
});

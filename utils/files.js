"use strict";
const path = require("path");
const fs = require("fs-extra");

const existsAsync = fs.pathExists;
const makeDirectoryAsync = fs.mkdir;
const readFileAsync = fs.readFile;
const writeFileAsync = fs.writeFile;

const ensureDirectoryExists = async (directory) => {
  try {
    await makeDirectoryAsync(directory, { recursive: true });
  } catch (err) {
    console.log(err);
  }
};

const writeFile = async (filePath, data) => {
  await ensureDirectoryExists(path.dirname(filePath));
  await writeFileAsync(filePath, data);
};

const writeJSONFile = async (filePath, data) => {
  await writeFile(filePath, JSON.stringify(data, null, 2));
};

const parseFile = async (filePath) => {
  if (await existsAsync(filePath)) {
    const contents = await readFileAsync(filePath);
    return JSON.parse(contents.toString());
  }

  return null;
};

const deleteFolderRecursive = (directoryPath) => {
  if (fs.existsSync(directoryPath)) {
    fs.readdirSync(directoryPath).forEach((file) => {
      const curPath = path.join(directoryPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(directoryPath);
  }
};

module.exports = {
  ensureDirectoryExists,
  writeFile,
  writeJSONFile,
  parseFile,
  deleteFolderRecursive,
};

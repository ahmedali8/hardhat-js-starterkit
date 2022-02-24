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

const ensureDirectory = async (directory) => {
  ensureDirectoryExists(directory);
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

module.exports = {
  ensureDirectory,
  writeFile,
  writeJSONFile,
  parseFile,
};

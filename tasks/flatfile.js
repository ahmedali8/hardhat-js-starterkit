const { task } = require("hardhat/config");
const path = require("path");
const { execSync } = require("child_process");
const { pascalCase } = require("../utils/string.js");
const { ensureDirectoryExists, writeFile } = require("../utils/files");

// e.g. npx hardhat flatfile --contract TestingContract
task("flatfile", "Creates a flattened sol file")
  .addParam("contract", "Contract name")
  .setAction(async (taskArgs) => {
    const { contract } = taskArgs;

    const output = execSync(
      `npx hardhat flatten contracts/${contract}.sol`
    ).toString();
    console.log(output);

    const filename = pascalCase(contract);
    let outputFileName = path.join(
      process.cwd(),
      `./flattened/${filename}.txt`
    );
    ensureDirectoryExists(path.dirname(outputFileName));
    await writeFile(outputFileName, output);

    console.log(`Flattened file export done!`);
  });

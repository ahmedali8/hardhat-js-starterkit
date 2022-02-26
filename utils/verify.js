"use strict";

const { run } = require("hardhat");
const { delayLog } = require("./misc");

async function waitForConfirmations(tx, waitConfirmations = 5) {
  if (!tx) return;
  console.log(`waiting for ${waitConfirmations} confirmations ...`);
  await tx.wait(waitConfirmations);
}

/**
 * Programmatically verify a contract
 * @param {*} contractName contract name in string
 * @param {*} contractAddress contract address in string
 * @param {*} args constructor args in array
 * @param delay delay time in ms
 */
async function verifyContract({
  contractName,
  contractAddress,
  args = [],
  delay = 60_000,
}) {
  await delayLog(delay);

  await run("verify:verify", {
    address: contractAddress,
    constructorArguments: args,
    contract: `contracts/${contractName}.sol:${contractName}`,
  });
}

module.exports = {
  waitForConfirmations,
  verifyContract,
};

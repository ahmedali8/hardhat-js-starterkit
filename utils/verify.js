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
 * @param {*} contractPath contract name in string e.g. `contracts/${contractName}.sol:${contractName}`
 * @param {*} contractAddress contract address in string
 * @param {*} args constructor args in array
 * @param delay delay time in ms
 */
async function verifyContract({
  contractPath,
  contractAddress,
  args = [],
  delay = 60_000,
}) {
  await delayLog(delay);

  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
      contract: contractPath,
    });
  } catch (error) {
    if (error.message.toLowerCase().includes("already verified")) {
      console.log("Already verified!");
    } else {
      console.log(error);
    }
  }
}

module.exports = {
  waitForConfirmations,
  verifyContract,
};

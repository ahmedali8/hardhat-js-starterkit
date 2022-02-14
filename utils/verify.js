const { ethers, run } = require("hardhat");
const { delayLog } = require("./index");

async function waitForConfirmations(tx, confirmations = 5) {
  const { hash } = tx;
  console.log(`waiting for ${confirmations} confirmations ...`);
  await ethers.provider.waitForTransaction(hash, confirmations);
}

async function verifyContract(
  contractAddress,
  tx,
  args = [],
  options = { ms: 60_000, doConfirmation: true, confirm: 5 }
) {
  const { ms, doConfirmation, confirm } = options;
  doConfirmation && waitForConfirmations(tx, confirm);
  await delayLog(ms);

  await run("verify:verify", {
    address: contractAddress,
    constructorArguments: args,
  });
}

module.exports = {
  waitForConfirmations,
  verifyContract,
};

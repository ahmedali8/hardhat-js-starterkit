const { ethers, run } = require("hardhat");
const { delayLog } = require("./index");

async function waitForConfirmations(tx, confirmations = 5) {
  if (!tx) return;
  const { hash } = tx;
  console.log(`waiting for ${confirmations} confirmations ...`);
  await ethers.provider.waitForTransaction(hash, confirmations);
}

/**
 * Programmatically verify a contract
 * @param {*} contractAddress contract address in string
 * @param {*} args constructor args in array
 * @param tx optional tx
 * @param options optionally set {ms, doConfirmation, confirm}
 */
async function verifyContract(
  contractAddress,
  args = [],
  tx,
  options = { ms: 60_000, doConfirmation: true, confirm: 5 }
) {
  const { ms, doConfirmation, confirm } = options;
  // wait for confirmation if tx is available
  if (doConfirmation && tx) waitForConfirmations(tx, confirm);
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

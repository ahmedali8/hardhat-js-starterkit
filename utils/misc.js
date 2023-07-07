const {
  computeAddress,
  getAddress,
  solidityPackedKeccak256,
} = require("ethers");

const { fromWei, toGwei } = require("./format");

/**
 * Asynchronously sleeps for the specified number of milliseconds.
 *
 * @param ms - The number of milliseconds to sleep.
 * @returns A promise that resolves after the specified time.
 */
async function sleep(ms) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Asynchronously logs a message and waits for the specified number of milliseconds.
 *
 * @param ms - The number of milliseconds to wait.
 */
async function delayLog(ms) {
  console.log(`Waiting for ${ms / 1000}s...`);
  await sleep(ms);
}

/**
 * Checks if the provided address is valid and returns the checksummed address if valid.
 * Otherwise, returns false.
 *
 * @param value - The address to be checked.
 * @returns The checksummed address if valid, or false.
 */
function isAddress(value) {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

/**
 * Creates a random checksummed address using the provided salt.
 *
 * @param salt - The salt to generate the address.
 * @returns The checksummed address.
 */
function createRandomChecksumAddress(salt) {
  const signerAddress = computeAddress(
    solidityPackedKeccak256(["string"], [salt])
  );
  const checkSummedSignerAddress = getAddress(signerAddress);
  return checkSummedSignerAddress;
}

/**
 * Retrieves necessary gas information of a transaction.
 *
 * @param tx - The transaction response (e.g., contract deployment or executed transaction).
 * @returns A string containing gas information or null if the transaction is falsy or unsuccessful.
 */
async function getExtraGasInfo(tx) {
  if (!tx) {
    return null;
  }

  const gasPrice = tx.gasPrice;
  const gasUsed = tx.gasLimit * gasPrice;
  const txReceipt = await tx.wait();

  if (!txReceipt) {
    return null;
  }

  const gas = txReceipt.gasUsed;
  const extraGasInfo = `${toGwei(gasPrice)} gwei, ${fromWei(
    gasUsed
  )} ETH, ${gas} gas, txHash: ${tx.hash}`;

  return extraGasInfo;
}

module.exports = {
  sleep,
  delayLog,
  isAddress,
  createRandomChecksumAddress,
  getExtraGasInfo,
};

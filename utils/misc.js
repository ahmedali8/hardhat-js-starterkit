"use strict";

const { getAddress } = require("@ethersproject/address");
const { keccak256 } = require("@ethersproject/solidity");
const { computeAddress } = require("@ethersproject/transactions");
const { toGwei, fromWei } = require("./format");

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
async function delayLog(ms) {
  console.log(`waiting for ${ms / 1000}s...`);
  await delay(ms);
}

/**
 * returns the checksummed address if the address is valid,
 * otherwise returns false
 */
function isAddress(value) {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

function createRandomChecksumAddress(salt) {
  const signerAddress = computeAddress(keccak256(["string"], [salt]));
  const checkSummedSignerAddress = getAddress(signerAddress);
  return checkSummedSignerAddress;
}

/**
 * Get necessary Gas information of a transaction.
 * @param {*} tx transaction response if contract deployed
 * or other transaction executed
 * @returns null or information string
 */
async function getExtraGasInfo(tx) {
  if (!tx) return;
  const gasPrice = tx.gasPrice;
  const gasUsed = tx.gasLimit.mul(gasPrice);
  const txReceipt = await tx.wait();
  const gas = txReceipt.gasUsed;

  const extraGasInfo = `${toGwei(gasPrice)} gwei, ${fromWei(
    gasUsed
  )} ETH, ${gas} gas,
  txHash ${tx.hash}`;

  return extraGasInfo;
}

module.exports = {
  delay,
  delayLog,
  isAddress,
  createRandomChecksumAddress,
  getExtraGasInfo,
};

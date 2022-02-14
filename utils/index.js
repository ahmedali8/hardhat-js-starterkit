const { ethers } = require("hardhat");
const { getAddress } = require("@ethersproject/address");
const { toWei, toGwei } = require("./format");

function log(message, val) {
  console.log(`${message} >>> `, val);
}

function logString(message, val) {
  console.log(`${message} >>> `, val.toString());
}

async function logGas(tx, message = "") {
  console.log(
    `${message} tx done at gasPrice: ${await getTxGasPrice(
      tx
    )} gwei & gasUsed: ${await getTxGasUsed(tx)} gas`
  );
}

async function etherBalance(addr) {
  return await ethers.provider.getBalance(addr);
}

/**
 * returns the checksummed address if the address is valid, otherwise returns false
 */
function isAddress(value) {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

async function getTxGasUsed(tx) {
  return (await tx.wait()).gasUsed.toString();
}

async function getTxGasPrice(tx) {
  return toGwei(tx.gasPrice);
}

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
async function delayLog(ms) {
  console.log(`waiting for ${ms / 1000}s...`);
  await delay(ms);
}

module.exports = {
  log,
  logString,
  logGas,
  toWei,
  toGwei,
  etherBalance,
  isAddress,
  getTxGasUsed,
  getTxGasPrice,
  delay,
  delayLog,
};

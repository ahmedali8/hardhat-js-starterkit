const { BigNumber } = require("@ethersproject/bignumber");
const hre = require("hardhat");

function log(str, val) {
  console.log(`${str} >>> `, val);
}

function logString(str, val) {
  console.log(`${str} >>> `, val.toString());
}

async function logGas(tx, str = "") {
  console.log(
    `${str} tx done at gasPrice: ${await getTxGasPrice(
      tx
    )} gwei & gasUsed: ${await getTxGasUsed(tx)} gas`
  );
}

function toWei(n) {
  return ethers.utils.parseEther(n);
}

function toWeiString(n) {
  return toWei(n).toString();
}

function toGwei(gasPrice) {
  return ethers.utils.formatUnits(gasPrice, "gwei");
}

function fromWei(n) {
  return n.div(BigNumber.from("1000000000000000000"));
}

function fromWeiToString(n) {
  return ethers.utils.formatUnits(n, "ether");
}

function toBN(n) {
  return BigNumber.from(n);
}

async function etherBalance(addr) {
  return await ethers.provider.getBalance(addr);
}

async function etherBalanceString(addr) {
  return fromWeiToString(await etherBalance(addr));
}

function isAddress(addr) {
  return ethers.utils.isAddress(addr);
}

async function getContractAt(contract, address) {
  return await ethers.getContractAt(contract, address);
}

async function getContractInstance(contract, address) {
  return await ethers.getContractAt(contract, address);
}

async function deployContract(signer, contractName, args = []) {
  const Contract = await ethers.getContractFactory(contractName);
  const contract = await Contract.connect(signer).deploy(...args);
  await contract.deployed;
  return contract;
}

function calculatePercentage(bn, percent) {
  return bn.mul(percent).div("100");
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

async function waitForConfirmations(tx, confirmations = 5) {
  const { hash } = tx;
  console.log(`waiting for ${confirmations} confirmations ...`);
  await ethers.provider.waitForTransaction(hash, confirmations);
}

async function verifyContract(
  contractAddress,
  args = [],
  tx,
  options = { ms: 60000, doConfirmation: true, confirm: 5 }
) {
  const { ms, doConfirmation, confirm } = options;
  doConfirmation && waitForConfirmations(tx, confirm);
  await delayLog(ms);

  await hre.run("verify:verify", {
    address: contractAddress,
    constructorArguments: args,
  });
}

module.exports = {
  log,
  logString,
  logGas,
  toWei,
  toWeiString,
  toGwei,
  fromWei,
  fromWeiToString,
  toBN,
  etherBalance,
  etherBalanceString,
  isAddress,
  getContractAt,
  getContractInstance,
  deployContract,
  calculatePercentage,
  getTxGasUsed,
  getTxGasPrice,
  waitForConfirmations,
  verifyContract,
  delay,
  delayLog,
};

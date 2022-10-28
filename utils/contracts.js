"use strict";

const chalk = require("chalk");
const { ethers } = require("hardhat");
const { fromWei } = require("./format");
const { getExtraGasInfo } = require("./misc");

/**
 * Call function before deploying contract.
 * @param {*} obj
 * @param {*} obj.signerAddress string Address of signer
 * @param {*} obj.contractName string Name of Contract
 */
async function preDeployConsole({ signerAddress, contractName }) {
  const { chainId, name } = await ethers.provider.getNetwork();
  const ethBalance = await ethers.provider.getBalance(signerAddress);

  console.log(
    ` 🛰  Deploying: ${chalk.cyan(
      contractName
    )} to Network: ${name} & ChainId: ${chainId}`
  );
  console.log(
    ` 🎭 Deployer: ${chalk.cyan(signerAddress)}, Balance: ${chalk.grey(
      fromWei(ethBalance ?? 0)
    )} ETH`
  );
}

/**
 *
 * @param {*} obj
 * @param {*} obj.contractName string Name of Contract
 * @param {*} obj.contract Contract Instance of Contract
 * @returns contract instance
 */
async function postDeployConsole({ contractName, contract }) {
  await contract.deployed();

  let extraGasInfo = "";
  if (contract && contract.deployTransaction) {
    extraGasInfo = (await getExtraGasInfo(contract.deployTransaction)) ?? "";
  }

  console.log(
    " 📄",
    chalk.cyan(contractName),
    "deployed to:",
    chalk.magenta(contract.address)
  );
  console.log(" ⛽", chalk.grey(extraGasInfo));
  return contract;
}

module.exports = {
  preDeployConsole,
  postDeployConsole,
};

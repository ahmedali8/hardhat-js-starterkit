"use strict";

const chalk = require("chalk");
const { ethers } = require("hardhat");
const { fromWei } = require("./format");
const { getExtraGasInfo } = require("./misc");

/**
 * Logs information about the signer, network, and balance before deploying a contract.
 *
 * @param {*} obj
 * @param {*} obj.signerAddress string - The address of the signer.
 * @param {*} obj.contractName string - The name of the contract to be deployed.
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
 * Logs information about the deployment of a contract.
 *
 * @param {*} obj
 * @param {*} obj.contractName string - The name of the deployed contract.
 * @param {*} obj.contract BaseContract - The contract instance.
 * @returns contract instance
 */
async function postDeployConsole({ contractName, contract }) {
  // Wait for the contract to be deployed
  await contract.waitForDeployment();

  // Get extra gas information of the deployment transaction
  let extraGasInfo = "";
  const deploymentTransaction = contract.deploymentTransaction();
  if (deploymentTransaction) {
    extraGasInfo = (await getExtraGasInfo(deploymentTransaction)) ?? "";
  }
  const contractAddress = await contract.getAddress();

  // Log the deployment information
  console.log(
    " 📄",
    chalk.cyan(contractName),
    "deployed to:",
    chalk.magenta(contractAddress)
  );
  console.log(" ⛽", chalk.grey(extraGasInfo));

  return contract;
}

module.exports = {
  preDeployConsole,
  postDeployConsole,
};

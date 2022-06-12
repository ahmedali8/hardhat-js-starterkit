"use strict";

const chalk = require("chalk");
const { ethers } = require("hardhat");
const { fromWei } = require("./format");
const { getExtraGasInfo } = require("./misc");
const { getContractAt, getContractFactory } = ethers;

async function getContractIns(contract, address) {
  return await getContractAt(contract, address);
}

async function deployContract({
  signer,
  contractName,
  args = [],
  overrides = {},
  libraries = {},
}) {
  const { chainId, name } = await ethers.provider.getNetwork();
  console.log(
    ` 🛰  Deploying: ${chalk.cyan(
      contractName
    )} to Network: ${name} & ChainId: ${chainId}`
  );
  console.log(
    ` 🎭 Deployer: ${chalk.cyan(signer.address)}, Balance: ${chalk.grey(
      fromWei(await ethers.provider.getBalance(signer.address))
    )} ETH`
  );

  const contractArtifacts = await getContractFactory(contractName, {
    libraries: libraries,
  });
  const contract = await contractArtifacts
    .connect(signer)
    .deploy(...args, overrides);
  await contract.deployed();

  let extraGasInfo = "";
  if (contract && contract.deployTransaction) {
    extraGasInfo = await getExtraGasInfo(contract.deployTransaction);
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
  getContractIns,
  deployContract,
};

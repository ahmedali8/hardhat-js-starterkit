"use strict";

const chalk = require("chalk");
const { ethers } = require("hardhat");
const { fromWei, abiEncodeArgs } = require("./format");
const { etherBalance, getExtraGasInfo } = require("./misc");
const { writeFile } = require("./files");
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
      fromWei(await etherBalance(signer.address))
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

  const encoded = abiEncodeArgs(contract, args);
  if (!encoded || encoded.length <= 2) return contract;
  await writeFile(`artifacts/${contractName}.address`, contract.address);
  await writeFile(`artifacts/${contractName}.args`, encoded.slice(2));

  // await tenderly.persistArtifacts({
  //   name: contractName,
  //   address: contract.address,
  // });

  return contract;
}

module.exports = {
  getContractIns,
  deployContract,
};

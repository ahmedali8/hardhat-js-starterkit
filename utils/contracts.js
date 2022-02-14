const { ethers } = require("hardhat");
const { getContractAt, getContractFactory } = ethers;

async function getContractIns(contract, address) {
  return await getContractAt(contract, address);
}

async function deployContract(signer, contractName, args = []) {
  const Contract = await getContractFactory(contractName);
  const contract = await Contract.connect(signer).deploy(...args);
  await contract.deployed();
  return contract;
}

module.exports = {
  getContractIns,
  deployContract,
};

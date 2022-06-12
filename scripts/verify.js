"use strict";

const { ethers } = require("hardhat");
const { toWei } = require("../utils/format");
const { verifyContract } = require("../utils/verify");

async function main() {
  const { chainId } = await ethers.provider.getNetwork();

  const contractName = "Token";
  const contractPath = `contracts/${contractName}.sol:${contractName}`;
  const contractAddress = "";
  const args = [
    "TokenName",
    "TCT",
    toWei("6000000"),
    "0xde43f899587aaa2Ea6aD243F3d68a5027F2C6a94",
  ];

  // You don't want to verify on localhost
  if (chainId != 31337 && chainId != 1337) {
    await verifyContract({
      contractPath,
      contractAddress,
      args,
    });
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

"use strict";

const { ethers } = require("hardhat");
const { verifyContract } = require("../utils/verify");

async function main() {
  const { chainId } = await ethers.provider.getNetwork();

  const contractName = "TestingContract";
  const contractAddress = "";
  const args = [];

  // You don't want to verify on localhost
  if (chainId != 31337 && chainId != 1337) {
    await verifyContract({
      contractName,
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

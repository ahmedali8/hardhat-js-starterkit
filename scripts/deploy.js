"use strict";

const { ethers } = require("hardhat");
const { preDeployConsole, postDeployConsole } = require("../utils/contracts");
const { toWei } = require("../utils/format");
const { verifyContract } = require("../utils/verify");

async function main() {
  const { chainId } = await ethers.provider.getNetwork();
  const [owner] = await ethers.getSigners();

  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  const lockedAmount = toWei("1");

  const CONTRACT_NAME = "Lock";

  await preDeployConsole({
    signerAddress: owner.address,
    contractName: CONTRACT_NAME,
  });
  const LockFactory = await ethers.getContractFactory(CONTRACT_NAME);
  let lock = await LockFactory.connect(owner).deploy(unlockTime, {
    value: lockedAmount,
  });
  lock = await postDeployConsole({
    contractName: CONTRACT_NAME,
    contract: lock,
  });

  console.log(
    `Lock with 1 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`
  );

  // You don't want to verify on localhost
  // uncomment below code to programmatically verify contract
  try {
    if (chainId != 31337 && chainId != 1337) {
      const contractPath = `contracts/${CONTRACT_NAME}.sol:${CONTRACT_NAME}`;
      await verifyContract({
        contractPath: contractPath,
        contractAddress: lock.address,
        args: [unlockTime],
      });
    }
  } catch (error) {
    console.log(error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

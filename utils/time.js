"use strict";

const { ethers } = require("hardhat");

/**
 * Increases time of evm blockchain for tests.
 * @param {*} timeInSeconds number - number of seconds to increase.
 */
export async function increaseTime(timeInSeconds) {
  await ethers.provider.send("evm_increaseTime", [timeInSeconds]);
  await ethers.provider.send("evm_mine", []);
}

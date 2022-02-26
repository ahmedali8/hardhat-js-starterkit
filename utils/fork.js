const { network } = require("hardhat");

async function resetHardhat() {
  await network.provider.request({
    method: "hardhat_reset",
    params: [],
  });
}

async function impersonateAccounts(accountsToImpersonate = []) {
  await network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [...accountsToImpersonate],
  });
}
async function getImpersonatingSigner(accountToImpersonate = "") {
  await impersonateAccounts([accountToImpersonate]);
  const signer = await ethers.getSigner(accountToImpersonate);
  return signer;
}

module.exports = {
  resetHardhat,
  impersonateAccounts,
  getImpersonatingSigner,
};

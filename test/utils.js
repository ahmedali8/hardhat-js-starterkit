const { BigNumber } = require("@ethersproject/bignumber");

function toWei(n) {
  return ethers.utils.parseEther(n);
}

function fromWei(n) {
  return n.div(BigNumber.from("1000000000000000000"));
}

function BnToString(n) {
  return ethers.utils.formatUnits(n, "ether");
}

function toBN(n) {
  return BigNumber.from(n);
}

async function etherBalance(addr) {
  return await ethers.provider.getBalance(addr);
}

module.exports = {
  toWei,
  fromWei,
  BnToString,
  toBN,
  etherBalance,
};

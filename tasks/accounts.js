const { task } = require("hardhat/config");
const { fromWei } = require("../utils/format");

task("accounts", "Prints the list of accounts", async (_, { ethers }) => {
  const accounts = await ethers.getSigners();

  const accountsArray = [];

  for (const account of accounts) {
    const address = account.address;
    const balanceInETH = fromWei(await account.getBalance());

    accountsArray.push({
      address,
      balanceInETH,
    });
  }

  console.table(accountsArray);
});
